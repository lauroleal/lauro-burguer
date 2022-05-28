function id(val) {
    return document.getElementById(val);
}


function modalidade(valor) {
    sessionStorage.setItem("modalidade", valor);
    let element = id('botoes');
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    id('botoes').innerHTML = `<section>
    <button class="button">
    <img onclick="comCpf()" class="img" src="./src/assets/comcpf.svg">
<p>Colocar CPF na nota?</p>
</button>
</section>
<section>
    <button class="button">
    <img onclick="nome()" class="img" src="./src/assets/semcpf.svg">
    <p>Sem CPF</p>
</button>
</section>`;
}

function comCpf() {
    let element = id('botoes');
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    id('botoes').innerHTML = `<section class="container__colum">
    <div>
    <p class="texto_p">Digite seu CPF</p>
    <input id="cpfDigitado">
    <p id="msgErro"></p>
</div>
<div class="container__telaprincipal">
    <button onclick="iniciarValidacao()" class="button_1"><p>Adicionar</p></button> <button onclick="nome()"class="button_1"><p>Cancelar</p></button>
</div>
</section>`;
}



function abriCardapio() {
    window.location = 'cardapio.html';
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function iniciarValidacao() {

    //limpando as menssagens
    id('msgErro').innerHTML = '';

    let cpf = id('cpfDigitado').value;

    if (cpf != '') {
        validarCpf();
    } else {
        id('msgErro').innerHTML = 'Que tal você digitar alguma coisa primeiro 😛';
    }

    function validarCpf() {
        // tem jeito mais dahora pra fazer isso mas... por enquanto é isso!
        listaBloqueada = [11111111111, 22222222222, 33333333333, 44444444444, 55555555555, 66666666666, 77777777777, 88888888888, 99999999999];
        controle = 0;
        for (let i = 0; i < 9; i++) {
            // dava pra fazer tudo junto, mas sei lá ia ficar grande e repetitivo!
            if (cpf != listaBloqueada[i]) {
                controle++;
            } else {
                id('msgErro').innerHTML = 'CPF Inválido';
            }
        }

        if (controle === 9) {
            if (cpf.length === 11 && isNumber(cpf)) {
                validandoCpf();
            } else {
                id('msgErro').innerHTML = 'CPF Inválido';
            }
        }
    }


    function validandoCpf() {
        // 1º parte
        controle = 10;
        let guardarValor = [];
        let soma = 0;

        for (let i = 0; i < 9; i++) {
            guardarValor.push(parseInt(cpf[i]) * controle)
            soma = soma + guardarValor[i];
            controle--;
        }

        let primeiroDigito = (soma * 10) % 11;
        if (primeiroDigito > 9) {
            primeiroDigito = 0;
        }

        // 2º parte
        controle = 11;
        guardarValor = [];
        soma = 0;

        for (let i = 0; i < 10; i++) {
            guardarValor.push(parseInt(cpf[i]) * controle)
            soma = soma + guardarValor[i];
            controle--;
        }

        let segundoDigito = (soma * 10) % 11;
        if (segundoDigito > 9) {
            segundoDigito = 0;
        }

        if (primeiroDigito === parseInt(cpf[9]) && segundoDigito === parseInt(cpf[10])) {
            sessionStorage.setItem("cpf", cpf);
            nome();
        } else {
            id('msgErro').innerHTML = 'CPF Inválido';
        }

    }
}

function nome() {
    let element = id('botoes');
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    id('botoes').innerHTML = `<section class="container__colum">
    <div>
    <p class="texto_p">Digite seu NOME</p>
    <input id="nomeDigitado">
    <p id="msgErro"></p>
</div>
<div class="container__telaprincipal">
    <button onclick="cadastrarNome()" class="button_1"><p>Adicionar</p></button> <button onclick="abriCardapio()" class="button_1"><p>Sem Nome</p></button>
</div>
</section>`;
}

function cadastrarNome() {
    let nomeCliente = id('nomeDigitado').value;
    if (nomeCliente != '') {
        sessionStorage.setItem("nome", nomeCliente);
        abriCardapio();
    } else {
        id('msgErro').innerHTML = 'Por favor Digite seu nome!';
    }

}


// mostrar itens do Pedido

let valorPedido = 0;
let array = [];
let preco, nomep, img;

function addCarrinho(iden) {

    preco = document.querySelectorAll('.precoCombo')[iden].innerText;
    nomep = document.querySelectorAll('.nomeCombo')[iden].innerText;
    img = document.querySelectorAll('.imgCombo')[iden];
    id('produtosNoCarrinho').innerHTML += `<li class="cardProduto">
    <!--  NOME/FOTO PRODUTO  -->
    <div class="infoNome">
     <img src="${img.src}" alt="${img.alt}">
     <p>${nomep}</p>
     </div>
    <!-- PREÇO PRODUTO -->
    <div class="infoPreco">
    <p>${preco}</p>
    </div>
    <img onclick="removerItem(${iden})" src="./src/assets/lixo.png" alt="Lixo para remover produto">
    </div>
    </li> `;

    valorPedido += parseFloat(preco.slice(3, 8));
    id('valorTotal').innerText = valorPedido.toFixed(2);

}