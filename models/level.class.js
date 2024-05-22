/**
 * Represents a level in the game.
 */
class Level {

    enemies;
    endboss;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    level_end_x = 2200;

    /**
     * Creates an instance of Level.
     * @param {Array<MovableObject>} enemies - The enemies in the level.
     * @param {Endboss} endboss - The end boss in the level.
     * @param {Array<Cloud>} clouds - The clouds in the level.
     * @param {Array<BackgroundObject>} backgroundObjects - The background objects in the level.
     * @param {Array<Coin>} coins - The coins in the level.
     * @param {Array<BottleLeft|BottleRight>} bottles - The bottles in the level.
     */
    constructor(enemies, endboss, clouds, backgroundObjects, coins, bottles) {
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}