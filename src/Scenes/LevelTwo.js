class Level2 extends Phaser.Scene {
    constructor() {
        super("level2");
    }

    init() {
        levelMan.initializeLevel(this);
    }

    create() {
        let levelTilemapName = "platformer-level-4";
        levelMan.createLevel(this, levelTilemapName);
    }
    

    update() {
        levelMan.updateLevel(this);
    }
}