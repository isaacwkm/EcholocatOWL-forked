class PlatformerLevel extends Phaser.Scene {
    constructor() {
        super("level1");
    }

    init() {
        levelMan.initializeLevel(this);
    }

    create() {
        let levelTilemapName = "platformer-level-3";
        levelMan.createLevel(this, levelTilemapName);
    }
    

    update() {
        levelMan.updateLevel(this);
    }
}