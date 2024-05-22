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

    isColliding(mo) {
        const rect = this.getCollisionRectangle();
        return rect.x + rect.width > mo.x &&
            rect.y + rect.height > mo.y &&
            rect.x < mo.x + mo.width &&
            rect.y < mo.y + mo.height;
    }

    getCollisionRectangle() {
        if (this.isCharacter()) {
            return this.getCharacterCollisionRect();
        } else if (this.isCoin()) {
            return this.getCoinCollisionRect();
        } else if (this.isChicken()) {
            return this.getChickenCollisionRect();
        } else if (this.isEndboss()) {
            return this.getEndbossCollisionRect();
        } else {
            return this.getDefaultCollisionRect();
        }
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

    getCharacterCollisionRect() {
        return {
            x: this.x + 35,
            y: this.y + 130,
            width: this.width - 60,
            height: this.offset_height
        };
    }

    getCoinCollisionRect() {
        return {
            x: this.offsetX,
            y: this.offsetY,
            width: this.offset_width,
            height: this.offset_height
        };
    }

    getChickenCollisionRect() {
        return {
            x: this.x + 10,
            y: this.y + 5,
            width: this.width - 15,
            height: this.height + 30
        };
    }

    getEndbossCollisionRect() {
        return {
            x: this.x + 40,
            y: this.y + 50,
            width: this.width,
            height: this.height
        };
    }

    getDefaultCollisionRect() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
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
            if (sounds.bottle_sound.ended || sounds.bottle_sound.paused) {
                sounds.bottle_sound.play();
            } else {
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
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 300;
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
        return this.energy < 100;
    }

    applyDamageWithBottle() {
        this.energy -= 100;
        sounds.glass_sound.play();
        return this.energy;
    }

    splashBottleEndboss() {
        if (this.energy >= 0 && this.energy <= 100) {
            sounds.glass_sound.play();
        }
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
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
        this.x -= 30;
    }

    moveRightAttack() {
        this.otherDirection = true;
        this.x += 30;
    }
}