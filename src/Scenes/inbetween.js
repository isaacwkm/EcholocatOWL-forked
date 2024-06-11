// src/Scenes/TitleScreen.js
class inbetween extends Phaser.Scene {
    constructor() {
        super("inbetween");
    }

    preload() {
        // Load any assets for the title screen if necessary
    }

    create() {
        // Play winner sound
        this.sound.play("winner", { volume: 0.5 });

        // Add title text
        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 100, "Level " + (my.levelMan.currLevel) + " Complete!", {
            fontSize: '64px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        // Add instruction text
        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Press SPACE to Start Level ' + (my.levelMan.currLevel + 1), {
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        // Add event listener for space key to start the game
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Add a handler for the space key
        this.spaceKey.on('down', () => {
            my.levelMan.currLevel += 1; // increment global currenet level
            let sceneName = "level" + my.levelMan.currLevel; // set string to the next scene name
            this.scene.start(sceneName); // go to next scene
        });
    }
}
