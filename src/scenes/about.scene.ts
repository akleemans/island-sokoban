export class AboutScene extends Phaser.Scene {

    public constructor() {
        super({
            key: 'AboutScene',
        });
    }

    public create(): void {
        this.add.image(0, 0, 'intro').setOrigin(0, 0);

        this.add.bitmapText(50, 40, 'comic-font', 'about', 32);
        this.add.bitmapText(50, 100, 'comic-font', 'game:', 20);
        this.add.bitmapText(50, 140, 'comic-font', '    adrianus kleemans', 20);
        this.add.bitmapText(50, 180, 'comic-font', 'sprites:', 20);
        this.add.bitmapText(50, 220, 'comic-font', '    greenland by kenney', 20);
        this.add.bitmapText(50, 260, 'comic-font', 'levels:', 20);
        this.add.bitmapText(50, 300, 'comic-font', '    microban by david w. skinner', 20);

        this.add.sprite(50, 340, 'square-clear').setOrigin(0.5, 0.5).setInteractive()
            .on('pointerdown', () => {
                this.scene.start('MainScene');
            });
        this.add.bitmapText(50, 340, 'comic-font', '<', 32).setOrigin(0.5, 0.5);
    }
}
