const miModulo =(() => {
    'use strict'

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'];
    let puntosJugadores = [];
    const btnPedir = document.getElementById('btnPedir'),
        btnDetener = document.getElementById('btnDetener'),
        btnNuevo = document.getElementById('btnNuevo'),
        puntosHTML = document.querySelectorAll('small'),
        divCartasJugadores = document.querySelectorAll('.divCartas')
    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();
        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }
         
        puntosHTML.forEach( elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = '');
           btnPedir.disabled = false;
           btnDetener.disabled = false;
    }

    const crearDeck = () => {
        debugger
        deck = [];
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


        return _.shuffle(deck);
    }

    const pedirCarta = () => {

        return (deck.length === 0) ? (() => { throw 'No hay cartas en el deck'; })() : deck.pop();
    }
    const valorCarta = (carta) => {
        debugger
        const valor = carta.substring(0, carta.length - 1);
        console.log((isNaN(valor)) ?
            (valor === 'A' ? 11 : 10)
            : valor * 1);

        return (isNaN(valor)) ?
            (valor === 'A' ? 11 : 10)
            : valor * 1;



    }

    
    const acumularPuntos = (carta, turno) => {
        debugger
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta)

        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno]
    };
    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta')
        divCartasJugadores[turno].append(imgCarta)
    }
    const determionarGanador = () =>{
        const [puntosMinimos , puntosComputadora] = puntosJugadores;
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
        }, 30);

    };
    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora = 0;
        do {
            const carta = pedirCarta();
            let puntos = puntosJugadores.length - 1;
            puntosComputadora = acumularPuntos(carta, puntos);
            crearCarta(carta, puntos);
            
        } while ((puntosComputadora <= puntosMinimos) && (puntosMinimos <= 21));
        determionarGanador();
    }
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);
        crearCarta(carta, 0)

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
    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        turnoComputadora(puntosJugadores[0]);
        btnDetener.disabled = true;
    });
    btnNuevo.addEventListener('click', () => {
        inicializarJuego();
       
    });
    
    return {
       nuevoJuego: inicializarJuego 
    };
})();
