/**
    * Collects a coin if the character has not reached the maximum number of coins.
    * Plays a sound when a coin is collected.
    * @returns {boolean} True if the coin is collected successfully, false if the maximum number of coins is reached.
*/class Character extends MovableObject {

    world;
    y = 190;
    height = 250;
    speed = 4;

    offset = {
        top: 100,
        right: 30,
        bottom: 10,
        left: 30
    };

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_FALLING = [
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ]

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    /**
     * Constructs a new Character object.
     */
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_FALLING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravity();
        this.animate();
        this.idleCount = 0;
    }

    /**
     * Initiates animation intervals.
     */
    animate() {
        setInterval(() => {
            sounds.walking_sound.pause();
            this.handleMovement();
            this.updateCamera();
        }, 1000 / 60);

        setInterval(() => {
            this.handleAnimations();
        }, 120);
    }

    /**
     * Handles character movement.
     */
    handleMovement() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            sounds.walking_sound.play();
        }
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            sounds.walking_sound.play();
            this.otherDirection = true;
        }
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            sounds.jumping_sound.play();
            this.idleCount = 0;
            sounds.sleep_sound.pause();
            this.jump();
        }
    }

    /**
   * Updates the game camera position based on character's position.
   */
    updateCamera() {
        this.world.camera_x = -this.x + 100;
    }

    /**
     * Handles character animations based on its state.
     */
    handleAnimations() {
        if (this.isDead()) {
            this.playDeadAnimation();
        } else if (this.isHurt()) {
            this.playHurtAnimation();
        } else if (this.isAboveGround()) {
            this.handleAboveGroundAnimations();
        } else {
            this.handleGroundAnimations();
        }
        this.resetLongIdleCount();
    }

    /**
     * Plays the animation for the character being dead.
     */
    playDeadAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
    }

    /**
    * Plays the animation for the character being hurt and plays a hurt sound.
    */
    playHurtAnimation() {
        this.playAnimation(this.IMAGES_HURT);
        sounds.hurt_sound.play();
    }

    /**
     * Handles animations when the character is above ground, such as jumping or falling.
     */
    handleAboveGroundAnimations() {
        if (this.speedY > 0) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else if (this.isFalling()) {
            if (this.speedY < 0) {
                this.playAnimation(this.IMAGES_FALLING);
            }
        }
    }

    /**
    * Handles animations when the character is on the ground, based on keyboard input.
    */
    handleGroundAnimations() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
            this.resetIdleCount();
        } else if (this.world.keyboard.D) {
            this.playAnimation(this.IMAGES_IDLE);
            this.resetIdleCount();
        } else {
            this.handleIdleAnimation();
        }
    }

    /**
     * Handles idle animation for the character when there is no keyboard input.
     */
    handleIdleAnimation() {
        if (!this.world.keyboard.SPACE && !this.world.keyboard.LEFT && !this.world.keyboard.RIGHT) {
            this.playAnimation(this.IMAGES_IDLE);
            this.idleCount++;
            if (this.idleCount >= 30) {
                this.playAnimation(this.IMAGES_LONG_IDLE);
                if (sounds.sleep_sound.paused) {
                    sounds.sleep_sound.play();
                }
            }
        }
    }

    /**
     * Resets the idle count and pauses the sleep sound.
     */
    resetIdleCount() {
        this.idleCount = 0;
        sounds.sleep_sound.pause();
    }

    /**
     * Resets the long idle count if the character starts moving.
     */
    resetLongIdleCount() {
        if (this.currentAnimation === this.IMAGES_LONG_IDLE &&
            (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)) {
            this.idleCount = 0;
        }
    }

    /**
    * Makes the character jump by setting its vertical speed.
    */
    jump() {
        this.speedY = 24;
    }

    /**
     * Collects a coin if the character has not reached the maximum number of coins.
     * Plays a sound when a coin is collected.
     * @returns {boolean} True if the coin is collected successfully, false if the maximum number of coins is reached.
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
}
