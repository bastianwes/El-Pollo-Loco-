/**
 * Represents a background object in the game, which is a type of MovableObject.
 * @extends {MovableObject}
 */
class BackgroundObject extends MovableObject {

    width = 720;
    height = 480;

    /**
    * Constructs a new BackgroundObject.
    * @param {string} imagePath - The path to the image for the background object.
    */
    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}