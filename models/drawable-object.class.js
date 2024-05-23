/**
 * Class representing a drawable object.
 */
class DrawableObject {

    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;

    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };

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
     * @returns {HTMLImageElement} - The loaded image object.
     */
    loadSingleImage(path) {
        let img = new Image();
        img.src = path;
        return img;
    }

    /**
     * Draws the given image on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     * @param {HTMLImageElement} img - The image to draw.
     * @param {number} x - X coordinate for drawing.
     * @param {number} y - Y coordinate for drawing.
     * @param {number} width - Width of the drawn image.
     * @param {number} height - Height of the drawn image.
     */
    drawImage(ctx, img, x, y, width, height) {
        ctx.drawImage(img, x, y, width, height);
    }

    /**
     * Draws the object on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Checks if the object is an instance of certain classes.
     * @returns {boolean} - True if the object is an instance of certain classes, false otherwise.
     */
    checkInstances() {
        return this instanceof Character ||
            this instanceof Chicken ||
            this instanceof ThrowableObject ||
            this instanceof SmallChicken ||
            this instanceof BottleRight ||
            this instanceof BottleLeft ||
            this instanceof Coin ||
            this instanceof Endboss;
    }

    /**
     * Draws a frame around the object.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawFrame(ctx) {
        if (this.checkInstances()) {
            let offsetX = this.offset.left;
            let offsetY = this.offset.top;
            let width = this.width - this.offset.left - this.offset.right;
            let height = this.height - this.offset.top - this.offset.bottom;

            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + offsetX, this.y + offsetY, width, height);

            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
        }
    }

    /**
     * Loads multiple images from an array of paths.
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