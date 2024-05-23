/**
 * Represents a bottle object positioned on the right side of the game, which is a type of DrawableObject.
 * @extends {DrawableObject}
 */
class BottleRight extends DrawableObject {

    y = 370;
    width = 60;
    height = 70;
    offset = {
        top: 10,
        right: 10,
        bottom: 5,
        left: 20
    };


    constructor() {
        super().loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
        this.x = 280 + Math.random() * 2000;
    }
}