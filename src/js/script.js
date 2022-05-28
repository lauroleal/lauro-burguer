function modalidade(valor) {
    sessionStorage.setItem("modalidade", valor);
    window.location = 'cardapio.html';
}

// mostrar itens do Pedido

let valorPedido = 0;
let array = [];
let preco, nome, img;

function addCarrinho(id) {

    preco = document.querySelectorAll('.precoCombo')[id].innerText;
    nome = document.querySelectorAll('.nomeCombo')[id].innerText;
    img = document.querySelectorAll('.imgCombo')[id];
    document.getElementById('produtosNoCarrinho').innerHTML += `<li class="cardProduto">
    <!--  NOME/FOTO PRODUTO  -->
    <div class="infoNome">
     <img src="${img.src}" alt="${img.alt}">
     <p>${nome}</p>
     </div>
    <!-- PREÇO PRODUTO -->
    <div class="infoPreco">
    <p>${preco}</p>
    </div>
    <img onclick="removerItem(${id})" src="./src/assets/lixo.png" alt="Lixo para remover produto">
    </div>
    </li> `;

    valorPedido += parseFloat(preco.slice(3, 8));
    document.getElementById('valorTotal').innerText = valorPedido.toFixed(2);

}