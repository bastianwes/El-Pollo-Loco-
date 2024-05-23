/**
 * Represents a small chicken object that extends a movable object.
 * @extends MovableObject
 */
class SmallChicken extends MovableObject {

    height = 55;
    width = 70
    y = 360

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    /**
     * Constructs a new SmallChicken object.
     * Loads initial images, sets initial position and speed, and initiates animation.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 450 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }

    /**
     * Initiates animation for the small chicken.
     * Moves the chicken left periodically and plays walking animation.
     */
    animate() {
        setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (!this.isDead()) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }
}