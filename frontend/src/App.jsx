import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const API = "http://localhost:5000/api";

export default function Dashboard() {
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: novoProduto.nome,
        preco: novoProduto.preco,
        quantidade_estoque: novoProduto.quantidade,
      }),
    });

    setNovoProduto({ nome: "", preco: "", quantidade: "" });
    listarProdutos();
  }

  async function vender(produto_id) {
    await fetch(`${API}/vendas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ produto_id, quantidade: 1 }),
    });

    listarProdutos();
    listarVendas();
  }

  return (
    <div className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">🐾 Dashboard PetShop</h1>

      {/* CADASTRO */}
      <Card className="rounded-2xl shadow">
        <CardContent className="p-4 grid gap-3">
          <h2 className="text-xl font-semibold">Cadastrar Produto</h2>
          <Input
            placeholder="Nome"
            value={novoProduto.nome}
            onChange={(e) =>
              setNovoProduto({ ...novoProduto, nome: e.target.value })
            }
          />
          <Input
            placeholder="Preço"
            type="number"
            value={novoProduto.preco}
            onChange={(e) =>
              setNovoProduto({ ...novoProduto, preco: e.target.value })
            }
          />
          <Input
            placeholder="Quantidade"
            type="number"
            value={novoProduto.quantidade}
            onChange={(e) =>
              setNovoProduto({ ...novoProduto, quantidade: e.target.value })
            }
          />
          <Button onClick={cadastrarProduto}>Cadastrar</Button>
        </CardContent>
      </Card>

      {/* PRODUTOS */}
      <div className="grid md:grid-cols-3 gap-4">
        {produtos.map((p) => (
          <motion.div
            key={p.id}
            whileHover={{ scale: 1.05 }}
          >
            <Card className="rounded-2xl shadow">
              <CardContent className="p-4">
                <h3 className="text-lg font-bold">{p.nome}</h3>
                <p>R$ {p.preco}</p>
                <p>Estoque: {p.quantidade_estoque}</p>
                <Button className="mt-2" onClick={() => vender(p.id)}>
                  Vender 1
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* VENDAS */}
      <Card className="rounded-2xl shadow">
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-3">Vendas</h2>
          {vendas.map((v) => (
            <div key={v.id} className="border-b py-2">
              {v.produto} - {v.quantidade}x - R$ {v.total}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
