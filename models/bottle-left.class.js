class BottleLeft extends DrawableObject {

    y = 380;
    width = 60;
    height = 70;

    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.x = 1000 + Math.random() * 2000;
    }
}