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
    scene: [ TitleScreen, Load, PlatformerLevel, inbetween, Level2, inbetween2, Level3, WinScreen ]
}

var cursors;
const SCALE = 2.0;
var my = {
    sprite: {}, 
    text: {}, 
    vfx: {},
    levelMan: {currLevel: 1}};

const game = new Phaser.Game(config);