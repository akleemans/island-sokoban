import Sprite = Phaser.GameObjects.Sprite;
import {Coords, LevelScene} from "../scenes/level.scene";

export class Box extends Sprite {
    private currentScene: LevelScene;

    constructor(scene: LevelScene, x: number, y: number) {
        super(scene, x, y, "box");
        // super.setOrigin(0.5, 0.5);
        this.currentScene = scene;
        this.currentScene.add.existing(this);
    }

    move(coords: Coords): void {
        this.x += coords.x * this.currentScene.gridSize;
        this.y += coords.y * this.currentScene.gridSize;
    }

}
