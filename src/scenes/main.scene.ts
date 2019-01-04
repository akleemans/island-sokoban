import {Difficulty} from "../level.service";

export class MainScene extends Phaser.Scene {

    constructor() {
        super({
            key: "MainScene"
        });
    }

    preload(): void {
        this.load.image('intro', 'assets/img/intro.png');

        this.load.image('button-easy', 'assets/img/button-easy.png');
        this.load.image('button-medium', 'assets/img/button-medium.png');
        this.load.image('button-hard', 'assets/img/button-hard.png');
        this.load.image('button-about', 'assets/img/button-about.png');

        this.load.image('square', 'assets/img/square.png');

        // bg
        this.load.image('goal', 'assets/img/bg/goal.png');
        this.load.image('water', 'assets/img/bg/water.png');
        this.load.image('island', 'assets/img/bg/island.png');


        // movables
        this.load.image('box', 'assets/img/movables/box.png');
        this.load.image('player', 'assets/img/movables/player.png');

    }

    create(): void {
        this.add.sprite(300, 60, 'intro');
        this.add.sprite(300, 160, 'button-easy').setInteractive().on('pointerdown', () => {
            this.scene.start('ChooseLevelScene', {difficulty: Difficulty.easy});
        });
        this.add.sprite(300, 220, 'button-medium').setInteractive().on('pointerdown', () => {
            this.scene.start('ChooseLevelScene', {difficulty: Difficulty.medium});
        });
        this.add.sprite(300, 280, 'button-hard').setInteractive().on('pointerdown', () => {
            this.scene.start('ChooseLevelScene', {difficulty: Difficulty.hard});
        });
        this.add.sprite(300, 340, 'button-about').setInteractive().on('pointerdown', () => {
            this.scene.start('AboutScene');
        });

    }

    update(time, delta): void {
    }
}
