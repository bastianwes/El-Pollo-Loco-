class MovableObject extends DrawableObject {
    speed = 0.20;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    numberOfBottles = 0;
    numberOfCoins = 0;
    lastHit = 0;

    applyGravity() {
        this.gravityInterval = setInterval(() => {
            if (!this.splashAnimationPlayed && (this.isAboveGround() || this.speedY > 0)) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 20);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
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
            rectY = this.y + 130;
            rectWidth = this.width - 50;
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

    hitEndboss() {
        this.energy -= 20;
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
            if (sounds.bottle_sound.ended || sounds.bottle_sound.paused) {
                sounds.bottle_sound.play();
            } else {
                // Wenn das vorherige Audio noch nicht beendet ist, starte es von Anfang an
                sounds.bottle_sound.currentTime = 0;
                sounds.bottle_sound.play();
            }

            return true;
        } else {
            return false;
        }
    }


    collectCoin() {
        if (this.numberOfCoins < 10) {
            this.numberOfCoins++;
            if (sounds.coin_sound.ended || sounds.coin_sound.paused) {
                sounds.coin_sound.play();
            } else {
                sounds.coin_sound.currentTime = 0;
                sounds.coin_sound.play();
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
        sounds.glass_sound.play();
        return this.energy;
    }

    chickenDead() {
        if (this.energy >= 0) {
            sounds.jumpOnEnemy.play();
            this.playAnimation(this.IMAGES_DEAD);
        }
    }

    endBossHurt() {
        return this.energy < 100; // oder einen anderen geeigneten Schwellenwert verwenden
    }

    applyDamageWithBottle() {
        this.energy -= 100;
        sounds.glass_sound.play();
        return this.energy;
    }

    splashBottleEndboss() {
        if (this.energy >= 0 && this.energy <= 100) {
            this.playAnimation(this.IMAGES_SPLASH);
            sounds.glass_sound.play();
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

    moveTowardsCharacter() {
        if (world.character.x <= this.x) {
            this.moveLeftAttack();
        } else {
            this.moveRightAttack();
        }
    }

    moveLeftAttack() {
        this.otherDirection = false;
        this.x -= 20;
    }

    moveRightAttack() {
        this.otherDirection = true;
        this.x += 20;
    }


}