// src/Scenes/WinScreen.js
class WinScreen extends Phaser.Scene {
    constructor() {
        super("winScreen");
    }

    preload() {
        // Load any assets for the win screen if necessary
    }

    create() {
        // Add win text
        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 100, 'You Win!', {
            fontSize: '64px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        // Add instruction text to restart or go back to the title screen
        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Press SPACE to Restart', {
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        // Add event listener for space key to restart the game
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Add a handler for the space key
        this.spaceKey.on('down', () => {
            my.levelMan.currLevel = 1;
            this.scene.start('titleScreen');
        });
    }
}
