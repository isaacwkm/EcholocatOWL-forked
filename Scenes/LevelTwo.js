class Level2 extends Phaser.Scene {
    constructor() {
        super("level2");
    }

    init() {
        LevelMan.initializeLevel(this);
    }

    create() {
        let levelTilemapName = "platformer-level-4";
        LevelMan.createLevel(this, levelTilemapName);
    }
    

    update() {
        LevelMan.updateLevel(this);
    }
}