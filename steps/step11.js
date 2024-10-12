// Movimiento de la nave
nave.setVelocity(0);
if (cursors.left.isDown) {
    nave.setVelocityX(-300);
} else if (cursors.right.isDown) {
    nave.setVelocityX(300);
}