export default function formatTwoDates(
  firstDate?: Date,
  lastDate?: Date
): string {
  // 01 a 13 de janeiro

  if (!firstDate || !lastDate) return "";

  const firstDateFormatted = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: firstDate?.getMonth() === lastDate?.getMonth() ? undefined : "long",
  }).format(firstDate);

  const lastDateFormatted = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
  }).format(lastDate);

  return `${firstDateFormatted} à ${lastDateFormatted}`;
}
