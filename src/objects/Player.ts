import Sprite = Phaser.GameObjects.Sprite;
import {Coords, Direction, LevelScene} from "../scenes/level.scene";

export class Player extends Sprite {
    private currentScene: LevelScene;

    constructor(scene: LevelScene, x: number, y: number) {
        super(scene, x, y, "player");
        // super.setOrigin(0.5, 0.5);
        this.currentScene = scene;
        this.currentScene.add.existing(this);
    }

    move(coords: Coords): void {
        this.x += coords.x * this.currentScene.gridSize;
        this.y += coords.y * this.currentScene.gridSize;
    }

}
