/**
 * Represents a bottle object positioned on the left side of the game, which is a type of DrawableObject.
 * @extends {DrawableObject}
 */
class BottleLeft extends DrawableObject {

    y = 380;
    width = 60;
    height = 70;

    offset = {
        top: 10,
        right: 10,
        bottom: 5,
        left: 20
    };

    /**
     * Constructs a new BottleLeft object.
     */
    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.x = 1000 + Math.random() * 2000;
    }
}