/**
 * Class representing a movable object, extending DrawableObject.
 */
class MovableObject extends DrawableObject {

    speed = 0.20;
    otherDirection = false;
    speedY = 0.3;
    acceleration = 1.4;
    energy = 100;
    numberOfBottles = 0;
    numberOfCoins = 0;
    lastHit = 0;

    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };

    /**
    * Applies gravity to the movable object.
    */
    applyGravity() {
        this.gravityInterval = setInterval(() => {
            if (!this.splashAnimationPlayed && (this.isAboveGround() || this.speedY > 0)) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                this.y = 190;
                this.speedY = 0;
            }
        }, 1000 / 60);
    }

    /**
     * Checks if the movable object is above the ground.
     * @returns {boolean} - True if above ground, false otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else if (this instanceof Character) {
            return this.y < 190;
        } else if (this instanceof Chicken && this instanceof SmallChicken) {
            return this.y < 360;
        }
    }

    /**
         * Checks if the movable object is colliding with another object.
         * @param {MovableObject} mo - The other movable object to check collision with.
         * @returns {boolean} - True if colliding, false otherwise.
         */
    isColliding(mo) {
        return (this.x + this.width - this.offset.right) > (mo.x + mo.offset.left) &&
            (this.y + this.height - this.offset.bottom) > (mo.y + mo.offset.top) &&
            (this.x + this.offset.left) < (mo.x + mo.width - mo.offset.right) &&
            (this.y + this.offset.top) < (mo.y + mo.height - mo.offset.bottom)
    }

    /**
         * Handles the hit event on the movable object.
         */
    hit() {
        if (!this.isHurt()) {
            this.energy -= 5;
            if (this.energy < 0) {
                this.energy = 0;
            }
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Handles the hit event on the end boss.
     */
    hitEndboss() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Collects a bottle.
     * @returns {boolean} - True if the bottle is collected, false otherwise.
     */
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

    /**
        * Collects a coin.
        * @returns {boolean} - True if the coin is collected, false otherwise.
        */
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

    /**
     * Checks if the movable object is hurt.
     * @returns {boolean} - True if hurt, false otherwise.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 300;
        return timePassed < 0.7;
    }

    /**
     * Checks if the movable object is dead.
     * @returns {boolean} - True if dead, false otherwise.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
    * Applies damage to the movable object.
    * @returns {number} - The remaining energy after applying damage.
    */
    applyDamage() {
        this.energy -= 100;
        return this.energy;
    }

    /**
     * Applies damage to the movable object using a bottle.
     * @returns {number} - The remaining energy after applying damage.
     */
    applyDamageWithBottle() {
        this.energy -= 100;
        sounds.glass_sound.play();
        return this.energy;
    }

    /**
     * Triggers actions when a chicken is dead.
     */
    chickenDead() {
        if (this.energy >= 0) {
            sounds.jumpOnEnemy.play();
            this.playAnimation(this.IMAGES_DEAD);
        }
    }

    /**
     * Checks if the end boss is hurt.
     * @returns {boolean} - True if hurt, false otherwise.
     */
    endBossHurt() {
        return this.energy < 100;
    }

    /**
    * Applies damage to the movable object using a bottle and plays a sound.
    * @returns {number} - The remaining energy after applying damage.
    */
    applyDamageWithBottle() {
        this.energy -= 100;
        sounds.glass_sound.play();
        return this.energy;
    }

    /**
     * Triggers splash sound when a bottle is thrown at the end boss.
     */
    splashBottleEndboss() {
        if (this.energy >= 0 && this.energy <= 100) {
            sounds.glass_sound.play();
        }
    }

    /**
   * Plays animation for the movable object.
   * @param {string[]} images - Array of image paths for the animation.
   */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves the movable object to the right.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the movable object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Makes the movable object jump.
     */
    jump() {
        this.speedY = 30;
    }

    /**
    * Checks if the movable object is falling.
    * @returns {boolean} - True if falling, false otherwise.
    */
    isFalling() {
        return this.speedY < 0;
    }

    /**
     * Moves the movable object towards the character.
     */
    moveTowardsCharacter() {
        if (world.character.x <= this.x) {
            this.moveLeftAttack();
        } else {
            this.moveRightAttack();
        }
    }

    /**
     * Moves the movable object left for attack.
     */
    moveLeftAttack() {
        this.otherDirection = false;
        this.x -= 30;
    }

    /**
     * Moves the movable object right for attack.
     */
    moveRightAttack() {
        this.otherDirection = true;
        this.x += 30;
    }
}