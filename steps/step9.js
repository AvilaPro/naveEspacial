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


//Agregar el metodo perderVida que es invocado dentro del metodo chocarEnemigo
function perderVida() {
    vidas -= 1;
    vidasText.setText('Vidas: ' + vidas);

    if (vidas === 0) {
        document.getElementById('gameOver').style.display = 'block';
        this.physics.pause();
    }
}