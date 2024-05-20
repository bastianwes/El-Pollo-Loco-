class BottleRight extends DrawableObject {

  y = 370;
  width = 60;
  height = 70;

  constructor() {
    super().loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png');


    this.x = 280 + Math.random() * 2000;


  }


}