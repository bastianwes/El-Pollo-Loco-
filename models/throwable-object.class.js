class ThrowableObject extends MovableObject {
    height = 60;
    width = 50;

    IMAGES_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    throw_sound = new Audio('audio/throw.mp3');
    throwDirection;


    constructor(x, y, throwLeft) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.throwDirection = throwLeft;
        this.splashAnimationPlayed = false;
        this.throw();
        this.animate();
    }



    throw() {
        this.speedY = 20;
        this.applyGravity();
        this.throw_sound.play();
        if (!this.throwDirection) {
            this.rotationInterval = setInterval(() => {
                this.x += 4;
                this.playAnimation(this.IMAGES_ROTATION);
            }, 700 / 60);
        } else {
            this.rotationInterval = setInterval(() => {
                this.x -= 4;
                this.playAnimation(this.IMAGES_ROTATION);
            }, 700 / 60);
        }
    }

    splashBottle() {
        if (!this.splashAnimationPlayed) {
            this.splashAnimationPlayed = true;
            this.stopRotation();
            this.playSplashAnimation();
        }
    }

    playSplashAnimation() {
        this.playAnimation(this.IMAGES_SPLASH);
        setTimeout(() => {
            this.img.src = 'img/2_character_pepe/5_dead/D-57.png';
        }, 1000);
    }

    stopRotation() {
        clearInterval(this.rotationInterval);
    }

    animate() {
        setInterval(() => {
            if (!this.splashAnimationPlayed) {
                if (this.isDead()) {
                    this.playSplashAnimation();
                }
            }
        }, 200);
    }

}


