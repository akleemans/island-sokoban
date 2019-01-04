import Sprite = Phaser.GameObjects.Sprite;
import {Direction, LevelScene} from "../scenes/level.scene";

export class Player extends Sprite {
    private currentScene: LevelScene;

    constructor(scene: LevelScene, x: number, y: number) {
        super(scene, x, y, "string");
        // super.setOrigin(0.5, 0.5);

        this.currentScene = scene;
        this.currentScene.add.existing(this);
        // this.anims.play(type + '-move', true);
    }

    move(direction: Direction) {
        // TODO direction
        /*
        let direction = this.currentScene.getPathDirection(this);
        this.x += this.speed * direction[0];
        this.y += this.speed * direction[1];
        */
    }


    destroy() {
        super.destroy();
    }

}
