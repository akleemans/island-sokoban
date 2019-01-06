export class AboutScene extends Phaser.Scene {

    constructor() {
        super({
            key: "AboutScene"
        });
    }

    preload(): void {
    }

    create(): void {
        this.add.text(40, 40, 'About', {fontFamily: 'Helvetica', fontSize: 32, color: '#333'});
        this.add.text(40, 100, 'Game: Adi', {fontFamily: 'Arial', fontSize: 16, color: '#333'});
        this.add.text(40, 150, 'Sprites: Greenland (Kenney)', {fontFamily: 'Arial', fontSize: 16, color: '#333'});
        this.add.text(40, 200, 'Levels: David W. Skinner', {fontFamily: 'Arial', fontSize: 16, color: '#333'});
        this.add.text(40, 250, 'Music: ???', {fontFamily: 'Arial', fontSize: 16, color: '#333'});
    }

    update(time, delta): void {
    }
}
