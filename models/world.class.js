class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarHealth = new StatusBarHealth();
    statusBarCoin = new StatusBarCoin();
    statusBarBottle = new StatusBarBottle();
    statusBarEndboss = new StatusBarEndboss();
    throwableObjects = [];
    throwBottle = false;
    statusBarEndbossShown = false;
    endboss;
    gameOverImage = new DrawableObject().loadSingleImage('img/9_intro_outro_screens/game_over/game over!.png');
    wonTheGameImage = new DrawableObject().loadSingleImage('img/9_intro_outro_screens/win/win_1.png');
    gameOverFlag = false;
    wonTheGameFlag = false;
    lostSoundPlayed = false;
    winSoundPlayed = false;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.endboss = new Endboss(this.character);
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkCollisionWithEndboss()
            this.checkCollisionsWithBottles();
            this.checkCollisionsWithCoins();
            this.checkThrowObjects();
            this.checkHitEnemy();
            this.checkHitEndboss();
            this.gameOver();
            this.wonTheGame();
        }, 200);
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy)) {
                if (!this.character.isFalling() || !this.character.isAboveGround()) {
                    this.character.hit();
                    this.statusBarHealth.setPercentage(this.character.energy);
                } else {
                    this.character.jump();
                    enemy.applyDamage();
                    enemy.chickenDead(index);
                    setTimeout(() => {
                        if (this.level.enemies.includes(enemy)) {
                            this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
                        }
                    }, 700);
                }
            }
        });
    }

    checkCollisionWithEndboss() {
        this.level.endboss.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (!this.character.isFalling() || !this.character.isAboveGround()) {
                    this.character.hit();
                    this.statusBarHealth.setPercentage(this.character.energy);
                }
            }
        });
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.character.numberOfBottles > 0 && !this.throwBottle) {
            this.throwBottle = true;
            setTimeout(() => {
                this.throwBottle = false;
            }, 2000);
            let throwDirection = this.character.otherDirection;
            let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 10, throwDirection);
            this.throwableObjects.push(bottle);
            this.character.numberOfBottles--;
            this.statusBarBottle.reducePercentage();
        }
    }

    checkHitEnemy() {
        this.throwableObjects.forEach((bottle) => {
            if (!bottle.hasHit) {
                this.level.enemies.forEach((enemy, index) => {
                    if (bottle.isColliding(enemy)) {
                        enemy.applyDamageWithBottle();
                        bottle.splashBottle();
                        bottle.hasHit = true;
                        this.level.enemies.splice(index, 1);
                    }
                });
            }
        });
    }

    checkHitEndboss() {
        this.throwableObjects.forEach((bottle) => {
            if (!bottle.hasHit) {
                this.level.endboss.forEach((endboss) => {
                    if (bottle.isColliding(endboss)) {
                        endboss.splashBottleEndboss();
                        endboss.hitEndboss();
                        bottle.splashBottle();
                        this.statusBarEndboss.setPercentage(endboss.energy);
                        bottle.hasHit = true;
                    }
                });
            }
        });
    }

    checkCollisionsWithBottles() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                if (this.character.collectBottle()) {
                    this.level.bottles.splice(index, 1);
                    this.statusBarBottle.updatePercentage(this.character.numberOfBottles * 20);
                }
            }
        });
    }

    checkCollisionsWithCoins() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(index, 1);
                if (this.character.collectCoin()) {
                    this.statusBarCoin.updatePercentage(this.character.numberOfCoins * 10);
                }
            }
        });
    }

    draw() {
        this.clearCanvas();
        if (this.handleGameOver()) return;
        if (this.handleGameWon()) return;
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0);
        this.addFixedObjects();
        this.ctx.translate(this.camera_x, 0);
        this.addDynamicObjects();
        this.ctx.translate(-this.camera_x, 0);
        requestAnimationFrame(() => this.draw());
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    handleGameOver() {
        if (this.gameOverFlag) {
            this.clearCanvas();
            this.ctx.drawImage(this.gameOverImage, 0, 0, this.canvas.width, this.canvas.height);
            return true;
        }
        return false;
    }

    handleGameWon() {
        if (this.wonTheGameFlag) {
            this.clearCanvas();
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            const newWidth = this.wonTheGameImage.width * 0.4;
            const newHeight = this.wonTheGameImage.height * 0.4;
            const centerX = this.canvas.width / 2 - newWidth / 2;
            const centerY = this.canvas.height / 2 - newHeight / 2;
            this.ctx.drawImage(this.wonTheGameImage, centerX, centerY, newWidth, newHeight);
            return true;
        }
        return false;
    }

    addFixedObjects() {
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        if (this.character.x >= 1950 || this.statusBarEndbossShown) {
            this.addToMap(this.statusBarEndboss);
            this.statusBarEndbossShown = true;
        }
    }

    addDynamicObjects() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObjects);
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    gameOver() {
        if (this.character.isDead() && !this.lostSoundPlayed) {
            this.lostSoundPlayed = true;
            setTimeout(() => {
                this.gameOverFlag = true;
                this.playSoundOnly('lost_sound');
                playAgain();
            }, 700);
        }
    }

    wonTheGame() {
        let endboss = this.level.endboss[0];
        if (endboss.isDead() && !this.winSoundPlayed) {
            this.winSoundPlayed = true;
            setTimeout(() => {
                this.wonTheGameFlag = true;
                this.playSoundOnly('win_sound');
                playAgain();
            }, 700);
        }
    }

    playSoundOnly(soundName) {
        for (let key in sounds) {
            if (sounds.hasOwnProperty(key) && key !== soundName) {
                sounds[key].mutedVolume = sounds[key].volume;
                sounds[key].volume = 0;
            }
        }
        sounds[soundName].play();
    }

    playWinSoundOnly() {
        this.playSoundOnly('win_sound');
    }

    playLostSoundOnly() {
        this.playSoundOnly('lost_sound');
    }

    restoreSoundVolumes() {
        for (let key in sounds) {
            if (sounds.hasOwnProperty(key) && sounds[key].mutedVolume !== undefined) {
                sounds[key].volume = sounds[key].mutedVolume;
            }
        }
    }
}