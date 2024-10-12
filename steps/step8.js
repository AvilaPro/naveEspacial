// Añadir colisiones
this.physics.add.overlap(nave, enemigos, chocarEnemigo, null, this);
this.physics.add.overlap(balas, enemigos, destruirEnemigoConBala, null, this);