class Level3 extends Phaser.Scene {
    constructor() {
        super("level3");
    }

    init() {
        LevelMan.initializeLevel(this);
    }

    create() {
        let levelTilemapName = "platformer-level-5";
        LevelMan.createLevel(this, levelTilemapName);
    }
    

    update() {
        LevelMan.updateLevel(this);
    }
}