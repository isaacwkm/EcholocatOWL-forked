// enemy-related functions
class enemyMan {
    constructor(scene) {
        this.scene = scene; // scene that the enemy manager is working on
        this.enemyCount = 0; // total number of enemies in current scene
    }

    placeEnemies(scene = this.scene) {
        // Find wolf enemies in the "Objects" layer in Phaser
        scene.wolves = scene.map.createFromObjects("Objects", {
            name: "enemyWolf",
            key: "enemyWolf"
        });

        // Convert wolves to Arcade Physics sprites
        scene.physics.world.enable(scene.wolves, Phaser.Physics.Arcade.STATIC_BODY);

        // Create a Phaser group out of the array scene.wolves
        scene.wolfGroup = scene.add.group(scene.wolves);

        // Initially set the wolves visibility to false
        scene.wolfGroup.children.iterate(wolf => wolf.setVisible(scene.isWorldVisible));

        // Handle collision detection with wolves
        scene.physics.add.overlap(my.sprite.player, scene.wolfGroup, (obj1, obj2) => {

            // #TODO Play lose sound
            this.scene.sound.play("SOUNDKEY", {
                volume: 1   // Can adjust volume using this, goes from 0 to 1
            });

            // #TODO-LOW-PRIO death animation
            my.sprite.player.y = -100; // Current "animation": clear out player from screen immediately
            my.levelMan.currLevel -= 1;
            scene.scene.start("inbetween"); // Restart level #TODO make a lose screen - currently using win screen  of prev level to "restart" the level
            
        });
    }

}
