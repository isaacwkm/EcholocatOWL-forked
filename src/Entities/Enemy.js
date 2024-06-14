class Enemy extends Phaser.Physics.Arcade.Sprite {

    // x,y - starting sprite location
    // spriteKey - key for the sprite image asset
    constructor(scene, x, y, texture, frame = null, propertyObj = null) {
        super(scene, x, y, texture, frame);

        // settings
        this.setScale(0.15);
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
        this.properties.lifetime++; // increment lifetime
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