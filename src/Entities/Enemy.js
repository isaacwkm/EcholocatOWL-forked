class Enemy extends Phaser.Physics.Arcade.Sprite {

    // x,y - starting sprite location
    // spriteKey - key for the sprite image asset
    constructor(scene, x, y, texture, frame = null, propertyObj = null) {
        super(scene, x, y, texture, frame);

        // settings
        this.setScale(0.2);
        scene.add.existing(this); // add to scene to make it visible
        scene.physics.add.existing(this);
        this.body.setAllowGravity(false);

        this.scene = scene; // link to scene the enemy is in

        // Game-specific Properties
        this.setProperties(propertyObj);

        // Make active
        this.makeActive();

        console.log("wolf created");

        return this;
    }

    setProperties(){
        let defaultConfig = { // default config object
            lifetime: 0, // tick counter to use in cycling behavior phases
            phaseLifetime: 0, // how long the enemy has been in its current behavior mode.
            phase: 0, // 0 = default, other values are specified for in enemy's class file
        }
        if (this.properties == null){
            this.properties = defaultConfig;
        }
        else {
            this.properties = propertyObj;
        }
    }

    update() {

        if (this.active == false) {
            return;
        }
        this.checkCollision(); // check collision with player
        this.properties.lifetime++; // increment lifetime
    }

    // Check for collision with the enemy
    checkCollision() {
        if (this.collides(this, my.sprite.player)) {
            // #TODO-LOW-PRIO death animation
            my.sprite.player.y = -100; // Current "animation": clear out player from screen immediately
            my.levelMan.currLevel -= 1;
            scene.scene.start("inbetween"); // Restart level #TODO make a lose screen - currently using win screen  of prev level to "restart" the level

            // #TODO Play lose sound
            this.scene.sound.play("SOUNDKEY", {
                volume: 1   // Can adjust volume using this, goes from 0 to 1
            });

            // #TODO Lose/Restart Level

        }

    }

    collides(a, b) {
        if (Math.abs(a.y - b.y) > (a.displayHeight / 2 + b.displayHeight / 2)) return false;
        if (Math.abs(a.x - b.x) > (a.displayWidth / 2 + b.displayWidth / 2)) return false;
        return true;
    }

    makeActive() {
        this.visible = true;
        this.properties.state = 1;
    }

    makeInactive() {
        this.visible = false;
        this.x = -300;
        this.y = -300;
    }

}