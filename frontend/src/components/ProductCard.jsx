import Button from "./Button";
import { FadeIn } from "./FadeIn";
import { IconCart, IconTrash } from "./Icons";

function getStockStatus(qty) {
  if (qty <= 0) return { label: "Sem estoque", className: "stock-badge--empty" };
  if (qty <= 5) return { label: `Estoque baixo: ${qty}`, className: "stock-badge--low" };
  return { label: `Estoque: ${qty}`, className: "stock-badge--ok" };
}

export default function ProductCard({ produto, onVender, onRemover, disabled, index = 0 }) {
  const stock = getStockStatus(produto.quantidade_estoque);
  const preco = Number(produto.preco).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <FadeIn delay={index * 60}>
      <article className="product-card">
        <div className="product-card__header">
          <h3 className="product-card__name">{produto.nome}</h3>
          <span className="product-card__price">{preco}</span>
        </div>

        <div className="product-card__meta">
          <span className={`stock-badge ${stock.className}`}>{stock.label}</span>
        </div>

        <div className="product-card__actions">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onVender(produto.id)}
            disabled={disabled || produto.quantidade_estoque <= 0}
            icon={<IconCart size={16} />}
          >
            Vender
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => onRemover(produto.id)}
            disabled={disabled}
            icon={<IconTrash size={16} />}
          >
            Remover
          </Button>
        </div>
      </article>
    </FadeIn>
  );
}
