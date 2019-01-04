import Group = Phaser.Physics.Arcade.Group;
import {LevelService} from "../level.service";
import {Player} from "../objects/Player";

export enum Direction {
    right, left, up, down
}

export class LevelScene extends Phaser.Scene {
    gridSize = 32;
    grid = [];
    private cursors: CursorKeys;
    private lastInputTime: number;
    private inputTimeDelta = 200;
    private player: Player;

    // HUD

    // sprites
    private backgroundGroup: Group;
    private moveableGroup: Group;

    constructor() {
        super({
            key: "LevelScene"
        });
    }

    preload(): void {
    }

    create(data): void {
        console.log('level create(), data:', data);
        this.grid = LevelService.getLevelData(data.difficulty, data.level);

        this.backgroundGroup = this.physics.add.group();
        this.moveableGroup = this.physics.add.group();

        /*
        # = Block/Wasser
          = Floor
        @ = Spieler
        + = Spieler auf Ziel
        $ = Kiste
        * = Kiste auf Ziel
        . = Ziel
        = = innerer Block
        */

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                let c = this.grid[i][j];
                let x = 140 + j * this.gridSize;
                let y = 40 + i * this.gridSize;

                let sprite = this.determineBackgroundSprite(c, j, i);
                // console.log('Adding', sprite, 'at', x, '/', y);
                this.backgroundGroup.add(this.add.image(x, y, sprite));

                // inner block
                if (c === '=') {
                    this.backgroundGroup.add(this.add.image(x, y, 'inner-box'));
                }

                // goal
                if (c === '+' || c === '*' || c === '.') {
                    this.backgroundGroup.add(this.add.image(x, y, 'goal'));
                }
            }
        }

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                let c = this.grid[i][j];
                let x = 140 + j * this.gridSize;
                let y = 40 + i * this.gridSize;

                // movables - player, box
                if (c === '@' || c === '+') {
                    // player
                    this.player = new Player(this, x, y);
                } else if (c === '$' || c === '*') {
                    // box
                    this.moveableGroup.add(this.add.image(x, y, 'box'));
                }
            }
        }

        // cursors
        this.cursors = this.input.keyboard.createCursorKeys();
        this.lastInputTime = 0;
    }

    update(time: number, delta: number): void {
        let direction = this.getCursorDirection();
        if (direction !== undefined && time > this.lastInputTime + this.inputTimeDelta) {
            this.player.move(direction);
            this.lastInputTime = time;
        }
    }

    getCursorDirection(): Direction {
        let direction = undefined;
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
                    if (this.grid[y + 1][x - 1] === '#') {
                        sprite = 'island_dot_ld';
                    } else if (this.grid[y - 1][x - 1] === '#') {
                        sprite = 'island_dot_lu';
                    } else if (this.grid[y + 1][x + 1] === '#') {
                        sprite = 'island_dot_rd';
                    } else if (this.grid[y - 1][x + 1] === '#') {
                        sprite = 'island_dot_ru';
                    }
                }
            } else if (adjacentNeighbors === 3) {
                // edge
                if (this.grid[y + 1][x] === '#') {
                    sprite = 'island_edge_d';
                } else if (this.grid[y][x - 1] === '#') {
                    sprite = 'island_edge_l';
                } else if (this.grid[y][x + 1] === '#') {
                    sprite = 'island_edge_r';
                } else if (this.grid[y - 1][x] === '#') {
                    sprite = 'island_edge_u';
                }
            } else if (adjacentNeighbors === 2) {
                // corner
                if (this.grid[y - 1][x] === '#' && this.grid[y][x + 1] === '#') {
                    sprite = 'island_corner_ru';
                } else if (this.grid[y][x + 1] === '#' && this.grid[y + 1][x] === '#') {
                    sprite = 'island_corner_rd';
                } else if (this.grid[y + 1][x] === '#' && this.grid[y][x - 1] === '#') {
                    sprite = 'island_corner_ld';
                } else if (this.grid[y][x - 1] === '#' && this.grid[y - 1][x] === '#') {
                    sprite = 'island_corner_lu';
                }
            }

            // other case
            if (sprite === '???') {
                console.error('Couldnt render map!!!');
                console.log('x = ' + x + '/ y = ' + y + ' has sprite = ' + sprite);
                console.log('adjacentNeighbors = ' + adjacentNeighbors);
                console.log('neighbors = ' + neighbors);
            }
        }
        return sprite;
    }


    countAdjacentNeighbors(x: number, y: number): number {
        let count = 0;
        if (this.grid[y][x - 1] !== '#') {
            count += 1;
        }
        if (this.grid[y][x + 1] !== '#') {
            count += 1;
        }
        if (this.grid[y + 1][x] !== '#') {
            count += 1;
        }
        if (this.grid[y - 1][x] !== '#') {
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
                if (this.grid[y + i][x + j] !== '#') {
                    count += 1;
                }
            }
        }
        return count;
    }

    finish() {
        let text;
        text = 'You win!';
        this.add.text(200, 200, text, {fontFamily: 'Arial', fontSize: 32, color: '#333'});

    }
}
