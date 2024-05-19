class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;


    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = 700; // Zahl zwischen 0 und 500
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

    }




}