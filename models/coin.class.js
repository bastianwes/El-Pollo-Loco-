/**
 * Represents a coin in the game, which is a type of MovableObject.
 * @extends {MovableObject}
 */
class Coin extends MovableObject {

    offset = {
        top: 40,
        right: 40,
        bottom: 40,
        left: 40
    };

    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    /**
     * Creates an instance of Coin.
     */
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

    /**
     * Animates the coin's appearance, cycling through the coin images.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 280);
    }
}
