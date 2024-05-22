class DrawableObject {

    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;

    loadImage(path) {
        this.img = new Image();
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

    isBottle() {
        return this instanceof BottleRight || this instanceof BottleLeft || this instanceof ThrowableObject;
    }

    isCharacter() {
        return this instanceof Character;
    }

    isCoin() {
        return this instanceof Coin;
    }

    isChicken() {
        return this instanceof Chicken || this instanceof SmallChicken;
    }

    isEndboss() {
        return this instanceof Endboss;
    }

    drawBottleFrame(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '1';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x + 15, this.y, this.width - 30, this.height);
    }

    drawCharacterFrame(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '1';
        ctx.strokeStyle = 'red';
        ctx.rect(this.x + 35, this.y + 130, this.width - 60, this.offset_height);
    }

    drawCoinFrame(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '1';
        ctx.strokeStyle = 'red';
        ctx.rect(this.offsetX, this.offsetY, this.offset_width, this.offset_height);
    }

    drawChickenFrame(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '1';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x + 10, this.y + 5, this.width - 15, this.height);
    }

    drawEndbossFrame(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '1';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x + 40, this.y + 50, this.width, this.height - 80);
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            img.style = 'transform: scaleX(-1)';
            this.imageCache[path] = img;
        });
    }
}