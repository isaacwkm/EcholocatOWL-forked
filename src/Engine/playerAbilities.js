// player ability functions
class PlayerAbilities {
    constructor() {
    }

    static revealWorld(scene){
        scene.isWorldVisible = true;
        scene.groundLayer.setVisible(scene.isWorldVisible);
        scene.coinGroup.children.iterate(coin => coin.setVisible(scene.isWorldVisible));
        //scene.enemyWolves.children.iterate(wolf => wolf.setVisible(scene.isWorldVisible));
        scene.canRevealWorld = false;
        //scene.sound.play("echosound", { volume: 1 });
        scene.sound.play("cardsound", { volume: 0.5 });

        scene.time.delayedCall(500, () => {
            scene.isWorldVisible = false;
            scene.groundLayer.setVisible(scene.isWorldVisible);
            scene.coinGroup.children.iterate(coin => coin.setVisible(scene.isWorldVisible));
            //scene.enemyWolves.children.iterate(wolf => wolf.setVisible(scene.isWorldVisible));

        }, [], scene);

        scene.time.delayedCall(3000, () => {
            scene.canRevealWorld = true;
        }, [], scene);
    }
}
