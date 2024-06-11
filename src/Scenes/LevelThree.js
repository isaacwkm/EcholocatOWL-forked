class Level3 extends Phaser.Scene {
    constructor() {
        super("level3");
    }

    init() {
        levelMan.initializeLevel(this);
    }

    create() {
        let levelTilemapName = "platformer-level-5";
        levelMan.createLevel(this, levelTilemapName);
    }
    

    update() {
        levelMan.updateLevel(this);
    }
}