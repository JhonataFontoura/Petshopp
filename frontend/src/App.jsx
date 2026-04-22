import { useEffect, useState } from "react";

const API = "http://localhost:5000/api";

export default function App() {
  const [produtos, setProdutos] = useState([]);
  const [vendas, setVendas] = useState([]);

  const [novoProduto, setNovoProduto] = useState({
    nome: "",
    preco: "",
    quantidade: "",
  });

  useEffect(() => {
    listarProdutos();
    listarVendas();
  }, []);

  async function listarProdutos() {
    const res = await fetch(`${API}/produtos`);
    const data = await res.json();
    setProdutos(data);
  }

  async function listarVendas() {
    const res = await fetch(`${API}/vendas`);
    const data = await res.json();
    setVendas(data);
  }

  async function cadastrarProduto() {
    await fetch(`${API}/produtos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: novoProduto.nome,
        preco: Number(novoProduto.preco),
        quantidade_estoque: Number(novoProduto.quantidade),
      }),
    });

    setNovoProduto({ nome: "", preco: "", quantidade: "" });
    listarProdutos();
  }

  async function vender(id) {
    await fetch(`${API}/vendas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        produto_id: id,
        quantidade: 1,
      }),
    });

    listarProdutos();
    listarVendas();
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>🐾 Dashboard PetShop</h1>

      <h2>Cadastrar Produto</h2>
      <input
        placeholder="Nome"
        value={novoProduto.nome}
        onChange={(e) =>
          setNovoProduto({ ...novoProduto, nome: e.target.value })
        }
      />
      <input
        placeholder="Preço"
        type="number"
        value={novoProduto.preco}
        onChange={(e) =>
          setNovoProduto({ ...novoProduto, preco: e.target.value })
        }
      />
      <input
        placeholder="Quantidade"
        type="number"
        value={novoProduto.quantidade}
        onChange={(e) =>
          setNovoProduto({ ...novoProduto, quantidade: e.target.value })
        }
      />
      <button onClick={cadastrarProduto}>Cadastrar</button>

      <h2>Produtos</h2>
      <ul>
        {produtos.map((p) => (
          <li key={p.id}>
            {p.nome} - R$ {p.preco} - Estoque: {p.quantidade_estoque}
            <button onClick={() => vender(p.id)}>Vender</button>
          </li>
        ))}
      </ul>

      <h2>Vendas</h2>
      <ul>
        {vendas.map((v) => (
          <li key={v.id}>
            {v.produto} - {v.quantidade}x - R$ {v.total}
          </li>
        ))}
      </ul>
    </div>
  );
}