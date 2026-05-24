const API = "http://localhost:5000/api";

async function request(url, options = {}) {
  const res = await fetch(`${API}${url}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.erro || "Erro na requisição");
  return data;
}

export const api = {
  getProdutos: () => request("/produtos"),
  getVendas: () => request("/vendas"),
  criarProduto: (body) =>
    request("/produtos", { method: "POST", body: JSON.stringify(body) }),
  vender: (body) =>
    request("/vendas", { method: "POST", body: JSON.stringify(body) }),
  removerProduto: (id) => request(`/produtos/${id}`, { method: "DELETE" }),
  removerVenda: (id) => request(`/vendas/${id}`, { method: "DELETE" }),
};
