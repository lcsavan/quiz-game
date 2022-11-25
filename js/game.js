let perguntasFeitas = [];


//perguntas do jogo
const perguntas = [
    {
        pergunta: "Qual dessas linguagem não é considerada uma linguagem de programação?",
        respostas: ["PHP", "JavaScript", "C++", "HTML"],
        correta: "resp3"
    },

    {
        pergunta: "Em que ano o Brasil foi descoberto?",
        respostas: ["1498", "1500", "1375", "1828"],
        correta: "resp1"
    },

    {
        pergunta: "Quantas copas do mundo a seleção de futebol brasileira tem?",
        respostas: ["4", "5", "6", "7"],
        correta: "resp1"
    },

    {
        pergunta: "Quem foi airton sena?",
        respostas: ["Jogador de futebol", "Jogador de volei", "Musico", "Piloto de corrida"],
        correta: "resp3"
    },
];

var qtdPerguntas = perguntas.length - 1;
gerarPergunta(qtdPerguntas);

function gerarPergunta(qtdPerguntas) {
    //gerar um numero aleatorio
    let aleatorio = (Math.random() * qtdPerguntas).toFixed();
    //converte para numero
    aleatorio = Number(aleatorio);

    //verifica se a pergunta sorteada foi feita
    if (!perguntasFeitas.includes(aleatorio)) {
        //colocar pergunta feita
        perguntasFeitas.push(aleatorio);

        //preencher o html com os dados da questão sorteada
        var pSelect = perguntas[aleatorio].pergunta;

        $("#pergunta").html(pSelect);
        $("#pergunta").attr('data-indice', aleatorio);


        //colocar respostas
        for (var i = 0; i < perguntas.length; i++) {
            $("#resp" + i).html(perguntas[aleatorio].respostas[i]);
        }

        //Enbarar as respostas
        var pai = $("#respostas");
        var botoes = pai.children();

        for (i = 0; i < botoes.length; i++) {
            pai.append(botoes.eq(Math.floor(Math.random() * botoes.length)));
        }
    } else {
        //se a pergunta ja foi feita
        console.log("ja foi feita, sorteando novamente");
        if (perguntasFeitas.length < qtdPerguntas + 1) {
            return gerarPergunta(qtdPerguntas);
        } else {
            $("#quiz").addClass("oculto");
            $('#mensagem').html('Parabéns você venceu');
            $("#status").removeClass("oculto");
        }
    }
}

$(".respostas").click(function () {
    if ($("#quiz").attr('data-status') !== 'travado') {
        //percorre todas as respostas e desmarcar a classe selecinado
        resetaBotoes();

        //adiciona a classe selecionado
        $(this).addClass("selecionado");
    }
});

$("#confirm").click(function () {

    //pegar o indice da pergunta
    var indice = $("#pergunta").attr('data-indice');

    //qual é a resposta certa
    var respCerta = perguntas[indice].correta;

    //qual foi a resposta que o usuario selecionou
    $('.respostas').each(function () {
        if ($(this).hasClass('selecionado')) {
            var respEscolhida = $(this).attr('id');

            if (respCerta == respEscolhida) {
                console.log('acertou');
                proximaPergunta();
            } else {
                console.log('errou');
                $("#quiz").attr('data-status', 'travado');
                $("#confirm").addClass('oculto ');
                $('#' + respCerta).addClass('correta');
                $('#' + respEscolhida).removeClass('selecionado');
                $('#' + respEscolhida).addClass('errada');
                setTimeout(function () {
                    gameover();
                }, 4000)
            }
        }
    });
});

function proximaPergunta() {
    //percorre todas as respostas e desmarcar a classe selecinado
    resetaBotoes();
    gerarPergunta(qtdPerguntas);
}

function newGame() {
    $("#quiz").attr('data-status', 'ok');
    $("#confirm").removeClass('oculto');
    perguntasFeitas = [];
    resetaBotoes();
    gerarPergunta(qtdPerguntas);
    $("#quiz").removeClass("oculto");
    $("#status").addClass("oculto");
}


function resetaBotoes() {
    $('.respostas').each(function () {
        if ($(this).hasClass('selecionado')) {
            $(this).removeClass('selecionado');
        };

        if ($(this).hasClass('correta')) {
            $(this).removeClass('correta');
        };

        if ($(this).hasClass('errada')) {
            $(this).removeClass('errada');
        };
    });
}

function gameover() {
    $("#quiz").addClass("oculto");
    $('#mensagem').html('Gamer Over');
    $("#status").removeClass("oculto");
}

$('#novoJogo').click(function () {
    newGame();
});