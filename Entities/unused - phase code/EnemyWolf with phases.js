class Wolf extends Enemy {

    // x,y - starting sprite location
    // spriteKey - key for the sprite image asset
    constructor(scene, identifier, x = 0, y = 0, texture = "enemyWolf", frame = null) {
        let properties = {
            id: identifier, // unique identifier
            lifetime: 0, // tick counter to use in cycling behavior phases
            phaseLifetime: 0, // how long the enemy has been in its current behavior mode.
            phase: 0, // 0 = default, other values are specified for in enemy's class file
        }

        super(scene, x, y, texture, frame,  properties);

        this.scene = scene;
        // PHASES BELOW IMPLEMENT IF ABLE
        //this.phases = ["moveRight", "moveLeft"]; // mostly for informational reference. Not to be used over this.properties.phase
        /*this.phaseDurations = [180, 180];
        this.phaseTargets = MiscFunctions.calculatePhaseTargets(this.phaseDurations);
        const arrLen = this.phaseTargets.length;
        const randOffset = Maths.getRandomInt(this.phaseTargets[arrLen - 1]);
        this.properties.phaseLifetime = randOffset; // randOffset makes the enemy's shooting patterns not synchronized perfectly*/

        //this.createFollowerSprites(scene);
        //this.checkPhase();

        return this;
    }

    makeInactive(){
        super.makeInactive();
    }

    update() {
        // Check for class-specific behavior phases:
        //this.updatePhase();

        // Parent Enemy class update procedures
        super.update();

        this.properties.phaseLifetime++
    }

    // Potential phases for this enemy: 
    // 
    updatePhase() {
        let phaseTime = this.properties.phaseLifetime;
        let phaseTargets = this.phaseTargets;

        // Unconditional continuous firing
        if (phaseTime % 180 == 0) {
            this.fireLaser();
        }

        //if (phaseTime % 300 = )

        if (phaseTime < phaseTargets[0]) { // During phase 0: Standby mode

            if (phaseTime == (phaseTargets[0] - 60)) { // Early Animation to foreshadow phase change
                this.shieldSprite1.visible = true; // Update Shield animation
            }
        }
        else if (phaseTime == phaseTargets[0]) { // Transition to phase 1
            this.phaseTransition(1);
        }
        else if (phaseTime < phaseTargets[1]) { // During phase 1: Shield mode

        }
        else if (phaseTime == phaseTargets[1]) { // Transition back to phase 0
            //console.log("Return to phase 0");
            this.phaseTransition(0);
            this.properties.phaseLifetime = 0;
        }

    }

    checkPhase() { // non-continuous version of updatePhase()
        let phaseTime = this.properties.phaseLifetime;
        let phaseTargets = this.phaseTargets;

        if (phaseTime < phaseTargets[0]) { // Transition to phase 0: Standby mode
            this.phaseTransition(0);
        }
        else if (phaseTime < phaseTargets[1]) { // During phase 1: Shield mode
            this.phaseTransition(1);
        }
    }



}