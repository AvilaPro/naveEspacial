let anchoScreen = screen.availWidth * 0.98;
let altoScreen = screen.availHeight * 0.8;
let btnLeft = document.getElementById('btnLeft');
let btnRight = document.getElementById('btnRight');


const config = {
  type: Phaser.AUTO,
  width: anchoScreen,
  height: altoScreen,
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

const game = new Phaser.Game(config);
let nave, cursors, poderes, enemigos, vidasText, nroDestruccionesText, poderActivo = false;
let vidas = 3;
let nroDestrucciones = 0;

function preload() {
  this.load.image('fondo', '../img/fondo.jpg');
  this.load.image('nave', '../img/naveSF.png');
  this.load.image('poder', '../img/poderSF.png');
  this.load.image('enemigo', '../img/enemigoSF.png');
}

function create() {
  //cargar la imagen de fondo
  this.add.image(400, 300, 'fondo');

  // Crear la nave
  nave = this.physics.add.sprite(400, 550, 'nave').setCollideWorldBounds(true);

  // Crear grupos para poderes y enemigos
  poderes = this.physics.add.group();
  enemigos = this.physics.add.group();

  // Teclado
  cursors = this.input.keyboard.createCursorKeys();

  // Añadir colisiones
  this.physics.add.overlap(nave, poderes, recogerPoder, null, this);
  this.physics.add.overlap(nave, enemigos, chocarEnemigo, null, this);

  // Texto de vidas
  vidasText = this.add.text(10, 10, 'Vidas: 3', { fontSize: '20px', fill: '#fff' });

  nroDestruccionesText = this.add.text(10, 30, 'Destrucciones: 0', { fontSize: '20px', fill: 'yellow' });

  // Generar objetos cada cierto tiempo
  this.time.addEvent({
    delay: 1000,
    callback: generarObjetos,
    callbackScope: this,
    loop: true
  });
}

function update() {
  btnLeft.addEventListener('click', () => {
    nave.setVelocityX(-300);
  });
  btnRight.addEventListener('click', () => {
    nave.setVelocityX(300);
  })
  // Movimiento de la nave
  nave.setVelocity(0);
  if (cursors.left.isDown) {
    nave.setVelocityX(-300);
  } else if (cursors.right.isDown) {
    nave.setVelocityX(300);
  }

  // Si hay poder activo, se puede destruir enemigos
  if (poderActivo) {
    this.physics.world.overlap(nave, enemigos, destruirEnemigo, null, this);
  }
}

function generarObjetos() {
  const x = Phaser.Math.Between(50, 750);
  const objetoEsPoder = Phaser.Math.Between(0, 1);

  if (objetoEsPoder) {
    // Crear un poder
    const poder = poderes.create(x, 0, 'poder');
    poder.setVelocityY(200);
  } else {
    // Crear un enemigo
    const enemigo = enemigos.create(x, 0, 'enemigo');
    enemigo.setVelocityY(150);
  }
}

function recogerPoder(nave, poder) {
  poder.destroy();
  poderActivo = true;

  // Duración del poder
  this.time.addEvent({
    delay: 5000,
    callback: () => {
      poderActivo = false;
    },
    callbackScope: this
  });
}

function chocarEnemigo(nave, enemigo) {
  if (!poderActivo) {
    enemigo.destroy();
    perderVida();
  }
}

function destruirEnemigo(nave, enemigo) {
  enemigo.destroy();
  nroDestrucciones += 1;
  nroDestruccionesText.setText('Destrucciones: ' + nroDestrucciones);
}

function perderVida() {
  vidas -= 1;
  vidasText.setText('Vidas: ' + vidas);

  if (vidas === 0) {
    // vidasText.setText('¡Juego Terminado!');
    this.add.text(100, 100, 'Game Over!', { fontSize: '40px', fill: 'orange' });
    this.physics.pause();
  }
}