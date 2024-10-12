function generarEnemigos() {
    const x = Phaser.Math.Between(50, 750);
    // Crear un enemigo
    const enemigo = enemigos.create(x, 0, 'enemigo');
    enemigo.setVelocityY(150);
}