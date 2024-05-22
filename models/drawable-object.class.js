/**
 * Represents a drawable object in the game.
 */
class DrawableObject {

    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;

    /**
     * Loads an image from the given path.
     * @param {string} path - The path to the image.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads a single image from the given path.
     * @param {string} path - The path to the image.
     * @returns {HTMLImageElement} - The loaded image.
     */
    loadSingleImage(path) {
        let img = new Image();
        img.src = path;
        return img;
    }

    /**
     * Draws the image on the canvas context at the specified position and size.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Draws a frame around the object depending on its type.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawFrame(ctx) {
        if (this.isBottle()) {
            this.drawBottleFrame(ctx);
        }
        if (this.isCharacter()) {
            this.drawCharacterFrame(ctx);
        }
        if (this.isCoin()) {
            this.drawCoinFrame(ctx);
        }
        if (this.isChicken()) {
            this.drawChickenFrame(ctx);
        }
        if (this.isEndboss()) {
            this.drawEndbossFrame(ctx);
        }
    }

    /**
     * Checks if the object is a bottle.
     * @returns {boolean} - True if the object is a bottle, false otherwise.
     */
    isBottle() {
        return this instanceof BottleRight || this instanceof BottleLeft || this instanceof ThrowableObject;
    }

    /**
     * Checks if the object is a character.
     * @returns {boolean} - True if the object is a character, false otherwise.
     */
    isCharacter() {
        return this instanceof Character;
    }

    /**
     * Checks if the object is a coin.
     * @returns {boolean} - True if the object is a coin, false otherwise.
     */
    isCoin() {
        return this instanceof Coin;
    }

    /**
     * Checks if the object is a chicken.
     * @returns {boolean} - True if the object is a chicken, false otherwise.
     */
    isChicken() {
        return this instanceof Chicken || this instanceof SmallChicken;
    }

    /**
     * Checks if the object is an end boss.
     * @returns {boolean} - True if the object is an end boss, false otherwise.
     */
    isEndboss() {
        return this instanceof Endboss;
    }

    /**
     * Draws a frame around the bottle object.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawBottleFrame(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '1';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x + 15, this.y, this.width - 30, this.height);
    }

    /**
     * Draws a frame around the character object.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawCharacterFrame(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '1';
        ctx.strokeStyle = 'red';
        ctx.rect(this.x + 35, this.y + 130, this.width - 60, this.offset_height);
    }

    /**
     * Draws a frame around the coin object.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawCoinFrame(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '1';
        ctx.strokeStyle = 'red';
        ctx.rect(this.offsetX, this.offsetY, this.offset_width, this.offset_height);
    }

    /**
     * Draws a frame around the chicken object.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawChickenFrame(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '1';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x + 10, this.y + 5, this.width - 15, this.height);
    }

    /**
     * Draws a frame around the end boss object.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawEndbossFrame(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '1';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x + 40, this.y + 50, this.width, this.height - 80);
    }

    /**
     * Loads images from an array of paths and caches them.
     * @param {string[]} arr - Array of image paths.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            img.style = 'transform: scaleX(-1)';
            this.imageCache[path] = img;
        });
    }
}