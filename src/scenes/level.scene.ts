import Group = Phaser.Physics.Arcade.Group;
import {Difficulty, LevelService} from "../level.service";

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

                // water and land
                if (c === '#') {
                    // water
                    this.backgroundGroup.add(this.add.image(x, y, 'water'));
                } else {
                    // TODO determine form
                    // land
                    this.backgroundGroup.add(this.add.image(x, y, 'island'));
                }

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
                  = Wall
                # = Block
                @ = Spieler
                + = Spieler auf Ziel
                $ = Kiste
                * = Kiste auf Ziel
                . = Ziel
                 */

                /*
                let x = 100 + j * 80;
                let y = 50 + i * 80;
                let n = i * 5 + j + 1;
                let buttonStart = this.add.sprite(x + 10, y + 20, 'square').setInteractive();
                this.add.text(x, y, n.toString(), {fontFamily: 'Arial', fontSize: 32, color: '#333'});
                buttonStart.on('pointerdown', () => {
                    this.scene.start('LevelScene', {level: n});
                });
                */
            }
        }

        /*
        let buttonTower1 = this.add.sprite(this.gridX - 70, this.gridY - 25, 'button-tower1');
        buttonTower1.setInteractive();
        let buttonTower2 = this.add.sprite(this.gridX - 25, this.gridY - 25, 'button-tower2');
        buttonTower2.setInteractive();
        */
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
