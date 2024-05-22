/**
 * Represents a cloud in the game, which is a type of MovableObject.
 * @extends {MovableObject}
 */
class Cloud extends MovableObject {

    y = 20;
    height = 250;
    width = 500;

    /**
     * Creates an instance of Cloud.
     * @param {string} imagePath - The path to the cloud image.
     * @param {number} x - The initial x-coordinate of the cloud.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.animate();
    }

    /**
     * Animates the cloud's movement to the left.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}