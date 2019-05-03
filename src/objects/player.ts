import Sprite = Phaser.GameObjects.Sprite;
import {LevelScene} from '../scenes/level.scene';
import {Coords} from './coords';

export class Player extends Sprite {
    private currentScene: LevelScene;
    private moves;

    public constructor(scene: LevelScene, x: number, y: number) {
        super(scene, x, y, 'player');
        // super.setOrigin(0.5, 0.5);
        this.currentScene = scene;
        this.currentScene.add.existing(this);
        this.moves = 0;
    }

    public move(coords: Coords): void {
        this.moves += 1;
        this.x += coords.x * this.currentScene.gridSize;
        this.y += coords.y * this.currentScene.gridSize;
    }

    public getMoves(): number {
        return this.moves;
    }

}
