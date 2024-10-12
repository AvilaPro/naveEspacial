// Crear la nave
nave = this.physics.add.sprite(400, 550, 'nave').setCollideWorldBounds(true);

// Crear grupos para enemigos y balas
enemigos = this.physics.add.group();
balas = this.physics.add.group();