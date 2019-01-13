export class AboutScene extends Phaser.Scene {

    constructor() {
        super({
            key: "AboutScene"
        });
    }

    preload(): void {
    }

    create(): void {
        this.add.bitmapText(50, 40, 'comic-font', 'about', 32);
        this.add.bitmapText(50, 100, 'comic-font', 'game: adrianus kleemans', 20);
        this.add.bitmapText(50, 150, 'comic-font', 'sprites: greenland by kenney', 20);
        this.add.bitmapText(50, 200, 'comic-font', 'levels: microban by david w. skinner', 20);

        this.add.sprite(50, 340, 'square-clear').setOrigin(0.5, 0.5).setInteractive()
            .on('pointerdown', () => {
                this.scene.start('MainScene');
            });
        this.add.bitmapText(50, 340, 'comic-font', '<', 32).setOrigin(0.5, 0.5);
    }

    update(time, delta): void {
    }
}
