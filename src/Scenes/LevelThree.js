class LevelThree extends Phaser.Scene {
    constructor() {
        super("levelthree");
    }

    init() {
        // variables and settings
        this.ACCELERATION = 300;
        this.DRAG = 500;    // DRAG < ACCELERATION = icy slide
        this.physics.world.gravity.y = 2000;
        this.JUMP_VELOCITY = -550;
        this.PARTICLE_VELOCITY = 50;
        this.SCALE = 2.0;
        this.OWL_SCALE = 0.15;
        this.isWorldVisible = false; // Initial visibility of world assets
        this.canRevealWorld = true;  // Can the world be revealed
        this.score = 0; // Initialize score
    }

    create() {
        // Create a new tilemap game object which uses 18x18 pixel tiles, and is
        // 45 tiles wide and 25 tiles tall.
        this.map = this.add.tilemap("platformer-level-5", 18, 18, 45, 25);
    
        // Add a tileset to the map
        this.tileset = this.map.addTilesetImage("spritesheet_default", "tilemap_tiles2");
    
        // Create a layer
        this.groundLayer = this.map.createLayer("Ground-n-Platforms", this.tileset, 0, 0);
    
        // Initially set the ground layer visibility to false
        this.groundLayer.setVisible(this.isWorldVisible);
    
        // Make it collidable
        this.groundLayer.setCollisionByProperty({
            collides: true
        });
    
        // Find coins in the "Objects" layer in Phaser
        this.coins = this.map.createFromObjects("Objects", {
            name: "coin",
            key: "tilemap_sheet",
            frame: 151
        });
    
        // Convert coins to Arcade Physics sprites
        this.physics.world.enable(this.coins, Phaser.Physics.Arcade.STATIC_BODY);
    
        // Create a Phaser group out of the array this.coins
        this.coinGroup = this.add.group(this.coins);
    
        // Initially set the coins visibility to false
        this.coinGroup.children.iterate(coin => coin.setVisible(this.isWorldVisible));
    
        // Set up player avatar using Owl.png
        my.sprite.player = this.physics.add.sprite(100, 100, "owl");
        my.sprite.player.setCollideWorldBounds(true);
        my.sprite.player.setScale(this.OWL_SCALE); // Scale down the owl sprite
    
        // Handle collision detection with coins
        this.physics.add.overlap(my.sprite.player, this.coinGroup, (obj1, obj2) => {
            obj2.destroy(); // remove coin on overlap
            this.updateScore(1); // Update score by 1
        });
    
        // Enable collision handling
        this.physics.add.collider(my.sprite.player, this.groundLayer);
    
        // Set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();
    
        this.rKey = this.input.keyboard.addKey('R');
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
        // Debug key listener (assigned to D key)
        this.input.keyboard.on('keydown-D', () => {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true;
            this.physics.world.debugGraphic.clear();
        }, this);
    
        // Movement VFX
        my.vfx.walking = this.add.particles(0, 0, "kenny-particles", {
            frame: ['smoke_03.png', 'smoke_09.png'],
            scale: { start: 0.03, end: 0.1 },
            lifespan: 350,
            alpha: { start: 1, end: 0.1 },
        });
    
        my.vfx.walking.stop();
    
        // Camera setup
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(my.sprite.player, true, 0.1, 0.1); // Lower values for smoother follow
        this.cameras.main.setDeadzone(0, 0); // Adjust deadzone size
        this.cameras.main.setZoom(this.SCALE);
        
    }
    

    update() {
        if (cursors.left.isDown) {
            my.sprite.player.setAccelerationX(-this.ACCELERATION);
            my.sprite.player.resetFlip();
            my.vfx.walking.startFollow(my.sprite.player, my.sprite.player.displayWidth / 2 - 10, my.sprite.player.displayHeight / 2 - 5, false);
            my.vfx.walking.setParticleSpeed(this.PARTICLE_VELOCITY, 0);

            if (my.sprite.player.body.blocked.down) {
                my.vfx.walking.start();
            }
        } else if (cursors.right.isDown) {
            my.sprite.player.setAccelerationX(this.ACCELERATION);
            my.sprite.player.setFlip(true, false);
            my.vfx.walking.startFollow(my.sprite.player, my.sprite.player.displayWidth / 2 - 10, my.sprite.player.displayHeight / 2 - 5, false);
            my.vfx.walking.setParticleSpeed(this.PARTICLE_VELOCITY, 0);

            if (my.sprite.player.body.blocked.down) {
                my.vfx.walking.start();
            }
        } else {
            my.sprite.player.setAccelerationX(0);
            my.sprite.player.setDragX(this.DRAG);
            my.vfx.walking.stop();
        }

        if (!my.sprite.player.body.blocked.down) {
            // my.sprite.player.anims.play('jump'); // Remove animation play as we are not defining jump animation for owl
        }
        if (my.sprite.player.body.blocked.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
            my.sprite.player.body.setVelocityY(this.JUMP_VELOCITY);
        }

        // Rotate the owl based on its horizontal velocity
        my.sprite.player.rotation += my.sprite.player.body.velocity.x / 100;

        // Reveal the world for 0.5 seconds and then set a cooldown of 3 seconds
        if (Phaser.Input.Keyboard.JustDown(this.spaceKey) && this.canRevealWorld) {
            this.revealWorld();
        }

        if (Phaser.Input.Keyboard.JustDown(this.rKey)) {
            this.scene.restart();
        }
    }

    revealWorld() {
        this.isWorldVisible = true;
        this.groundLayer.setVisible(this.isWorldVisible);
        this.coinGroup.children.iterate(coin => coin.setVisible(this.isWorldVisible));
        this.canRevealWorld = false;
        //this.sound.play("echosound", { volume: 1 });
        this.sound.play("cardsound", { volume: 0.5 });

        this.time.delayedCall(500, () => {
            this.isWorldVisible = false;
            this.groundLayer.setVisible(this.isWorldVisible);
            this.coinGroup.children.iterate(coin => coin.setVisible(this.isWorldVisible));
        }, [], this);

        this.time.delayedCall(3000, () => {
            this.canRevealWorld = true;
        }, [], this);
    }

    updateScore(points) {
        this.score += points;
        document.getElementById('score').innerText = 'Score: ' + this.score;
        this.sound.play("coins", { volume: 0.5 });
        if (this.score >= 40) {
            this.sound.play("winner", { volume: 0.5 });
            this.scene.start('winScreen');
        }
    }
}