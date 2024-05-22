/**
 * Represents a status bar for bottles.
 * @extends DrawableObject
 */
class StatusBarBottle extends DrawableObject {

    percentage = 0;

    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ];

    /**
     * Constructs a new StatusBarBottle object.
     * Loads initial images, sets initial position and size, and sets initial percentage.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 40;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(this.percentage);
    }

    /**
     * Sets the percentage of the status bar and updates its appearance.
     * @param {number} percentage - The new percentage value to set.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Updates the percentage of the status bar with a new value.
     * @param {number} newPercentage - The new percentage value to update.
     */
    updatePercentage(newPercentage) {
        this.setPercentage(newPercentage);
    }

    /**
     * Reduces the percentage of the status bar by 20%.
     * If the percentage becomes negative, it remains at 0.
     */
    reducePercentage() {
        if (this.percentage > 0) {
            this.percentage -= 20;
            this.setPercentage(this.percentage);
        }
    }

    /**
     * Resolves the image index based on the current percentage.
     * @returns {number} The index of the image corresponding to the current percentage.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}


