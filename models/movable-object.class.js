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
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
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
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height;
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
            this.bottle_sound.play();
            console.log("Eine Flasche wurde gesammelt. Anzahl der Flaschen:", this.numberOfBottles);
            return true;
        } else {
            console.log("Maximale Anzahl an Flaschen bereits gesammelt.");
            return false;
        }
    }

    collectCoin() {
        if (this.numberOfCoins < 10) {
            this.numberOfCoins++;
            console.log("Eine Münze wurde gesammelt");
            return true;
        } else {
            console.log("Maximale Anzahl an Flaschen bereits gesammelt.");
            return false;
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 1000; // Difference in s
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
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
}