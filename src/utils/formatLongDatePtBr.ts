export default function formatLongDate(value?: Date) {
  if (!value) return "";
  // response from this function: 01 de janeiro
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long"
  }).format(value);
}