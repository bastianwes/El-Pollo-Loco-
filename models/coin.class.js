class Coin extends MovableObject {
  IMAGES_COIN = [
    'img/8_coin/coin_1.png',
    'img/8_coin/coin_2.png'
  ];

  constructor() {
    super().loadImage(this.IMAGES_COIN[0]);
    this.loadImages(this.IMAGES_COIN);

    this.x = 100 + Math.random() * 1500;
    this.y = 75 + Math.random() * 100;
    this.width = 120;
    this.height = 120;

    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COIN);
    }, 280);
  }

}