import {LevelSet} from '../objects/level-set';

export class MainScene extends Phaser.Scene {

    public constructor() {
        super({
            key: 'MainScene',
        });
    }

    public preload(): void {
        // https://www.kleemans.ch/static/island-sokoban/
        const assetPath = 'assets/';

        // UI
        this.load.image('intro', assetPath + 'img/ui/intro.png');
        this.load.image('button-clear', assetPath + 'img/ui/button-clear.png');
        this.load.image('square-clear', assetPath + 'img/ui/square-clear.png');
        this.load.image('dialog', assetPath + 'img/ui/dialog.png');
        this.load.image('dialog-button', assetPath + 'img/ui/dialog-button.png');
        this.load.image('dialog-button-menu', assetPath + 'img/ui/dialog-button-menu.png');
        this.load.image('dialog-button-empty', assetPath + 'img/ui/dialog-button-empty.png');
        this.load.image('dialog-button-menu-square', assetPath + 'img/ui/dialog-button-menu-square.png');
        this.load.image('dialog-button-menu-square-green', assetPath + 'img/ui/dialog-button-menu-square-green.png');

        // font
        this.load.bitmapFont('comic-font', assetPath + 'font/comic-queens.png', assetPath + 'font/comic-queens.fnt');

        // bg
        this.load.image('goal', assetPath + 'img/bg/goal.png');
        this.load.image('inner-box', assetPath + 'img/bg/inner-box.png');
        this.load.image('water', assetPath + 'img/bg/water.png');
        this.load.image('island', assetPath + 'img/bg/island.png');
        this.load.image('island_corner_ld', assetPath + 'img/bg/island_corner_ld.png');
        this.load.image('island_corner_lu', assetPath + 'img/bg/island_corner_lu.png');
        this.load.image('island_corner_rd', assetPath + 'img/bg/island_corner_rd.png');
        this.load.image('island_corner_ru', assetPath + 'img/bg/island_corner_ru.png');
        this.load.image('island_dot_ld', assetPath + 'img/bg/island_dot_ld.png');
        this.load.image('island_dot_lu', assetPath + 'img/bg/island_dot_lu.png');
        this.load.image('island_dot_rd', assetPath + 'img/bg/island_dot_rd.png');
        this.load.image('island_dot_ru', assetPath + 'img/bg/island_dot_ru.png');
        this.load.image('island_edge_d', assetPath + 'img/bg/island_edge_d.png');
        this.load.image('island_edge_l', assetPath + 'img/bg/island_edge_l.png');
        this.load.image('island_edge_r', assetPath + 'img/bg/island_edge_r.png');
        this.load.image('island_edge_u', assetPath + 'img/bg/island_edge_u.png');

        // movables
        this.load.image('box', assetPath + 'img/movables/box.png');
        this.load.image('player', assetPath + 'img/movables/player.png');
    }

    public create(): void {
        this.add.image(0, 0, 'intro').setOrigin(0, 0);

        const fontSize = 34;
        this.add.bitmapText(256, 60, 'comic-font', 'sokoban Island', 44).setOrigin(0.5, 0.5);

        this.add.sprite(160, 180, 'dialog-button-menu').setInteractive().on('pointerdown', () => {
            this.scene.start('ChooseLevelScene', {levelSet: LevelSet.set1});
        });
        this.add.bitmapText(160, 180, 'comic-font', 'set 1', fontSize).setOrigin(0.5, 0.5);

        this.add.sprite(360, 180, 'dialog-button-menu').setInteractive().on('pointerdown', () => {
            this.scene.start('ChooseLevelScene', {levelSet: LevelSet.set2});
        });
        this.add.bitmapText(360, 180, 'comic-font', 'set 2', fontSize).setOrigin(0.5, 0.5);

        this.add.sprite(160, 260, 'dialog-button-menu').setInteractive().on('pointerdown', () => {
            this.scene.start('ChooseLevelScene', {levelSet: LevelSet.set3});
        });
        this.add.bitmapText(160, 260, 'comic-font', 'set 3', fontSize).setOrigin(0.5, 0.5);

        this.add.sprite(360, 260, 'dialog-button-menu').setInteractive().on('pointerdown', () => {
            this.scene.start('ChooseLevelScene', {levelSet: LevelSet.set4});
        });
        this.add.bitmapText(360, 260, 'comic-font', 'set 4', fontSize).setOrigin(0.5, 0.5);

        this.add.sprite(260, 340, 'dialog-button-menu').setInteractive().on('pointerdown', () => {
            this.scene.start('AboutScene');
        });
        this.add.bitmapText(260, 340, 'comic-font', 'about', 26).setOrigin(0.5, 0.5);
    }
}
