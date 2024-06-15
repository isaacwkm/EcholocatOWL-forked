// enemy-related functions
class EnemyMan {
    constructor(scene) {
        this.scene = scene; // scene that the enemy manager is working on
        this.enemyCount = 0; // total number of enemies in current scene
    }

    placeEnemies(scene = this.scene) {
        // Find wolf enemies in the "Objects" layer in Phaser
        console.log("placeEnemies()");
        scene.enemyWolfSpawn = scene.map.createFromObjects("Objects", {
            name: "enemyWolfSpawn",
            key: "tilemap_sheet",
            frame: 152
        });
        console.log("enemyWolfSpawn.length: " + scene.enemyWolfSpawn.length);

        scene.enemyWolves = [];

        //Initialize enemy wolves at enemy spawns  
        for (let i = 0; i < scene.enemyWolfSpawn.length; i++){
            console.log("starting to make a wolf");
            let enemy = new EnemyWolf(scene, scene.enemyWolfSpawn[i].x, scene.enemyWolfSpawn[i].y, "enemyWolf");
            enemy.setVisible(false); // Hide the enemy initially
            scene.enemyWolves.push(enemy);
        }

        //Collider properties for player with enemyWolf        
        scene.physics.add.collider(my.sprite.player, scene.enemyWolves, (obj1, obj2) => {
            this.deathByEnemy();  
        })

    }

    deathByEnemy(){
        // #TODO Play lose sound
        this.scene.sound.play("coins", {
            volume: 1   // Can adjust volume using this, goes from 0 to 1
        });

        // #TODO-LOW-PRIO death animation
        my.sprite.player.y = -100; // Current "animation": clear out player from screen immediately
        my.LevelMan.currLevel -= 1;
        this.scene.scene.start("lossScreen"); // Restart level #TODO make a lose screen - currently using win screen  of prev level to "restart" the level
        
    }

}
