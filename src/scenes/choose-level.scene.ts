import {LevelScene} from "./level.scene";
import {Difficulty} from "../level.service";

export class ChooseLevelScene extends Phaser.Scene {
    private difficulty: Difficulty;

    constructor() {
        super({
            key: "ChooseLevelScene"
        });
    }

    preload(): void {
    }

    create(data): void {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 5; j++) {
                let x = 100 + j * 80;
                let y = 50 + i * 80;
                let n = i * 5 + j + 1;
                let buttonStart = this.add.sprite(x, y, 'square').setInteractive();
                this.add.text(x, y, n.toString(), {
                    fontFamily: 'Arial',
                    fontSize: 32,
                    color: '#333'
                }).setOrigin(0.5, 0.5);
                buttonStart.on('pointerdown', () => {
                    this.scene.start('LevelScene', {level: n, difficulty: data.difficulty});
                });
            }
        }
    }

    update(time, delta): void {
    }
}
