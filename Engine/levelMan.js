// level Manager
class LevelMan {
    constructor() {
    }

    static initializeLevel(scene){
        // variables and settings
        scene.ACCELERATION = 300;
        scene.DRAG = 500;    // DRAG < ACCELERATION = icy slide
        scene.physics.world.gravity.y = 2000;
        scene.JUMP_VELOCITY = -550;
        scene.PARTICLE_VELOCITY = 50;
        scene.SCALE = 2.0;
        scene.OWL_SCALE = 0.15;
        scene.isWorldVisible = false; // Initial visibility of world assets
        scene.canRevealWorld = true;  // Can the world be revealed
        scene.score = 0; // Initialize score
    }

    static createLevel(scene, levelTilemapName){
        // Create a new tilemap game object which uses 18x18 pixel tiles, and is
        // 45 tiles wide and 25 tiles tall.
        scene.map = scene.add.tilemap(levelTilemapName, 18, 18, 45, 25);
    
        // Add a tileset to the map
        scene.tileset = scene.map.addTilesetImage("spritesheet_default", "tilemap_tiles2");
    
        // Create a layer
        scene.groundLayer = scene.map.createLayer("Ground-n-Platforms", scene.tileset, 0, 0);
    
        // Initially set the ground layer visibility to false
        scene.groundLayer.setVisible(scene.isWorldVisible);
    
        // Make it collidable
        scene.groundLayer.setCollisionByProperty({
            collides: true
        });
    
        // Find coins in the "Objects" layer in Phaser
        scene.coins = scene.map.createFromObjects("Objects", {
            name: "coin",
            key: "tilemap_sheet",
            frame: 151
        });
        // Convert coins to Arcade Physics sprites
        scene.physics.world.enable(scene.coins, Phaser.Physics.Arcade.STATIC_BODY);
    
        // Create a Phaser group out of the array scene.coins
        scene.coinGroup = scene.add.group(scene.coins);
    
        // Initially set the coins visibility to false
        scene.coinGroup.children.iterate(coin => coin.setVisible(scene.isWorldVisible));
    
        // Set up player avatar using Owl.png
        my.sprite.player = scene.physics.add.sprite(100, 100, "owl");
        my.sprite.player.setCollideWorldBounds(true);
        my.sprite.player.setScale(scene.OWL_SCALE); // Scale down the owl sprite
    
        // Handle collision detection with coins
        scene.physics.add.overlap(my.sprite.player, scene.coinGroup, (obj1, obj2) => {
            obj2.destroy(); // remove coin on overlap
            LevelMan.updateScore(scene, 1); // Update score by 1
        });

        // Add enemy wolves
        my.enemyMan = null;
        my.enemyMan = new EnemyMan(scene);
        my.enemyMan.placeEnemies();
        
    
        // Enable collision handling
        scene.physics.add.collider(my.sprite.player, scene.groundLayer);
    
        // Set up Phaser-provided cursor key input
        cursors = scene.input.keyboard.createCursorKeys();
    
        scene.rKey = scene.input.keyboard.addKey('R');
        scene.skipLevelKey = scene.input.keyboard.addKey('CLOSED_BRACKET');
        scene.spaceKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
        // Debug key listener (assigned to D key)
        scene.input.keyboard.on('keydown-D', () => {
            scene.physics.world.drawDebug = scene.physics.world.drawDebug ? false : true;
            scene.physics.world.debugGraphic.clear();
        }, scene);
    
        // Movement VFX
        my.vfx.walking = scene.add.particles(0, 0, "kenny-particles", {
            frame: ['smoke_03.png', 'smoke_09.png'],
            scale: { start: 0.03, end: 0.1 },
            lifespan: 350,
            alpha: { start: 1, end: 0.1 },
        });
    
        my.vfx.walking.stop();
    
        // Camera setup
        scene.cameras.main.setBounds(0, 0, scene.map.widthInPixels, scene.map.heightInPixels);
        scene.cameras.main.startFollow(my.sprite.player, true, 0.1, 0.1); // Lower values for smoother follow
        scene.cameras.main.setDeadzone(0, 0); // Adjust deadzone size
        scene.cameras.main.setZoom(scene.SCALE);
    }

    static updateLevel(scene){
        if (cursors.left.isDown) {
            my.sprite.player.setAccelerationX(-scene.ACCELERATION);
            my.sprite.player.resetFlip();
            my.vfx.walking.startFollow(my.sprite.player, my.sprite.player.displayWidth / 2 - 10, my.sprite.player.displayHeight / 2 - 5, false);
            my.vfx.walking.setParticleSpeed(scene.PARTICLE_VELOCITY, 0);

            if (my.sprite.player.body.blocked.down) {
                my.vfx.walking.start();
            }
        } else if (cursors.right.isDown) {
            my.sprite.player.setAccelerationX(scene.ACCELERATION);
            my.sprite.player.setFlip(true, false);
            my.vfx.walking.startFollow(my.sprite.player, my.sprite.player.displayWidth / 2 - 10, my.sprite.player.displayHeight / 2 - 5, false);
            my.vfx.walking.setParticleSpeed(scene.PARTICLE_VELOCITY, 0);

            if (my.sprite.player.body.blocked.down) {
                my.vfx.walking.start();
            }
        } else {
            my.sprite.player.setAccelerationX(0);
            my.sprite.player.setDragX(scene.DRAG);
            my.vfx.walking.stop();
        }

        if (!my.sprite.player.body.blocked.down) {
            // my.sprite.player.anims.play('jump'); // Remove animation play as we are not defining jump animation for owl
        }
        if (my.sprite.player.body.blocked.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
            my.sprite.player.body.setVelocityY(scene.JUMP_VELOCITY);
        }

        // Rotate the owl based on its horizontal velocity
        my.sprite.player.rotation += my.sprite.player.body.velocity.x / 100;

        // Reveal the world for 0.5 seconds and then set a cooldown of 3 seconds
        if (Phaser.Input.Keyboard.JustDown(scene.spaceKey) && scene.canRevealWorld) {
            PlayerAbilities.revealWorld(scene);
        }

        if (Phaser.Input.Keyboard.JustDown(scene.rKey)) {
            scene.scene.restart();
        }

        if (Phaser.Input.Keyboard.JustDown(scene.skipLevelKey)) {
            scene.scene.start("inbetween");
        }
    }

    static updateScore(scene, points) {
        scene.score += points;
        document.getElementById('score').innerText = 'Score: ' + scene.score;
        scene.sound.play("coins", { volume: 0.5 });
        if (scene.score >= 40) {
            scene.scene.start('inbetween');
        }
    }
}
