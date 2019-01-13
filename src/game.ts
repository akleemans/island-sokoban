/// <reference path="./phaser.d.ts"/>

import "phaser";
import {MainScene} from "./scenes/main.scene";
import {AboutScene} from "./scenes/about.scene";
import {LevelScene} from "./scenes/level.scene";
import {ChooseLevelScene} from "./scenes/choose-level.scene";

// main game configuration
const config: GameConfig = {
    width: 512,  // 16*32
    height: 384, // 12*32
    type: Phaser.AUTO, // CANVAS | WEBGL
    // pixelArt: true,
    backgroundColor: '#fff',
    parent: "game",
    scene: [
        MainScene,
        ChooseLevelScene,
        AboutScene,
        LevelScene
    ],
    physics: {
        default: "arcade",
        arcade: {}
    }
};

// game class
export class Game extends Phaser.Game {
    constructor(config: GameConfig) {
        super(config);
    }
}

// when the page is loaded, create our game instance
window.onload = () => {
    let game = new Game(config);
};
