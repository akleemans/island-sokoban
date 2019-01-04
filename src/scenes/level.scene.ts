import Group = Phaser.Physics.Arcade.Group;
import {LevelService} from "../level.service";

export enum Direction {
    right, left, up, down
}

export class LevelScene extends Phaser.Scene {
    private gridSize = 32;
    // private gridX = 18 * this.gridSize;
    // private gridY = 12 * this.gridSize;
    private grid = [];

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

        let gridSize = 32;
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                let c = this.grid[i][j];
                let x = 140 + j * gridSize;
                let y = 40 + i * gridSize;

                let sprite = this.determineBackgroundSprite(c, j, i);
                this.backgroundGroup.add(this.add.image(x, y, sprite));

                // goal
                if (c === '+' || c === '*' || c === '.') {
                    this.backgroundGroup.add(this.add.image(x, y, 'goal'));
                }

                // movables - player, box
                if (c === '@' || c === '+') {
                    // player
                    this.moveableGroup.add(this.add.image(x, y, 'player'));
                } else if (c === '$' || c === '*') {
                    // box
                    this.moveableGroup.add(this.add.image(x, y, 'box'));
                }

                /*
                # = Block/Wasser
                  = Floor
                @ = Spieler
                + = Spieler auf Ziel
                $ = Kiste
                * = Kiste auf Ziel
                . = Ziel
                 */
            }
        }
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
                    sprite = 'island;';
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

    update(time, delta): void {
        /*
        // update HUD
        this.moneyText.setText(this.money.toString());
        this.healthText.setText(this.health.toString());
        this.waveText.setText('W ' + this.wave);
        */
    }

    finish() {
        let text;
        text = 'You win!';
        this.add.text(200, 200, text, {fontFamily: 'Arial', fontSize: 32, color: '#333'});

    }
}
