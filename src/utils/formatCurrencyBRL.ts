export default function formatCurrencyPtBr(value: number): string {
  // response from this function: R$ 1.000,00
  const formattedValue = value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `R$ ${formattedValue}`;
  
}
