import Input from "./Input";
import Button from "./Button";

export default function ProductForm({ values, onChange, onSubmit, loading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Input
        label="Nome do produto"
        id="nome-produto"
        placeholder="Ex: Ração Premium 15kg"
        value={values.nome}
        onChange={(e) => onChange({ ...values, nome: e.target.value })}
        required
      />
      <Input
        label="Preço (R$)"
        id="preco-produto"
        type="number"
        placeholder="0,00"
        min="0"
        step="0.01"
        value={values.preco}
        onChange={(e) => onChange({ ...values, preco: e.target.value })}
        required
      />
      <Input
        label="Quantidade em estoque"
        id="qtd-produto"
        type="number"
        placeholder="0"
        min="0"
        value={values.quantidade}
        onChange={(e) => onChange({ ...values, quantidade: e.target.value })}
        required
      />
      <Button type="submit" variant="primary" full disabled={loading}>
        {loading ? "Cadastrando..." : "Cadastrar produto"}
      </Button>
    </form>
  );
}
