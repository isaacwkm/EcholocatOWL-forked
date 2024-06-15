class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.setPath("assets/");
        
        // Load TILEMAPS (assets/levels_tilemap)
        //
        // #TILEMAPS
        this.load.setPath("assets/levels_tilemap");
        this.load.tilemapTiledJSON("platformer-level-1", "platformer-level-1.tmj");   // Tilemap in JSON
        this.load.tilemapTiledJSON("platformer-level-2", "platformer-level-2.tmj");
        this.load.tilemapTiledJSON("platformer-level-3", "platformer-level-3.tmj");
        this.load.tilemapTiledJSON("platformer-level-4", "platformer-level-4.tmj");
        this.load.tilemapTiledJSON("platformer-level-5", "platformer-level-5.tmj");
        this.load.image("tilemap_tiles", "tilemap_packed.png");     // Packed tilemap
        this.load.image("tilemap_tiles2", "spritesheet_default.png");
        this.load.atlas("platformer_characters", "tilemap-characters-packed.png", "tilemap-characters-packed.json");

        // #TILEMAPS
        // Spritesheet stuff
        // Load the tilemap as a spritesheet
        this.load.spritesheet("tilemap_sheet", "tilemap_packed.png", {
            frameWidth: 18,
            frameHeight: 18
        });
        this.load.spritesheet("tilemap_sheet2", "spritesheet_default.png", {
            frameWidth: 18,
            frameHeight: 18
        });

        // Load IMAGES
        //
        // #IMAGES
        // Load the Owl image(s) for PLAYER
        this.load.setPath("assets/images/sprites/Player");
        this.load.image("owl", "owl.png");

        // #IMAGES
        // Load other character sprites for ENEMY
        this.load.setPath("assets/images/sprites/Enemy");
        this.load.image("enemyWolf", "wolf.png");
        this.load.image("enemyCroc", "croc.png");

        // #IMAGES
        // Load Kenny Particles
        this.load.setPath("assets/images/particles/kenny-particles");
        // Oooh, fancy. A multi atlas is a texture atlas which has the textures spread
        // across multiple png files, so as to keep their size small for use with
        // lower resource devices (like mobile phones).
        // kenny-particles.json internally has a list of the png files
        // The multiatlas was created using TexturePacker and the Kenny
        // Particle Pack asset pack.
        this.load.multiatlas("kenny-particles", "kenny-particles.json");


        // Load AUDIO
        //
        // #AUDIO
        // Load sound effects
        this.load.setPath("assets/audio/sfx");
        this.load.audio("echosound", "echoloco.ogg");
        this.load.audio("cardsound", "cardOpenPackage1.ogg");
        this.load.audio("coins", "coins.ogg");
        this.load.audio("winner", "winner.ogg");
    }

    create() {
        // No need to create animations for the owl if it's a static image

         // ...and pass to the next Scene
         this.scene.start("titleScreen");
    }

    // Never get here since a new scene is started in create()
    update() {
    }
}
