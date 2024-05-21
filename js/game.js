let canvas;
let world;
let keyboard = new Keyboard();
let defaultVolume = 0.6;
let sounds = {
    jumpOnEnemy: new Audio('audio/jumpOnEnemy.mp3'),
    bottle_sound: new Audio('audio/bottle.mp3'),
    glass_sound: new Audio('audio/glass.mp3'),
    coin_sound: new Audio('audio/coin.mp3'),
    hurt_sound: new Audio('audio/hurt.mp3'),
    walking_sound: new Audio('audio/running.mp3'),
    jumping_sound: new Audio('audio/jump.mp3'),
    sleep_sound: new Audio('audio/sleep.mp3'),
    lost_sound: new Audio('audio/lost.mp3'),
    win_sound: new Audio('audio/win.mp3'),
    angry_sound: new Audio('audio/angry-chicken.mp3'),
    throw_sound: new Audio('audio/throw.mp3'),
    game_sound: new Audio('audio/game.mp3')
};

function muteAllSounds() {
    for (let key in sounds) {
        if (sounds.hasOwnProperty(key)) {
            sounds[key].volume = 0;
        }
    }
}

function unmuteAllSounds() {
    for (let key in sounds) {
        if (sounds.hasOwnProperty(key)) {
            sounds[key].volume = 0.6;
        }
    }
}

function toggleSound() {
    let soundButton = document.getElementById('sound');
    let muteSoundButton = document.getElementById('mute-sound');

    if (soundButton.style.display === 'none') {
        soundButton.style.display = 'inline-block';
        muteSoundButton.style.display = 'none';
        unmuteAllSounds();
    } else {
        soundButton.style.display = 'none';
        muteSoundButton.style.display = 'inline-block';
        muteAllSounds();
    }
}

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    sounds.game_sound.play();
    sounds.game_sound.volume = 0.3;
    sounds.game_sound.loop = true;
}

function bindBtsTouchEvents() {
    document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });

    document.getElementById('btnLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });

    document.getElementById('btnRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });

    document.getElementById('btnRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    document.getElementById('btnJump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });

    document.getElementById('btnJump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });

    document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });

    document.getElementById('btnThrow').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
}

window.addEventListener("keydown", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 38) {
        keyboard.UP = true;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (e.keyCode == 68) {
        keyboard.D = true;
    }
});

window.addEventListener("keyup", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 38) {
        keyboard.UP = false;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (e.keyCode == 68) {
        keyboard.D = false;
    }
});

function startGame() {
    let startScreen = document.getElementById('navContainer');
    let canvas = document.getElementById('canvas-container');

    canvas.style.display = 'flex';
    startScreen.style.display = 'none';

    initLevel();
    init();
    bindBtsTouchEvents();
}

function setFullscreen() {
    let gameContainer = document.getElementById('game-screen');

    if (!document.fullscreenElement) {
        gameContainer.requestFullscreen().catch(err => {
            alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else {
        document.exitFullscreen();
    }
}