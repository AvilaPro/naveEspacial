var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload() {
}

function create() {
}

function update() {
}



//ajustes para el tamano de la pantalla
let anchoScreen = screen.availWidth * 0.98;
let altoScreen = screen.availHeight * 0.8;


