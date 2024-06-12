// src/Scenes/TitleScreen.js
class TitleScreen extends Phaser.Scene {
    constructor() {
        super("titleScreen");
    }

    preload() {
        // Load any assets for the title screen if necessary
        this.load.image('owl', './assets/owl.png'); // Make sure to provide the correct path to your image
    }

    create() {
        // Add title text
        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 100, 'EcholocatOWL!', {
            fontSize: '64px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        // Add instruction text
        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Press SPACE to Start', {
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        let authorsText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 130, 'Authors:', {
            fontSize: '24px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        let namesText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 160, 'Nolan Jensen & Isaac Kim', {
            fontSize: '24px',
            fill: '#ffffff'
        }).setOrigin(0.5, 0.5);

        // Add the owl images to the left and right of the authors' names
        let owlImageLeft = this.add.image(this.cameras.main.centerX - namesText.width / 2 - 30, this.cameras.main.centerY + 160, 'owl');
        let owlImageRight = this.add.image(this.cameras.main.centerX + namesText.width / 2 + 30, this.cameras.main.centerY + 160, 'owl');
        owlImageLeft.setScale(0.5); // Adjust the scale as necessary
        owlImageRight.setScale(0.5); // Adjust the scale as necessary

        // Add event listener for space key to start the game
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Add a handler for the space key
        this.spaceKey.on('down', () => {
            this.scene.start('loadScene');
        });
    }
}
