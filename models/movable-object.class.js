/**
 * Represents a movable object that extends a drawable object.
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {

    speed = 0.20;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    numberOfBottles = 0;
    numberOfCoins = 0;
    lastHit = 0;

    /**
    * Applies gravity to the object's vertical movement.
    */
    applyGravity() {
        this.gravityInterval = setInterval(() => {
            if (!this.splashAnimationPlayed && (this.isAboveGround() || this.speedY > 0)) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;

                // Überprüfen, ob der Charakter den Boden erreicht hat
                if (!this.isAboveGround() && this.speedY <= 0) {
                    // Setze die Y-Position des Charakters auf die Bodenhöhe
                    this.y = 190;
                    // Stoppe die vertikale Bewegung des Charakters
                    this.speedY = 0;
                }
            }
        }, 1000 / 20);
    }


    /**
     * Checks if the object is above the ground.
     * @returns {boolean} True if the object is above the ground, false otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 190;
        }
    }

    /**
     * Checks if the object is colliding with another movable object.
     * @param {MovableObject} mo - The other movable object to check collision with.
     * @returns {boolean} True if collision occurs, false otherwise.
     */
    isColliding(mo) {
        const rect = this.getCollisionRectangle();
        return rect.x + rect.width > mo.x &&
            rect.y + rect.height > mo.y &&
            rect.x < mo.x + mo.width &&
            rect.y < mo.y + mo.height;
    }

    /**
     * Gets the collision rectangle based on the type of object.
     * @returns {Object} The collision rectangle.
     */
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

    /**
     * Checks if the object is a character.
     * @returns {boolean} True if the object is a character, false otherwise.
     */
    isCharacter() {
        return this instanceof Character;
    }

    /**
     * Checks if the object is a coin.
     * @returns {boolean} True if the object is a coin, false otherwise.
     */
    isCoin() {
        return this instanceof Coin;
    }

    /**
     * Checks if the object is a chicken.
     * @returns {boolean} True if the object is a chicken, false otherwise.
     */
    isChicken() {
        return this instanceof Chicken || this instanceof SmallChicken;
    }

    /**
     * Checks if the object is an end boss.
     * @returns {boolean} True if the object is an end boss, false otherwise.
     */
    isEndboss() {
        return this instanceof Endboss;
    }

    /**
     * Gets the collision rectangle for the character.
     * @returns {Object} The collision rectangle for the character.
     */
    getCharacterCollisionRect() {
        return {
            x: this.x + 35,
            y: this.y + 130,
            width: this.width - 60,
            height: this.offset_height
        };
    }

    /**
     * Gets the collision rectangle for the coin.
     * @returns {Object} The collision rectangle for the coin.
     */
    getCoinCollisionRect() {
        return {
            x: this.offsetX,
            y: this.offsetY,
            width: this.offset_width,
            height: this.offset_height
        };
    }

    /**
     * Gets the collision rectangle for the chicken.
     * @returns {Object} The collision rectangle for the chicken.
     */
    getChickenCollisionRect() {
        return {
            x: this.x + 10,
            y: this.y + 5,
            width: this.width - 15,
            height: this.height + 30
        };
    }

    /**
     * Gets the collision rectangle for the end boss.
     * @returns {Object} The collision rectangle for the end boss.
     */
    getEndbossCollisionRect() {
        return {
            x: this.x + 40,
            y: this.y + 50,
            width: this.width,
            height: this.height
        };
    }

    /**
     * Gets the default collision rectangle.
     * @returns {Object} The default collision rectangle.
     */
    getDefaultCollisionRect() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }

    /**
     * Decreases the energy level of the object when hit.
     */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
    * Decreases the energy level of the end boss when hit.
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
     * Collects a bottle and plays a sound if collected successfully.
     * @returns {boolean} True if bottle is collected, false if maximum bottles already collected.
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
     * Checks if the object is currently hurt.
     * @returns {boolean} True if the object is hurt, false otherwise.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 300;
        return timepassed < 1;
    }

    /**
 * Checks if the object is dead.
 * @returns {boolean} True if the object's energy is zero, false otherwise.
 */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Applies damage to the object.
     * @returns {number} The updated energy level after applying damage.
     */
    applyDamage() {
        this.energy -= 100;
        return this.energy;
    }

    /**
     * Applies damage to the object with a bottle.
     * Plays a sound when damaged.
     * @returns {number} The updated energy level after applying damage.
     */
    applyDamageWithBottle() {
        this.energy -= 100;
        sounds.glass_sound.play();
        return this.energy;
    }

    /**
     * Handles actions when a chicken dies.
     * Plays a sound and initiates a dead animation if the energy is greater than or equal to zero.
     */
    chickenDead() {
        if (this.energy >= 0) {
            sounds.jumpOnEnemy.play();
            this.playAnimation(this.IMAGES_DEAD);
        }
    }

    /**
     * Checks if the end boss is hurt.
     * @returns {boolean} True if the end boss's energy is less than 100, false otherwise.
     */
    endBossHurt() {
        return this.energy < 100;
    }

    /**
     * Applies damage to the end boss with a bottle.
     * Plays a sound when damaged.
     * @returns {number} The updated energy level after applying damage.
     */
    applyDamageWithBottle() {
        this.energy -= 100;
        sounds.glass_sound.play();
        return this.energy;
    }

    /**
     * Plays a splash sound if the end boss's energy is between 0 and 100.
     */
    splashBottleEndboss() {
        if (this.energy >= 0 && this.energy <= 100) {
            sounds.glass_sound.play();
        }
    }

    /**
     * Plays an animation with the provided images.
     * Updates the current image index.
     * @param {Array} images - Array of image paths for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves the object to the right based on its speed.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left based on its speed.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Initiates a jump action by setting the vertical speed.
     */
    jump() {
        this.speedY = 30;
    }

    /**
     * Checks if the object is falling (its vertical speed is negative).
     * @returns {boolean} True if the object is falling, false otherwise.
     */
    isFalling() {
        return this.speedY < 0;
    }

    /**
     * Moves the object towards the character's position.
     * If the character's position is to the left, moves left; otherwise, moves right.
     */
    moveTowardsCharacter() {
        if (world.character.x <= this.x) {
            this.moveLeftAttack();
        } else {
            this.moveRightAttack();
        }
    }

    /**
     * Moves the object to the left for an attack action.
     * Sets the direction flag to false.
     */
    moveLeftAttack() {
        this.otherDirection = false;
        this.x -= 30;
    }

    /**
     * Moves the object to the right for an attack action.
     * Sets the direction flag to true.
     */
    moveRightAttack() {
        this.otherDirection = true;
        this.x += 30;
    }
}