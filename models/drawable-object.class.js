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

    // loadImage('img/test.png);
    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('image') <img id="iamge" src>
        this.img.src = path;
    }

    loadSingleImage(path) {
        let img = new Image();
        img.src = path;
        return img;
    }

    drawImage(ctx, img, x, y, width, height) {
        ctx.drawImage(img, x, y, width, height);
    }


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    checkInstances() {
        return this instanceof Character ||
            this instanceof Chicken ||
            this instanceof ThrowableObject ||
            this instanceof SmallChicken ||
            this instanceof BottleRight ||
            this instanceof BottleLeft ||
            this instanceof Coin ||
            this instanceof Endboss
    }

    drawFrame(ctx) {
        if (this.checkInstances()) {
            // Berechnung des Rechtecks mit Offset
            let offsetX = this.offset.left;
            let offsetY = this.offset.top;
            let width = this.width - this.offset.left - this.offset.right;
            let height = this.height - this.offset.top - this.offset.bottom;

            // Zeichnen des Rechtecks mit Offset in Rot
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + offsetX, this.y + offsetY, width, height);


            // Zeichnen des ursprünglichen Rechtecks in Blau
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);

        }
    }

    /**
     *
     * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...]
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