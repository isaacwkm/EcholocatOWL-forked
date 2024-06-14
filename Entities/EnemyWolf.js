class EnemyWolf extends Enemy {

    // x,y - starting sprite location
    // spriteKey - key for the sprite image asset
    constructor(scene, x = 0, y = 0, texture = "enemyWolf", frame = null) {
        let properties = {
            lifetime: 0, // tick counter to use in cycling behavior phases
        }

        super(scene, x, y, texture, frame, properties);

        this.scene = scene;

        return this;
    }

    // Any specific functions for the Wolf when it goes inactive go here
    makeInactive(){
        super.makeInactive();
    }

    // Any specific functions for the Wolf during its update phase go here
    update() {

        super.update();

    }

}