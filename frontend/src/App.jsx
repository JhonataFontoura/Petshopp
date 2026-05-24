import { useCallback, useEffect, useState } from "react";
import { api } from "./services/api";
import Navbar from "./components/Navbar";
import StatCard from "./components/StatCard";
import ProductForm from "./components/ProductForm";
import ProductCard from "./components/ProductCard";
import SaleCard from "./components/SaleCard";
import EmptyState from "./components/EmptyState";
import ConfirmModal from "./components/ConfirmModal";
import Toast from "./components/Toast";
import { FadeIn } from "./components/FadeIn";
import {
  IconPackage,
  IconShoppingBag,
  IconDollar,
  IconPlus,
  IconReceipt,
  IconDog,
  IconCart,
} from "./components/Icons";

const EMPTY_PRODUTO = { nome: "", preco: "", quantidade: "" };

export default function App() {
  const [produtos, setProdutos] = useState([]);
  const [vendas, setVendas] = useState([]);
  const [novoProduto, setNovoProduto] = useState(EMPTY_PRODUTO);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "success" });
  const [confirm, setConfirm] = useState(null);

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
  }, []);

  useEffect(() => {
    if (!toast.message) return;
    const timer = setTimeout(() => setToast({ message: "", type: "success" }), 3200);
    return () => clearTimeout(timer);
  }, [toast.message, toast.type]);

  const carregarDados = useCallback(async () => {
    try {
      const [produtosData, vendasData] = await Promise.all([
        api.getProdutos(),
        api.getVendas(),
      ]);
      setProdutos(produtosData);
      setVendas(vendasData);
    } catch {
      showToast("Erro ao carregar dados. Verifique se o backend está rodando.", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  const receitaTotal = vendas.reduce((acc, v) => acc + Number(v.total), 0);

  async function cadastrarProduto() {
    if (!novoProduto.nome.trim()) {
      showToast("Informe o nome do produto.", "error");
      return;
    }

    setActionLoading(true);
    try {
      await api.criarProduto({
        nome: novoProduto.nome.trim(),
        preco: Number(novoProduto.preco),
        quantidade_estoque: Number(novoProduto.quantidade),
      });
      setNovoProduto(EMPTY_PRODUTO);
      await carregarDados();
      showToast("Produto cadastrado com sucesso!");
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setActionLoading(false);
    }
  }

  async function vender(id) {
    setActionLoading(true);
    try {
      await api.vender({ produto_id: id, quantidade: 1 });
      await carregarDados();
      showToast("Venda registrada!");
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setActionLoading(false);
    }
  }

  function solicitarRemocao(tipo, id, nome) {
    setConfirm({
      tipo,
      id,
      nome,
      title: tipo === "produto" ? "Remover produto" : "Remover venda",
      message:
        tipo === "produto"
          ? `Deseja remover "${nome}"? As vendas vinculadas também serão excluídas.`
          : `Deseja remover a venda de "${nome}"? O estoque será restaurado.`,
    });
  }

  async function confirmarRemocao() {
    if (!confirm) return;
    setActionLoading(true);
    try {
      if (confirm.tipo === "produto") {
        await api.removerProduto(confirm.id);
        showToast("Produto removido.");
      } else {
        await api.removerVenda(confirm.id);
        showToast("Venda removida. Estoque atualizado.");
      }
      setConfirm(null);
      await carregarDados();
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setActionLoading(false);
    }
  }

  return (
    <div className="app">
      <Navbar activeSection="dashboard" />

      <main className="main">
        <FadeIn>
          <section id="dashboard" className="hero section-anchor">
            <h1 className="hero__title">Dashboard Petshopp</h1>
            <p className="hero__subtitle">
              Gerencie produtos, estoque e vendas com uma interface moderna e intuitiva.
            </p>
          </section>
        </FadeIn>

        <section className="stats-grid" aria-label="Resumo">
          <StatCard
            delay={50}
            label="Produtos cadastrados"
            value={loading ? "—" : produtos.length}
            variant="primary"
            icon={<IconPackage />}
          />
          <StatCard
            delay={100}
            label="Vendas realizadas"
            value={loading ? "—" : vendas.length}
            variant="secondary"
            icon={<IconShoppingBag />}
          />
          <StatCard
            delay={150}
            label="Receita total"
            value={
              loading
                ? "—"
                : receitaTotal.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
            }
            variant="accent"
            icon={<IconDollar />}
          />
        </section>

        <div className="dashboard-grid">
          <FadeIn delay={100}>
            <aside className="form-card card">
              <header className="card__header">
                <h2 className="card__title">
                  <span className="card__title-icon">
                    <IconPlus />
                  </span>
                  Novo produto
                </h2>
              </header>
              <div className="card__body">
                <ProductForm
                  values={novoProduto}
                  onChange={setNovoProduto}
                  onSubmit={cadastrarProduto}
                  loading={actionLoading}
                />
              </div>
            </aside>
          </FadeIn>

          <FadeIn delay={150}>
            <section id="produtos" className="card section-anchor">
              <header className="card__header">
                <h2 className="card__title">
                  <span className="card__title-icon">
                    <IconPackage />
                  </span>
                  Produtos
                </h2>
                {!loading && (
                  <span className="card__badge">{produtos.length} itens</span>
                )}
              </header>
              <div className="card__body">
                {loading ? (
                  <div className="loading-overlay" role="status" aria-label="Carregando">
                    <div className="loading-spinner" />
                  </div>
                ) : produtos.length === 0 ? (
                  <EmptyState
                    icon={<IconDog size={32} />}
                    title="Nenhum produto cadastrado"
                    text="Use o formulário ao lado para adicionar o primeiro produto."
                  />
                ) : (
                  <div className="products-grid">
                    {produtos.map((p, i) => (
                      <ProductCard
                        key={p.id}
                        produto={p}
                        index={i}
                        onVender={vender}
                        onRemover={(id) => solicitarRemocao("produto", id, p.nome)}
                        disabled={actionLoading}
                      />
                    ))}
                  </div>
                )}
              </div>
            </section>
          </FadeIn>
        </div>

        <FadeIn delay={200}>
          <section id="vendas" className="card section-anchor">
            <header className="card__header">
              <h2 className="card__title">
                <span className="card__title-icon">
                  <IconReceipt />
                </span>
                Histórico de vendas
              </h2>
              {!loading && (
                <span className="card__badge">{vendas.length} vendas</span>
              )}
            </header>
            <div className="card__body">
              {loading ? (
                <div className="loading-overlay" role="status" aria-label="Carregando">
                  <div className="loading-spinner" />
                </div>
              ) : vendas.length === 0 ? (
                <EmptyState
                  icon={<IconCart size={32} />}
                  title="Nenhuma venda registrada"
                  text="Realize uma venda clicando em Vender em um produto."
                />
              ) : (
                <div className="sales-list">
                  {vendas.map((v, i) => (
                    <SaleCard
                      key={v.id}
                      venda={v}
                      index={i}
                      onRemover={(id) => solicitarRemocao("venda", id, v.produto)}
                      disabled={actionLoading}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        </FadeIn>
      </main>

      <ConfirmModal
        open={!!confirm}
        title={confirm?.title}
        message={confirm?.message}
        confirmLabel="Remover"
        onConfirm={confirmarRemocao}
        onCancel={() => setConfirm(null)}
      />

      <Toast message={toast.message} type={toast.type} />
    </div>
  );
}
