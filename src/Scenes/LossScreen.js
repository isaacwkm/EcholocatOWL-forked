// src/Scenes/TitleScreen.js
class LossScreen extends Phaser.Scene {
    constructor() {
        super("lossScreen");
    }

    preload() {
    }

    create() {
        // Play sound
        //this.sound.play("winner", { volume: 0.5 });

        if (my.levelMan.currLevel == (my.levelMan.lastLevel)){
            this.scene.start("winScreen")
        }

        // Add title text
        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 100, "Eaten by a wolf!", {
            fontSize: '64px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        // Add instruction text
        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Press SPACE to Restart Level ' + (my.levelMan.currLevel + 1), {
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
