import {LevelService} from '../level.service';
import {LevelScene} from './level.scene';

export class ChooseLevelScene extends Phaser.Scene {

    public constructor() {
        super({
            key: 'ChooseLevelScene',
        });
    }

    public create(data): void {
        this.add.image(0, 0, 'intro').setOrigin(0, 0);

        const maxAvailableLevel = LevelService.getMaxAvailableLevel(data.levelSet);
        const solvedLevels = LevelService.getSolvedLevels(data.levelSet);

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 6; j++) {
                const x = 40 + j * 85;
                const y = 50 + i * 75;
                const nr = i * 6 + j + 1;
                const sprite = solvedLevels.indexOf(nr) === -1 ?
                    'dialog-button-menu-square' : 'dialog-button-menu-square-green';
                const buttonStart = this.add.sprite(x, y, sprite);

                if (nr <= maxAvailableLevel) {
                    buttonStart.setInteractive().on('pointerdown', () => {
                        this.scene.start('LevelScene', {levelSet: data.levelSet, nr: nr});
                    });
                } else {
                    buttonStart.setAlpha(0.5);
                }

                this.add.bitmapText(x, y, 'comic-font', nr.toString(), 32).setOrigin(0.5, 0.5);
            }
        }

        this.add.sprite(50, 340, 'square-clear').setOrigin(0.5, 0.5).setInteractive()
            .on('pointerdown', () => {
                this.scene.start('MainScene');
            });
        this.add.bitmapText(50, 340, 'comic-font', '<', 32).setOrigin(0.5, 0.5);
    }
}
