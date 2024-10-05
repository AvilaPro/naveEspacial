//ajustes para el tamano de la pantalla
let anchoScreen = screen.availWidth * 0.98;
let altoScreen = screen.availHeight * 0.8;

//botones en la pantalla para moviles
let btnLeft = document.getElementById('btnLeft');
let btnRight = document.getElementById('btnRight');

//configuracion del escenario
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

//creamos la instancia del juego
const game = new Phaser.Game(config);

//variables del juego
let nave, cursors, enemigos, balas, vidasText, nroDestruccionesText;
let vidas = 3;
let nroDestrucciones = 0;

//metodo para precargar recursos
function preload() {
  this.load.image('fondo', 'https://github.com/AvilaPro/naveEspacial/blob/master/img/fondo.jpg');
  this.load.image('nave', '../img/naveSF.png');
  this.load.image('enemigo', '../img/enemigoSF.png');
  this.load.image('bala', '../img/balaSF.png'); // Cargar imagen de la bala
}

//metodo creador de objetos y configuraciones adicionales necesarias
function create() {
  //cargar la imagen de fondo
  this.add.image(400, 300, 'fondo');

  // Crear la nave
  nave = this.physics.add.sprite(400, 550, 'nave').setCollideWorldBounds(true);

  // Crear grupos para enemigos y balas
  enemigos = this.physics.add.group();
  balas = this.physics.add.group();

  // Teclado
  cursors = this.input.keyboard.createCursorKeys();

  // Añadir colisiones
  this.physics.add.overlap(nave, enemigos, chocarEnemigo, null, this);
  this.physics.add.overlap(balas, enemigos, destruirEnemigoConBala, null, this);

  // Texto de vidas
  vidasText = this.add.text(10, 10, 'Vidas: 3', { fontSize: '20px', fill: '#fff' });

  nroDestruccionesText = this.add.text(10, 30, 'Destrucciones: 0', { fontSize: '20px', fill: 'yellow' });

  // Generar enemigos cada cierto tiempo
  this.time.addEvent({
    delay: 1000,
    callback: generarEnemigos,
    callbackScope: this,
    loop: true
  });

  // Disparar al hacer clic en pantalla
  this.input.on('pointerdown', dispararBala);

}

//metodo que actualiza ante eventos
function update() {
  //mover la nave con los botones en pantalla
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

}

/**
 * Metodos como collbacks ante eventos
 */
function dispararBala() {
  console.log('bala disparada');
  
    var bala = balas.create(nave.x, nave.y - 20, 'bala'); // Crear la bala en la posición de la nave
    bala.setVelocityY(-400); // Velocidad de la bala hacia arriba
    // ultimaBala = time; // Actualizar el tiempo de la última bala disparada
  
}

function generarEnemigos() {
  const x = Phaser.Math.Between(50, 750);
  // Crear un enemigo
  const enemigo = enemigos.create(x, 0, 'enemigo');
  enemigo.setVelocityY(150);
}

function chocarEnemigo(nave, enemigo) {
  enemigo.destroy();
  perderVida();
}

function destruirEnemigoConBala(bala, enemigo) {
  bala.destroy();
  enemigo.destroy();
  nroDestrucciones += 1;
  nroDestruccionesText.setText('Destrucciones: ' + nroDestrucciones);
}

function perderVida() {
  vidas -= 1;
  vidasText.setText('Vidas: ' + vidas);

  if (vidas === 0) {
    document.getElementById('gameOver').style.display = 'block';
    this.physics.pause();
  }
}
