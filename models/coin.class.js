class Coin extends MovableObject {

    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_COIN[0]);
        this.loadImages(this.IMAGES_COIN);
        this.x = 100 + Math.random() * 2000;
        this.y = 130 + Math.random() * 100;
        this.width = 120;
        this.height = 120;
        this.offsetX = this.x + 47;
        this.offsetY = this.y + 47;
        this.offset_width = this.width - 90;
        this.offset_height = this.height - 90;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 280);
    }
}