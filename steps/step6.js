// Generar enemigos cada cierto tiempo
this.time.addEvent({
    delay: 1000,
    callback: generarEnemigos,
    callbackScope: this,
    loop: true
});