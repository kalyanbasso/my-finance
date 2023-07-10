export default function formatCurrencyPtBr(value: number): string {
  // response from this function: R$ 1.000,00
  const valueDivided = Math.abs(value) / 100;
  const formattedValue = valueDivided.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `R$ ${formattedValue}`;
  
}