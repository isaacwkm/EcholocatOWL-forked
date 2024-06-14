// player ability functions
class PlayerAbilities {
    constructor() {
    }

    static revealWorld(scene){
        scene.isWorldVisible = true;
        scene.groundLayer.setVisible(scene.isWorldVisible);
        scene.coinGroup.children.iterate(coin => coin.setVisible(scene.isWorldVisible));
        scene.enemyWolves.forEach(wolf => wolf.setVisible(scene.isWorldVisible)); // Reveal enemies

        scene.canRevealWorld = false;
        scene.sound.play("cardsound", { volume: 0.5 });

        scene.time.delayedCall(500, () => {
            scene.isWorldVisible = false;
            scene.groundLayer.setVisible(scene.isWorldVisible);
            scene.coinGroup.children.iterate(coin => coin.setVisible(scene.isWorldVisible));
            scene.enemyWolves.forEach(wolf => wolf.setVisible(scene.isWorldVisible)); // Hide enemies

        }, [], scene);

        scene.time.delayedCall(3000, () => {
            scene.canRevealWorld = true;
        }, [], scene);
    }
    create() {
        // create game objects
        // Example of using PlayerAbilities:
        PlayerAbilities.revealWorld(this);
    }
}

