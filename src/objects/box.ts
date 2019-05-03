import Sprite = Phaser.GameObjects.Sprite;
import {LevelScene} from '../scenes/level.scene';
import {Coords} from './coords';

export class Box extends Sprite {
    private currentScene: LevelScene;

    constructor(scene: LevelScene, x: number, y: number) {
        super(scene, x, y, 'box');
        this.currentScene = scene;
        this.currentScene.add.existing(this);
    }

    public move(coords: Coords): void {
        this.x += coords.x * this.currentScene.gridSize;
        this.y += coords.y * this.currentScene.gridSize;
    }

}
