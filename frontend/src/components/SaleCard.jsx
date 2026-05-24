import Button from "./Button";
import { FadeIn } from "./FadeIn";
import { IconTrash } from "./Icons";

export default function SaleCard({ venda, onRemover, disabled, index = 0 }) {
  const total = Number(venda.total).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const data = venda.data_venda
    ? new Date(venda.data_venda).toLocaleString("pt-BR", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <FadeIn delay={index * 50}>
      <article className="sale-item">
        <div className="sale-item__info">
          <p className="sale-item__product">{venda.produto}</p>
          <div className="sale-item__details">
            <span>Qtd: {venda.quantidade}</span>
            {data && <span>{data}</span>}
          </div>
        </div>
        <span className="sale-item__total">{total}</span>
        <Button
          variant="danger"
          size="sm"
          onClick={() => onRemover(venda.id)}
          disabled={disabled}
          icon={<IconTrash size={16} />}
          aria-label={`Remover venda de ${venda.produto}`}
        >
          Remover
        </Button>
      </article>
    </FadeIn>
  );
}
