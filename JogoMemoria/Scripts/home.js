var memoryGame =
{
    divJogo: document.getElementById('areaJogo'),
    primeiraCarta: '',
    segundaCarta: '',
    qtdCartasSelecionadas: 0,
    qtdTentativas: 0,
    nomeJogador: '',
    delay: 500,
    grid: '',
    urlFinalizarJogo: '',
    numeroTotalCartas: 12,
    numeroAcertos: 0,
    inicioJogo: '',
    fimJogo: '',
    listaCartas: [
        {
            'nome': 'fruta1',
            'url': 'img/fruta1.jpg'
        },
        {
            'nome': 'fruta2',
            'url': 'img/fruta2.jpg'
        },
        {
            'nome': 'fruta3',
            'url': 'img/fruta3.jpg'
        },
        {
            'nome': 'fruta4',
            'url': 'img/fruta4.jpg'
        },
        {
            'nome': 'fruta5',
            'url': 'img/fruta5.jpg'
        },
        {
            'nome': 'fruta6',
            'url': 'img/fruta6.jpg'
        },
        {
            'nome': 'fruta7',
            'url': 'img/fruta7.jpg'
        },
        {
            'nome': 'fruta8',
            'url': 'img/fruta8.jpg'
        },
        {
            'nome': 'fruta9',
            'url': 'img/fruta9.jpg'
        },
        {
            'nome': 'fruta10',
            'url': 'img/fruta10.jpg'
        },
        {
            'nome': 'fruta11',
            'url': 'img/fruta11.jpg'
        },
        {
            'nome': 'fruta12',
            'url': 'img/fruta12.jpg'
        }
    ],


    init: function () {

        if (memoryGame.validarJogador()) {
            memoryGame.inicializarGrid();
        }
    },

    eventoSelecionarCarta: function (evento) {

        var carta = $(evento.target.parentElement);

        if (!carta.hasClass('carta') || carta.hasClass('cartaSelecionada') || carta.hasClass('match')) {
            return;
        }

        if (memoryGame.qtdCartasSelecionadas < 2) {
            memoryGame.setarTentativas();
            memoryGame.qtdCartasSelecionadas++;
            if (memoryGame.qtdCartasSelecionadas === 1) {
                memoryGame.primeiraCarta = carta.data('nome');
                carta.addClass('cartaSelecionada');
            } else {
                memoryGame.segundaCarta = carta.data('nome');
                carta.addClass('cartaSelecionada');
            }

            if (memoryGame.primeiraCarta && memoryGame.segundaCarta) {
                if (memoryGame.primeiraCarta === memoryGame.segundaCarta) {
                    setTimeout(memoryGame.realizarMatch(), memoryGame.delay);
                }
                setTimeout(memoryGame.limparSelecao, memoryGame.delay);
            }

        }
    },

    finalizarTentativa: function () {

        memoryGame.fimJogo = new Date().toLocaleString();
        var parametros = { nomeJogador: memoryGame.nomeJogador, tentativas: memoryGame.qtdTentativas, venceu: memoryGame.numeroTotalCartas == memoryGame.numeroAcertos, inicio: memoryGame.inicioJogo, fim: memoryGame.fimJogo };

        $.ajax({
            type: 'GET',
            url: memoryGame.urlFinalizarJogo,
            data: parametros,
            cache: false
        });
    },
    
    inicializarGrid: function () {

        var cartasGrid = memoryGame.listaCartas.concat(memoryGame.listaCartas).sort();//function () {
        //return 0.5- Math.random();
        //});

        memoryGame.grid = $('<div></div>').addClass('grid');
        memoryGame.grid.click(memoryGame.eventoSelecionarCarta);
        $('#areaJogo').append(memoryGame.grid);

        memoryGame.montarCartas(cartasGrid);
        memoryGame.resetarVariaveis();
    },

    limparSelecao: function LimparSelecao() {

        memoryGame.primeiraCarta = '';
        memoryGame.segundaCarta = '';
        memoryGame.qtdCartasSelecionadas = 0;

        $('div').find('.cartaSelecionada').each(function () {
            $(this).removeClass('cartaSelecionada')
        });
    },

    montarCartas: function (cartasGrid) {

        cartasGrid.forEach(function (item) {
            var nome_carta = item.nome;
            var url_carta = item.url;

            var carta = $('<div></div>').addClass('carta').data('nome', nome_carta);
            var frente = $('<div></div>').addClass('frente');
            var verso = $('<div></div>').addClass('verso').css('background-image', 'url("' + url_carta + '")');

            memoryGame.grid.append(carta);
            carta.append(frente);
            carta.append(verso);
        });
    },

    realizarMatch: function () {

        memoryGame.numeroAcertos++;

        $('div').find('.cartaSelecionada').each(function () {
            $(this).addClass('match')
        });

        if (memoryGame.numeroAcertos == memoryGame.numeroTotalCartas) {

            memoryGame.finalizarTentativa;
            alert('Parabens, voce venceu!');
        }
    },

    reiniciarJogo: function () {
        memoryGame.finalizarTentativa();
        memoryGame.grid.remove();
        memoryGame.inicializarGrid();
    },

    resetarVariaveis: function () {
        memoryGame.qtdTentativas = 0;
        memoryGame.numeroAcertos = 0;
        memoryGame.inicioJogo = new Date().toLocaleString();
        memoryGame.fimJogo = '';
        $('#lblNomeJogador').html(memoryGame.nomeJogador);
        $('#lblTentativas').html(memoryGame.qtdTentativas);

    },

    setarTentativas: function () {
        memoryGame.qtdTentativas++;
        $('#lblTentativas').html(memoryGame.qtdTentativas);
    },

    validarJogador: function () {

        memoryGame.nomeJogador = $('#inputNomeJogador').val();

        if (memoryGame.nomeJogador === '') {
            alert('Necessario preenchimento do nome');
            return false;
        }
        else {
            $('#interfacePrimeiroAcesso').addClass('oculto');
            $('#interface').removeClass('oculto');
            return true;
        }
    }
}