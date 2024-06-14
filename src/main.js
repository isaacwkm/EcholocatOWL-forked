// based on code by
//Jim Whitehead
// 
// Art assets from Kenny Assets

// debug with extreme prejudice
"use strict"

// game config
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    width: 3500,
    height: 600,
    scene: [ Load, TitleScreen, PlatformerLevel, LossScreen, inbetween, Level2, Level3, WinScreen]
}

var cursors;
const SCALE = 2.0;
var my = {
    sprite: {}, 
    text: {}, 
    vfx: {},
    levelMan: {currLevel: 1, lastLevel: 3}, // Global variables related to levelMan class
    enemyMan: null // Pointer to enemy manager. EnemyMan is a single pointer without any needing any globals, because only one set of enemies (in a level) can exist at once.
};

const game = new Phaser.Game(config);