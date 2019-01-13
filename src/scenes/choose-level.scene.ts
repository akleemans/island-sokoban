import {LevelScene} from "./level.scene";

export class ChooseLevelScene extends Phaser.Scene {

    constructor() {
        super({
            key: "ChooseLevelScene"
        });
    }

    preload(): void {
    }

    create(data): void {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 6; j++) {
                let x = 70 + j * 85;
                let y = 50 + i * 75;
                let n = i * 6 + j + 1;
                let buttonStart = this.add.sprite(x, y, 'square-clear').setInteractive();
                buttonStart.on('pointerdown', () => {
                    this.scene.start('LevelScene', {level: n + data.startLevel});
                });
                this.add.bitmapText(x, y, 'comic-font', n.toString(), 32).setOrigin(0.5, 0.5);
            }
        }

        this.add.sprite(50, 340, 'square-clear').setOrigin(0.5, 0.5).setInteractive()
            .on('pointerdown', () => {
                this.scene.start('MainScene');
            });
        this.add.bitmapText(50, 340, 'comic-font', '<', 32).setOrigin(0.5, 0.5);
    }

    update(time, delta): void {
    }
}
