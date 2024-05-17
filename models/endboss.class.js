
class Endboss extends MovableObject {

    height = 400;
    width = 250;
    y = 55;

    IMAGES_ALERT = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    constructor(character) {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 500;
        this.character = character;
        this.speed = 0.5;
        this.deadAnimationPlayed = false;
        this.animate();
    }

    // animate() {
    //     setInterval(() => {
    //         if (!this.deadAnimationPlayed) {
    //             if (this.isDead()) {
    //                 this.playDeadAnimation();
    //             } else if (this.isHurt()) {
    //                 this.playAnimation(this.IMAGES_HURT);
    //             } else if (this.endBossHurt()) {
    //                 this.playAnimation(this.IMAGES_ATTACK);
    //                 this.moveTowardsCharacter();//HIER SOLLTE DER ENDBOSS ERKENNEN OB CHARACTER SICH RECHTS ODER LINKS BEFINDET?
    //             } else {
    //                 this.playAnimation(this.IMAGES_ALERT);
    //             }
    //         }
    //     }, 200);

    // }

    animate() {
        setInterval(() => {
            if (!this.deadAnimationPlayed) {
                console.log("Endboss X Coordinate: ", this.x);
                console.log("Character X Coordinate: ", this.character.x);
            }
        }, 200);
    }

    playDeadAnimation() {
        this.deadAnimationPlayed = true;
        let lastDeadImage = this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1];
        this.playAnimation([lastDeadImage], true);
    }

    moveTowardsCharacter() {
        if (this.character.x < this.x) {
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





