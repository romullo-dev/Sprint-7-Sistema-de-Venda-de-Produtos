const nomeProdutoInput = document.getElementById("nome-produto");
const valorProdutoInput = document.getElementById("valor-produto");
const quantidadeInput = document.getElementById("quantidade");
const subtotalSpan = document.getElementById("subtotal");
const inserirBtn = document.getElementById("inserir-btn");
const tabelaProdutos = document.getElementById("tabela-produtos");
const totalAPagarSpan = document.getElementById("total-a-pagar");
const finalizarVendaBtn = document.getElementById("finalizar-venda-btn");
const confirmarPagamentoBtn = document.getElementById("confirmar-pagamento-btn");
const formasPagamento = document.getElementsByName("forma-pagamento");
const detalhePagamento = document.getElementById("detalhe-pagamento");

let totalAPagar = 0;

function atualizarSubtotal() {
    const valor = parseFloat(valorProdutoInput.value) || 0;
    const quantidade = parseInt(quantidadeInput.value) || 0;
    const subtotal = valor * quantidade;

    subtotalSpan.textContent = `R$ ${subtotal.toFixed(2)}`;
}

function inserirProduto() {
    const nomeProduto = nomeProdutoInput.value.trim();
    const valorProduto = parseFloat(valorProdutoInput.value);
    const quantidade = parseInt(quantidadeInput.value);

    if (!nomeProduto || isNaN(valorProduto) || isNaN(quantidade)) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    const subtotal = valorProduto * quantidade;

    const novaLinha = document.createElement("tr");
    novaLinha.innerHTML = `
        <td>${nomeProduto}</td>
        <td>${quantidade}</td>
        <td>R$ ${subtotal.toFixed(2)}</td>
    `;
    tabelaProdutos.appendChild(novaLinha);

    totalAPagar += subtotal;
    totalAPagarSpan.textContent = `R$ ${totalAPagar.toFixed(2)}`;

    nomeProdutoInput.value = "";
    valorProdutoInput.value = "";
    quantidadeInput.value = "";
    subtotalSpan.textContent = "R$ 0,00";
}

function finalizarVenda() {
    if (totalAPagar === 0) {
        alert("Nenhum produto foi inserido.");
        return;
    }

    alert("Venda finalizada! Escolha a forma de pagamento.");
}

function confirmarPagamento() {
    let formaEscolhida = null;
    formasPagamento.forEach(radio => {
        if (radio.checked) {
            formaEscolhida = radio.value;
        }
    });

    if (!formaEscolhida) {
        alert("Escolha uma forma de pagamento.");
        return;
    }

    detalhePagamento.textContent = `Pagamento confirmado via ${formaEscolhida}.`;
    alert("Pagamento concluído com sucesso!");
    resetarVenda();
}

function resetarVenda() {
    tabelaProdutos.innerHTML = "";
    totalAPagar = 0;
    totalAPagarSpan.textContent = "R$ 0,00";
    detalhePagamento.textContent = "";
    formasPagamento.forEach(radio => (radio.checked = false));
}

valorProdutoInput.addEventListener("input", atualizarSubtotal);
quantidadeInput.addEventListener("input", atualizarSubtotal);
inserirBtn.addEventListener("click", inserirProduto);
finalizarVendaBtn.addEventListener("click", finalizarVenda);
confirmarPagamentoBtn.addEventListener("click", confirmarPagamento);
