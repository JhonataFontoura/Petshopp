const API = "http://localhost:5000/api";

// ================= PRODUTOS =================

async function cadastrarProduto() {
    const nome = document.getElementById("nome").value;
    const preco = document.getElementById("preco").value;
    const quantidade = document.getElementById("quantidade").value;

    const res = await fetch(`${API}/produtos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nome,
            preco,
            quantidade_estoque: quantidade
        })
    });

    const data = await res.json();
    alert(data.mensagem || data.erro);

    listarProdutos();
}

async function listarProdutos() {
    const res = await fetch(`${API}/produtos`);
    const produtos = await res.json();

    const lista = document.getElementById("listaProdutos");
    lista.innerHTML = "";

    produtos.forEach(p => {
        const li = document.createElement("li");
        li.innerHTML = `
            ID: ${p.id} | ${p.nome} 
            - R$ ${p.preco} 
            - Estoque: ${p.quantidade_estoque}
        `;
        lista.appendChild(li);
    });
}

// ================= VENDAS =================

async function registrarVenda() {
    const produto_id = document.getElementById("produto_id").value;
    const quantidade = document.getElementById("quantidade_venda").value;

    const res = await fetch(`${API}/vendas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ produto_id, quantidade })
    });

    const data = await res.json();
    alert(data.mensagem || data.erro);

    listarProdutos();
    listarVendas();
}

async function listarVendas() {
    const res = await fetch(`${API}/vendas`);
    const vendas = await res.json();

    const lista = document.getElementById("listaVendas");
    lista.innerHTML = "";

    vendas.forEach(v => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${v.produto} - Qtd: ${v.quantidade} 
            - Total: R$ ${v.total}
        `;
        lista.appendChild(li);
    });
}