import Sprite = Phaser.GameObjects.Sprite;
import {Direction, LevelScene} from "../scenes/level.scene";

export class Player extends Sprite {
    private currentScene: LevelScene;

    constructor(scene: LevelScene, x: number, y: number) {
        super(scene, x, y, "player");
        // super.setOrigin(0.5, 0.5);

        this.currentScene = scene;
        this.currentScene.add.existing(this);
        // this.anims.play(type + '-move', true);
    }

    move(direction: Direction) {
        // TODO direction
        let x = 0;
        let y = 0;
        switch (direction) {
            case Direction.down:
                y = 1;
                break;
            case Direction.up:
                y = -1;
                break;
            case Direction.left:
                x = -1;
                break;
            case Direction.right:
                x = 1;
                break;
        }
        console.log('player.move(): setting', this.x, '/', this.y);
        this.x += x * this.currentScene.gridSize;
        this.y += y * this.currentScene.gridSize;
        console.log('  .... to', this.x, '/', this.y);
    }


    destroy() {
        super.destroy();
    }

}
