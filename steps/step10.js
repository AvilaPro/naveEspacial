// Disparar al hacer clic en pantalla
this.input.on('pointerdown', dispararBala);


function dispararBala() {
    console.log('bala disparada');

    var bala = balas.create(nave.x, nave.y - 20, 'bala'); // Crear la bala en la posición de la nave
    bala.setVelocityY(-400); // Velocidad de la bala hacia arriba
}