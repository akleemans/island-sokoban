import Group = Phaser.Physics.Arcade.Group;
import {LevelService} from "../level.service";
import {Player} from "../objects/Player";
import {Box} from "../objects/Box";

export enum Direction {
    right,
    left,
    up,
    down
}

export class Coords {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export class LevelScene extends Phaser.Scene {
    gridSize = 32;
    baseGrid = [];
    private cursors: CursorKeys;
    private lastInputTime: number;
    private inputTimeDelta = 150;

    private player: Player;
    private levelState = [];
    private finished: boolean = false;
    private offset = new Coords(140, 16);
    private levelSize = new Coords(12, 12);

    // sprites
    private backgroundGroup: Group;

    constructor() {
        super({
            key: "LevelScene"
        });
    }

    preload(): void {
    }

    create(data): void {
        console.log('level create(), data:', data);
        this.baseGrid = LevelService.getLevelData(data.difficulty, data.level);
        this.backgroundGroup = this.physics.add.group();

        for (let i = 0; i < this.levelSize.y; i++) {
            this.levelState.push([]);
            for (let j = 0; j < this.levelSize.x; j++) {
                this.levelState[i].push(null);
                let c = this.baseGrid[i][j];
                let x = this.offset.x + j * this.gridSize;
                let y = this.offset.y + i * this.gridSize;

                let sprite = this.determineBackgroundSprite(c, j, i);
                this.backgroundGroup.add(this.add.image(x, y, sprite));

                // inner block
                if (c === '=') {
                    this.backgroundGroup.add(this.add.image(x, y, 'inner-box'));
                }

                // add to level state
                if (c === '#' || c === '=') {
                    this.levelState[i][j] = 'X';
                }

                // goal
                if (LevelScene.charIsGoal(c)) {
                    this.backgroundGroup.add(this.add.image(x, y, 'goal'));
                }
            }
        }

        for (let i = 0; i < this.levelSize.y; i++) {
            for (let j = 0; j < this.levelSize.x; j++) {
                let c = this.baseGrid[i][j];
                let x = this.offset.x + j * this.gridSize;
                let y = this.offset.y + i * this.gridSize;

                // movables - player, box
                if (c === '@' || c === '+') {
                    // player
                    console.log('Placing player at', j, '/', i);
                    this.player = new Player(this, x, y);
                    this.levelState[i][j] = this.player;
                } else if (c === '$' || c === '*') {
                    // box
                    this.levelState[i][j] = new Box(this, x, y);
                }
            }
        }

        // cursors
        this.cursors = this.input.keyboard.createCursorKeys();
        this.lastInputTime = 0;
    }

    update(time: number, delta: number): void {
        if (this.finished || this.isLevelFinished()) {
            if (!this.finished) {
                this.finish();
            }
            return;
        }

        // make move if cursor down
        let direction = this.getCursorDirection();
        if (direction !== null && time > this.lastInputTime + this.inputTimeDelta) {
            // check if move is possible
            let d = LevelScene.getCoords(direction);
            let p = this.getPlayerCoords();

            // case 1: no box (and no wall), then just move
            console.log('p:', p, 'd:', d);
            if (this.levelState[p.y + d.y][p.x + d.x] === null) {
                // console.log('moving case 1, player without box');
                this.levelState[p.y][p.x] = null;
                this.levelState[p.y + d.y][p.x + d.x] = this.player;

                this.player.move(d);
                this.lastInputTime = time;
            } else if (this.levelState[p.y + d.y][p.x + d.x] instanceof Box &&
                this.levelState[p.y + d.y * 2][p.x + d.x * 2] === null) {
                // console.log('moving case 1, player with box');
                this.levelState[p.y][p.x] = null;
                let boxToMove = this.levelState[p.y + d.y][p.x + d.x];
                this.levelState[p.y + d.y][p.x + d.x] = this.player;
                this.levelState[p.y + d.y * 2][p.x + d.x * 2] = boxToMove;

                this.player.move(d);
                boxToMove.move(d);
                this.lastInputTime = time;
            }
        }
    }

    getPlayerCoords(): Coords {
        for (let i = 0; i < this.levelSize.y; i++) {
            for (let j = 0; j < this.levelSize.x; j++) {
                if (this.levelState[i][j] == this.player) {
                    return new Coords(j, i);
                }
            }
        }
        throw new Error('Player not found in level state!');
    }

    isLevelFinished(): boolean {
        for (let i = 0; i < this.levelSize.y; i++) {
            for (let j = 0; j < this.levelSize.x; j++) {
                let c = this.baseGrid[i][j];
                // goal without a box standing on it
                if (LevelScene.charIsGoal(c) && !(this.levelState[i][j] instanceof Box)) {
                    return false;
                }
            }
        }
        console.log('Finished, this.levelState = ', this.levelState);
        return true;
    }

    static charIsGoal(c: string): boolean {
        if (c.length !== 1) {
            throw new Error('Tried to evaluate if char is goal: ' + c);
        }
        return c === '.' || c === '+' || c === '*';
    }

    static getCoords(direction: Direction): Coords {
        let x = 0;
        let y = 0;
        switch (direction) {
            case Direction.down:
                y = 1;
                break;
            case Direction.up:
                y = -1;
                break;
            case Direction.left:
                x = -1;
                break;
            case Direction.right:
                x = 1;
                break;
        }
        return new Coords(x, y);
    }

    getCursorDirection(): Direction {
        let direction = null;
        if (this.cursors.down.isDown) {
            direction = Direction.down;
        } else if (this.cursors.up.isDown) {
            direction = Direction.up;
        } else if (this.cursors.left.isDown) {
            direction = Direction.left;
        } else if (this.cursors.right.isDown) {
            direction = Direction.right;
        }
        return direction;
    }

    determineBackgroundSprite(c: string, x: number, y: number): string {
        let sprite = '???';
        // water and land
        if (c === '#') {
            // water
            sprite = 'water';
        } else {
            let neighbors = this.countNeighbors(x, y);
            let adjacentNeighbors = this.countAdjacentNeighbors(x, y);
            if (adjacentNeighbors === 4) {
                if (neighbors === 8) {
                    sprite = 'island';
                } else if (neighbors === 7) {
                    // dot
                    if (this.baseGrid[y + 1][x - 1] === '#') {
                        sprite = 'island_dot_ld';
                    } else if (this.baseGrid[y - 1][x - 1] === '#') {
                        sprite = 'island_dot_lu';
                    } else if (this.baseGrid[y + 1][x + 1] === '#') {
                        sprite = 'island_dot_rd';
                    } else if (this.baseGrid[y - 1][x + 1] === '#') {
                        sprite = 'island_dot_ru';
                    }
                }
            } else if (adjacentNeighbors === 3) {
                // edge
                if (this.baseGrid[y + 1][x] === '#') {
                    sprite = 'island_edge_d';
                } else if (this.baseGrid[y][x - 1] === '#') {
                    sprite = 'island_edge_l';
                } else if (this.baseGrid[y][x + 1] === '#') {
                    sprite = 'island_edge_r';
                } else if (this.baseGrid[y - 1][x] === '#') {
                    sprite = 'island_edge_u';
                }
            } else if (adjacentNeighbors === 2) {
                // corner
                if (this.baseGrid[y - 1][x] === '#' && this.baseGrid[y][x + 1] === '#') {
                    sprite = 'island_corner_ru';
                } else if (this.baseGrid[y][x + 1] === '#' && this.baseGrid[y + 1][x] === '#') {
                    sprite = 'island_corner_rd';
                } else if (this.baseGrid[y + 1][x] === '#' && this.baseGrid[y][x - 1] === '#') {
                    sprite = 'island_corner_ld';
                } else if (this.baseGrid[y][x - 1] === '#' && this.baseGrid[y - 1][x] === '#') {
                    sprite = 'island_corner_lu';
                }
            }

            // other case
            if (sprite === '???') {
                console.log('x = ' + x + '/ y = ' + y + ' has sprite = ' + sprite);
                console.log('adjacentNeighbors = ' + adjacentNeighbors);
                console.log('neighbors = ' + neighbors);
                throw new Error('Couldnt render map!')
            }
        }
        return sprite;
    }


    countAdjacentNeighbors(x: number, y: number): number {
        let count = 0;
        if (this.baseGrid[y][x - 1] !== '#') {
            count += 1;
        }
        if (this.baseGrid[y][x + 1] !== '#') {
            count += 1;
        }
        if (this.baseGrid[y + 1][x] !== '#') {
            count += 1;
        }
        if (this.baseGrid[y - 1][x] !== '#') {
            count += 1;
        }
        return count;
    }

    countNeighbors(x: number, y: number): number {
        let count = 0;
        x -= 1;
        y -= 1;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if ((i === 1 && j === 1)) {
                    continue;
                }
                if (this.baseGrid[y + i][x + j] !== '#') {
                    count += 1;
                }
            }
        }
        return count;
    }

    finish() {
        console.log('Level finished!');
        this.add.text(200, 200, 'You win! Moves:' + this.player.getMoves(), {
            fontFamily: 'Arial',
            fontSize: 32,
            color: '#333'
        });
        this.finished = true;
    }
}
