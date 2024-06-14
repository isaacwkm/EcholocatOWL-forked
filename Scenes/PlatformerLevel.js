class PlatformerLevel extends Phaser.Scene {
    constructor() {
        super("level1");
    }

    init() {
        LevelMan.initializeLevel(this);
    }

    create() {
        let levelTilemapName = "platformer-level-3";
        LevelMan.createLevel(this, levelTilemapName);
    }
    

    update() {
        LevelMan.updateLevel(this);
    }
}