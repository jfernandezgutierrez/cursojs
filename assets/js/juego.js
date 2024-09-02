let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];
let puntosJugador = 0;
let puntosComputadora = 0;
const btnPedir = document.getElementById('btnPedir');
const btnDetener = document.getElementById('btnDetener');
const btnNuevo = document.getElementById('btnNuevo');
const puntosHTML = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas')
const divCartasComputadora = document.querySelector('#computadora-cartas')

const crearDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo)
        }
    }
    for (let tipo of tipos) {
        for (let esp of especiales) {
            deck.push(esp + tipo)
        }
    }
    
    deck = _.shuffle(deck);
    console.log(deck);
    return deck
}
const pedirCarta = () => {
    if (deck.length === 0) {
        throw 'No hay cartas en el deck';
    }
    const cartta = deck.pop()
    return cartta
}
const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ?
        (valor === 'A') ? 11 : 10
        : valor * 1;



}

btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta)
    console.log(puntosJugador);
    puntosHTML[0].innerText = puntosJugador;
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta')
    divCartasJugador.append(imgCarta)

    if (puntosJugador > 21) {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }
});
const turnoComputadora = (puntosMinimos) => {
    do {
        const carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta)
        console.log(puntosComputadora);
        puntosHTML[1].innerText = puntosComputadora;
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta')
        divCartasComputadora.append(imgCarta)
        if (puntosMinimos > 21) {
            break;
        }
    } while ((puntosComputadora <= puntosMinimos) && (puntosMinimos <= 21));
    setTimeout(() => {
        if (puntosComputadora === puntosMinimos) {
            alert('Nadie gana');
        } else if (puntosMinimos > 21) {
            alert('Computadora gana')
        } else if (puntosComputadora > 21) {
            alert('Jugador gana')
        } else {
            alert('Computadora gana')
        }
    }, 10);

}
btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    turnoComputadora(puntosJugador);
    btnDetener.disabled = true;
})
btnNuevo.addEventListener('click', () => {
    let imagenes = document.querySelectorAll('img')
    imagenes.forEach(imagen => imagen.remove());
    puntosHTML[0].innerText = 0
    puntosHTML[1].innerText = 0
    puntosJugador = 0;
    puntosComputadora = 0;
   deck =[]
    crearDeck();
    btnPedir.disabled = false;
    btnDetener.disabled = false;
})
crearDeck();
pedirCarta();
console.log(valorCarta('10D'));