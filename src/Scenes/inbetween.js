// src/Scenes/TitleScreen.js
class inbetween extends Phaser.Scene {
    constructor() {
        super("inbetween");
    }

    preload() {
        // Load any assets for the title screen if necessary
    }

    create() {
        // Add title text
        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 100, 'Level One Complete!', {
            fontSize: '64px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        // Add instruction text
        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Press SPACE to Start Level Two', {
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        // Add event listener for space key to start the game
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Add a handler for the space key
        this.spaceKey.on('down', () => {
            this.scene.start('leveltwo');
        });
    }
}
