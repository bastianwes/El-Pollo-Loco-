let chickenPositions = []; // Array zum Speichern der X-Positionen der Hühner
const MIN_DISTANCE = 100; // Mindestabstand zwischen den Hühnern

class Chicken extends MovableObject {

    height = 55;
    width = 70;
    y = 360;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = this.generatePosition(); // Generiere eine Position mit Abstand
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }

    generatePosition() {
        let position;
        let validPosition = false;

        while (!validPosition) {
            position = 200 + Math.random() * 500; // Zahl zwischen 200 und 700
            validPosition = chickenPositions.every(pos => Math.abs(pos - position) >= MIN_DISTANCE);
        }

        chickenPositions.push(position);
        return position;
    }

    animate() {
        setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (!this.isDead()) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }

}



