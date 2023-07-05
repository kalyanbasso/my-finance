export default function formatCurrencyPtBr(value: number) {
  // response from this function: R$ 1.000,00
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}
