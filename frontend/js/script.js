const API = "http://localhost:3000/api/produtos";

document.addEventListener("DOMContentLoaded", carregarProdutos);

/* LISTAR */
function carregarProdutos() {
  fetch(API)
    .then(res => res.json())
    .then(produtos => {

      const lista = document.getElementById("lista-produtos");
      const select = document.getElementById("produto-venda");

      lista.innerHTML = "";
      select.innerHTML = "";

      produtos.forEach(produto => {

        // UI
        lista.innerHTML += `
          <div class="produto">
            <div>
              <strong>${produto.nome}</strong><br>
              Estoque: ${produto.quantidade}
            </div>
            <div class="produto-preco">
              R$ ${Number(produto.preco).toFixed(2)}
            </div>
          </div>
        `;

        // SELECT
        select.innerHTML += `
          <option value="${produto.id}">
            ${produto.nome}
          </option>
        `;
      });
    });
}

/* CADASTRO */
document.getElementById("form-produto").addEventListener("submit", e => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const preco = document.getElementById("preco").value;
  const quantidade = document.getElementById("quantidade").value;

  fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ nome, preco, quantidade })
  })
  .then(() => {
    carregarProdutos();
    e.target.reset();
  });
});

/* VENDA */
document.getElementById("form-venda").addEventListener("submit", e => {
  e.preventDefault();

  const id = document.getElementById("produto-venda").value;
  const qtd = parseInt(document.getElementById("quantidade-venda").value);

  fetch(`${API}/${id}`)
    .then(res => res.json())
    .then(produto => {

      if (qtd > produto.quantidade) {
        alert("Estoque insuficiente!");
        return;
      }

      const novo = produto.quantidade - qtd;
      const total = qtd * produto.preco;

      document.getElementById("total").textContent = total.toFixed(2);

      fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ quantidade: novo })
      })
      .then(() => carregarProdutos());
    });
});