export class MainScene extends Phaser.Scene {

    constructor() {
        super({
            key: "MainScene"
        });
    }

    preload(): void {
        // UI
        this.load.image('intro', 'assets/img/ui/intro.png');
        this.load.image('button-clear', 'assets/img/ui/button-clear.png');
        this.load.image('square-clear', 'assets/img/ui/square-clear.png');
        this.load.image('dialog', 'assets/img/ui/dialog.png');
        this.load.image('dialog-button', 'assets/img/ui/dialog-button.png');
        this.load.image('dialog-button-menu', 'assets/img/ui/dialog-button-menu.png');
        this.load.image('dialog-button-empty', 'assets/img/ui/dialog-button-empty.png');
        this.load.image('dialog-button-menu-square', 'assets/img/ui/dialog-button-menu-square.png');

        // font
        this.load.bitmapFont('comic-font', 'assets/font/comic-queens.png', 'assets/font/comic-queens.fnt');

        // bg
        this.load.image('goal', 'assets/img/bg/goal.png');
        this.load.image('inner-box', 'assets/img/bg/inner-box.png');
        this.load.image('water', 'assets/img/bg/water.png');
        this.load.image('island', 'assets/img/bg/island.png');
        this.load.image('island_corner_ld', 'assets/img/bg/island_corner_ld.png');
        this.load.image('island_corner_lu', 'assets/img/bg/island_corner_lu.png');
        this.load.image('island_corner_rd', 'assets/img/bg/island_corner_rd.png');
        this.load.image('island_corner_ru', 'assets/img/bg/island_corner_ru.png');
        this.load.image('island_dot_ld', 'assets/img/bg/island_dot_ld.png');
        this.load.image('island_dot_lu', 'assets/img/bg/island_dot_lu.png');
        this.load.image('island_dot_rd', 'assets/img/bg/island_dot_rd.png');
        this.load.image('island_dot_ru', 'assets/img/bg/island_dot_ru.png');
        this.load.image('island_edge_d', 'assets/img/bg/island_edge_d.png');
        this.load.image('island_edge_l', 'assets/img/bg/island_edge_l.png');
        this.load.image('island_edge_r', 'assets/img/bg/island_edge_r.png');
        this.load.image('island_edge_u', 'assets/img/bg/island_edge_u.png');

        // movables
        this.load.image('box', 'assets/img/movables/box.png');
        this.load.image('player', 'assets/img/movables/player.png');

    }

    create(): void {
        this.add.image(0, 0, 'intro').setOrigin(0, 0);

        let fontSize = 34;
        this.add.bitmapText(256, 60, 'comic-font', 'sokoban Island', 48).setOrigin(0.5, 0.5);

        this.add.sprite(160, 180, 'dialog-button-menu').setInteractive().on('pointerdown', () => {
            this.scene.start('ChooseLevelScene', {startLevel: 0});
        });
        this.add.bitmapText(160, 180, 'comic-font', 'set 1', fontSize).setOrigin(0.5, 0.5);

        this.add.sprite(360, 180, 'dialog-button-menu').setInteractive().on('pointerdown', () => {
            this.scene.start('ChooseLevelScene', {startLevel: 24});
        });
        this.add.bitmapText(360, 180, 'comic-font', 'set 2', fontSize).setOrigin(0.5, 0.5);

        this.add.sprite(160, 260, 'dialog-button-menu').setInteractive().on('pointerdown', () => {
            this.scene.start('ChooseLevelScene', {startLevel: 48});
        });
        this.add.bitmapText(160, 260, 'comic-font', 'set 3', fontSize).setOrigin(0.5, 0.5);

        this.add.sprite(360, 260, 'dialog-button-menu').setInteractive().on('pointerdown', () => {
            this.scene.start('ChooseLevelScene', {startLevel: 72});
        });
        this.add.bitmapText(360, 260, 'comic-font', 'set 4', fontSize).setOrigin(0.5, 0.5);

        this.add.sprite(260, 340, 'dialog-button-menu').setInteractive().on('pointerdown', () => {
            this.scene.start('AboutScene');
        });
        this.add.bitmapText(260, 340, 'comic-font', 'about', 26).setOrigin(0.5, 0.5);
    }

    update(time, delta): void {
    }
}
