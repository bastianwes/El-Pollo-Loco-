/**
 * Represents a throwable object that extends a movable object.
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {

    height = 60;
    width = 50;
    throwDirection;

    IMAGES_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    /**
     * Initializes the throwable object with its position and direction.
     * @param {number} x - The x-coordinate position.
     * @param {number} y - The y-coordinate position.
     * @param {boolean} throwLeft - The direction of the throw (true for left, false for right).
     */
    constructor(x, y, throwLeft) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.throwDirection = throwLeft;
        this.throw();
    }

    /**
     * Initiates the throw action.
     */
    throw() {
        this.speedY = 10;
        this.applyGravity();
        sounds.throw_sound.play();
        if (!this.throwDirection) {
            this.rotationInterval = setInterval(() => {
                this.x += 4;
                this.playAnimation(this.IMAGES_ROTATION);
            }, 700 / 60);
        } else {
            this.rotationInterval = setInterval(() => {
                this.x -= 4;
                this.playAnimation(this.IMAGES_ROTATION);
            }, 700 / 60);
        }
    }

    /**
     * Initiates the splash action when the object hits the ground.
     */
    splashBottle() {
        clearInterval(this.rotationInterval);
        this.loadImages(this.IMAGES_SPLASH);
        this.playAnimation(this.IMAGES_SPLASH);
    }
}
