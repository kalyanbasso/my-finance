export default function formatLongDate(value: Date) {
  // response from this function: 13/01/2021
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(value);
}
