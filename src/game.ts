/* tslint:disable-next-line:no-reference */
/// <reference path="../node_modules/phaser3-docs/typescript/phaser.d.ts"/>

import 'phaser';
import {AboutScene} from './scenes/about.scene';
import {ChooseLevelScene} from './scenes/choose-level.scene';
import {LevelScene} from './scenes/level.scene';
import {MainScene} from './scenes/main.scene';

// main game configuration
const config: GameConfig = {
    width: 512,  // 16*32
    height: 384, // 12*32
    type: Phaser.AUTO, // CANVAS | WEBGL
    // pixelArt: true,
    backgroundColor: '#fff',
    parent: 'game',
    scene: [
        MainScene,
        ChooseLevelScene,
        AboutScene,
        LevelScene,
    ],
    physics: {
        default: 'arcade',
        arcade: {},
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
};

export class Game extends Phaser.Game {
    constructor(gameConfig: GameConfig) {
        super(gameConfig);
    }
}

// when the page is loaded, create our game instance
window.onload = () => {
    const game = new Game(config);
};
