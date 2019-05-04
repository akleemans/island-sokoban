import {LevelService} from '../level.service';
import {Box} from '../objects/Box';
import {Coords} from '../objects/coords';
import {Direction} from '../objects/direction';
import {Level} from '../objects/level';
import {Player} from '../objects/Player';
import Group = Phaser.GameObjects.Group;
import Sprite = Phaser.GameObjects.Sprite;
import CursorKeys = Phaser.Input.Keyboard.CursorKeys;

export class LevelScene extends Phaser.Scene {
    public gridSize = 32;
    private baseGrid = [];
    private level: Level;
    private offset = new Coords(16, 16);
    private levelSize = new Coords(16, 12);

    private cursors: CursorKeys;
    private lastInputTime: number;
    private inputTimeDelta = 150;

    private player: Player;
    private levelState;
    private finished: boolean;
    private dialogShown: boolean;
    private dialogButton: Phaser.GameObjects.Sprite;
    private dialogButtonText: Phaser.GameObjects.BitmapText;
    private backgroundGroup: Group;
    private moveButtons: Group;

    public constructor() {
        super({
            key: 'LevelScene',
        });
    }

    public static charIsGoal(c: string): boolean {
        if (c.length !== 1) {
            throw new Error('Tried to evaluate if char is goal: ' + c);
        }
        return c === '.' || c === '+' || c === '*';
    }

    public static getCoords(direction: Direction): Coords {
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

    public create(data): void {
        this.finished = false;
        this.dialogShown = false;
        this.levelState = [];
        this.level = LevelService.getLevelData(data.levelSet, data.nr);
        this.baseGrid = this.level.baseGrid;
        this.backgroundGroup = this.physics.add.group();
        this.moveButtons = this.physics.add.group();

        for (let i = 0; i < this.levelSize.y; i++) {
            this.levelState.push([]);
            for (let j = 0; j < this.levelSize.x; j++) {
                this.levelState[i].push(null);
                const c = this.baseGrid[i][j];
                const x = this.offset.x + j * this.gridSize;
                const y = this.offset.y + i * this.gridSize;

                const sprite = this.determineBackgroundSprite(c, j, i);
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
                const c = this.baseGrid[i][j];
                const x = this.offset.x + j * this.gridSize;
                const y = this.offset.y + i * this.gridSize;

                // movables - player, box
                if (c === '@' || c === '+') {
                    // player
                    this.player = new Player(this, x, y);
                    this.levelState[i][j] = this.player;
                } else if (c === '$' || c === '*') {
                    // box
                    this.levelState[i][j] = new Box(this, x, y);
                }
            }
        }

        // HUD
        this.dialogButton = this.add.sprite(460, 40, 'dialog-button');
        this.dialogButton.setOrigin(0.5, 0.5)
            .setInteractive()
            .on('pointerdown', () => {
                this.showDialog();
            });
        this.dialogButtonText = this.add.bitmapText(460, 40, 'comic-font', 'menu', 18).setOrigin(0.5, 0.5);

        // buttons ← ↑ → ↓
        const scale = 0.7;
        const upButton = this.add.sprite(435, 280, 'dialog-button-menu-square-empty')
            .setOrigin(0.5, 0.5).setScale(scale, scale).setInteractive();
        upButton.on('pointerdown', () => this.tryMove(Direction.up));
        this.moveButtons.add(upButton);
        this.moveButtons.add(this.add.text(435, 280, '↑', {font: '22px'}).setOrigin(0.5, 0.5).setTint(0x0));

        const downButton = this.add.sprite(435, 350, 'dialog-button-menu-square-empty')
            .setOrigin(0.5, 0.5).setScale(scale, scale).setInteractive();
        downButton.on('pointerdown', () => this.tryMove(Direction.down));
        this.moveButtons.add(downButton);
        this.moveButtons.add(this.add.text(435, 350, '↓', {font: '22px'}).setOrigin(0.5, 0.5).setTint(0x0));

        const leftButton = this.add.sprite(400, 315, 'dialog-button-menu-square-empty')
            .setOrigin(0.5, 0.5).setScale(scale, scale).setInteractive();
        leftButton.on('pointerdown', () => this.tryMove(Direction.left));
        this.moveButtons.add(leftButton);
        this.moveButtons.add(this.add.text(400, 315, '←', {font: '22px'}).setOrigin(0.5, 0.5).setTint(0x0));

        const rightButton = this.add.sprite(470, 315, 'dialog-button-menu-square-empty')
            .setOrigin(0.5, 0.5).setScale(scale, scale).setInteractive();
        rightButton.on('pointerdown', () => this.tryMove(Direction.right));
        this.moveButtons.add(rightButton);
        this.moveButtons.add(this.add.text(470, 315, '→', {font: '22px'}).setOrigin(0.5, 0.5).setTint(0x0));

        // cursors
        this.cursors = this.input.keyboard.createCursorKeys();
        this.lastInputTime = 0;
    }

    public update(time: number, delta: number): void {
        if (this.finished || this.isLevelFinished()) {
            if (!this.finished) {
                this.finish();
            }
            return;
        }

        if (this.dialogShown) {
            return;
        }

        // make move if cursor down
        const direction = this.getCursorDirection();
        if (direction !== null && time > this.lastInputTime + this.inputTimeDelta) {
            this.tryMove(direction);
            this.lastInputTime = time;
        }
    }

    private tryMove(direction: Direction): void {
        // check if move is possible
        const d = LevelScene.getCoords(direction);
        const p = this.getPlayerCoords();

        // case 1: no box (and no wall), then just move
        if (this.levelState[p.y + d.y][p.x + d.x] === null) {
            this.levelState[p.y][p.x] = null;
            this.levelState[p.y + d.y][p.x + d.x] = this.player;
            this.player.move(d);
        } else if (this.levelState[p.y + d.y][p.x + d.x] instanceof Box &&
            this.levelState[p.y + d.y * 2][p.x + d.x * 2] === null) {
            this.levelState[p.y][p.x] = null;
            const boxToMove = this.levelState[p.y + d.y][p.x + d.x];
            this.levelState[p.y + d.y][p.x + d.x] = this.player;
            this.levelState[p.y + d.y * 2][p.x + d.x * 2] = boxToMove;

            this.player.move(d);
            boxToMove.move(d);
        }
    }

    private getPlayerCoords(): Coords {
        for (let i = 0; i < this.levelSize.y; i++) {
            for (let j = 0; j < this.levelSize.x; j++) {
                if (this.levelState[i][j] === this.player) {
                    return new Coords(j, i);
                }
            }
        }
        throw new Error('Player not found in level state!');
    }

    private isLevelFinished(): boolean {
        for (let i = 0; i < this.levelSize.y; i++) {
            for (let j = 0; j < this.levelSize.x; j++) {
                const c = this.baseGrid[i][j];
                // goal without a box standing on it
                if (LevelScene.charIsGoal(c) && !(this.levelState[i][j] instanceof Box)) {
                    return false;
                }
            }
        }
        return true;
    }

    private getCursorDirection(): Direction {
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

    private determineBackgroundSprite(c: string, x: number, y: number): string {
        let sprite = '???';
        // water and land
        if (c === '#') {
            // water
            sprite = 'water';
        } else {
            const neighbors = this.countNeighbors(x, y);
            const adjacentNeighbors = this.countAdjacentNeighbors(x, y);
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
                throw new Error('Couldnt render map!');
            }
        }
        return sprite;
    }

    private countAdjacentNeighbors(x: number, y: number): number {
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

    private countNeighbors(x: number, y: number): number {
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

    private showDialog() {
        this.dialogShown = true;
        this.dialogButton.setVisible(false);
        this.dialogButtonText.setVisible(false);
        this.moveButtons.getChildren().forEach((child: Sprite) => child.setVisible(false));

        const dialogGroup = this.add.group();
        dialogGroup.add(this.add.image(256, 192, 'dialog'));

        const headerText = this.finished ? 'you won!' : 'pause';
        dialogGroup.add(this.add.bitmapText(256, 140, 'comic-font', headerText, 34).setOrigin(0.5, 0.5));

        const levelText = 'Level: ' + this.level.nr;
        const movesText = 'Number of moves: ' + this.player.getMoves();
        dialogGroup.add(this.add.bitmapText(60, 190, 'comic-font', levelText, 20).setOrigin(0, 0.5));
        dialogGroup.add(this.add.bitmapText(60, 220, 'comic-font', movesText, 20).setOrigin(0, 0.5));

        // actions ----------

        // cancel
        const cancelButton = this.add.sprite(460, 100, 'dialog-button-empty');
        cancelButton.setOrigin(0.5, 0.5).setInteractive()
            .on('pointerdown', () => {
                this.dialogShown = false;
                dialogGroup.destroy(true);
                this.dialogButton.setVisible(true);
                this.dialogButtonText.setVisible(true);
                this.moveButtons.getChildren().forEach((child: Sprite) => child.setVisible(true));
            });
        dialogGroup.add(cancelButton);

        // menu
        dialogGroup.add(this.add.bitmapText(90, 280, 'comic-font', 'home', 20).setOrigin(0.5, 0.5));
        const menuButton = this.add.sprite(90, 280, 'dialog-button-empty');
        menuButton.setOrigin(0.5, 0.5).setInteractive()
            .on('pointerdown', () => {
                this.scene.start('MainScene');
            });
        dialogGroup.add(menuButton);

        // replay
        dialogGroup.add(this.add.bitmapText(195, 280, 'comic-font', 'retry', 20).setOrigin(0.5, 0.5));
        const replayButton = this.add.sprite(195, 280, 'dialog-button-empty');
        replayButton.setOrigin(0.5, 0.5).setInteractive()
            .on('pointerdown', () => {
                this.scene.restart({levelSet: this.level.levelSet, nr: this.level.nr});
            });
        dialogGroup.add(replayButton);

        // prev
        dialogGroup.add(this.add.bitmapText(300, 280, 'comic-font', 'prev', 20).setOrigin(0.5, 0.5));
        const previousButton = this.add.sprite(300, 280, 'dialog-button-empty');
        previousButton.setOrigin(0.5, 0.5).setInteractive()
            .on('pointerdown', () => {
                this.scene.start('LevelScene', {levelSet: this.level.levelSet, nr: Math.max(1, this.level.nr - 1)});
            });
        dialogGroup.add(previousButton);

        // next
        dialogGroup.add(this.add.bitmapText(405, 280, 'comic-font', 'next', 20).setOrigin(0.5, 0.5));
        const nextButton = this.add.sprite(405, 280, 'dialog-button-empty');
        nextButton.setOrigin(0.5, 0.5).setInteractive()
            .on('pointerdown', () => {
                const maxLevel = LevelService.getMaxAvailableLevel(this.level.levelSet);
                this.scene.start('LevelScene', {
                    levelSet: this.level.levelSet,
                    nr: Math.min(maxLevel, this.level.nr + 1),
                });
            });
        dialogGroup.add(nextButton);
    }

    private finish() {
        this.finished = true;
        LevelService.addSolvedLevel(this.level.levelSet, this.level.nr);
        this.showDialog();
    }
}
