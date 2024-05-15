class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    numberOfBottles = 0;
    numberOfCoins = 0;
    lastHit = 0;
    bottle_sound = new Audio('audio/bottle.mp3');
    glass_sound = new Audio('audio/glass.mp3');
    coin_sound = new Audio('audio/coin.mp3');
    applyGravity() {
        this.gravityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 20);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) { // Throwable object should always fall
            return true;
        } else {
            return this.y < 180;
        }
    }


    // character.isColliding(chicken);
    isColliding(mo) {
        let rectX, rectY, rectWidth, rectHeight;

        if (this instanceof Character) {
            rectX = this.x;
            rectY = this.y + 100;
            rectWidth = this.width;
            rectHeight = this.offset_height;
        } else if (this instanceof Coin) {
            rectX = this.offsetX;
            rectY = this.offsetY;
            rectWidth = this.offset_width;
            rectHeight = this.offset_height;
        } else if (this instanceof Chicken || this instanceof SmallChicken) {
            rectX = this.x;
            rectY = this.y;
            rectWidth = this.width;
            rectHeight = this.height + 30;
        } else {
            rectX = this.x;
            rectY = this.y;
            rectWidth = this.width;
            rectHeight = this.height;
        }

        return rectX + rectWidth > mo.x &&
            rectY + rectHeight > mo.y &&
            rectX < mo.x + mo.width &&
            rectY < mo.y + mo.height;
    }


    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    collectBottle() {
        if (this.numberOfBottles < 5) {
            this.numberOfBottles++;

            // Überprüfe, ob das vorherige Audio beendet ist
            if (this.bottle_sound.ended || this.bottle_sound.paused) {
                this.bottle_sound.play();
            } else {
                // Wenn das vorherige Audio noch nicht beendet ist, starte es von Anfang an
                this.bottle_sound.currentTime = 0;
                this.bottle_sound.play();
            }

            return true;
        } else {
            return false;
        }
    }


    collectCoin() {
        if (this.numberOfCoins < 10) {
            this.numberOfCoins++;
            if (this.coin_sound.ended || this.coin_sound.paused) {
                this.coin_sound.play();
            } else {
                this.coin_sound.currentTime = 0;
                this.coin_sound.play();
            }
            return true;
        } else {
            return false;
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 300; // Difference in s
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    applyDamage() {
        this.energy -= 100;
        return this.energy;
    }

    applyDamageWithBottle() {
        this.energy -= 100;
        this.glass_sound.play();
        return this.energy;
    }

    chickenDead() {
        if (this.energy >= 0) {
            this.playAnimation(this.IMAGES_DEAD);
        }
    }

    applyDamageWithBottle() {
        this.energy -= 100;
        this.glass_sound.play();
        return this.energy;
    }

    splashBottle() {
        if (this.energy >= 0) {
            this.playAnimation(this.IMAGES_SPLASH);
        }
    }

    playAnimation(images) {
        let i = this.currentImage % images.length; // let i = 7 % 6; =>  1, Rest 1
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
    }

    isFalling() {
        return this.speedY < 0;
    }
}