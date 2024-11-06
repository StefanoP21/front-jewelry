export function formatDate(date: string) {
  const parsedDate = new Date(date);

  const day = String(parsedDate.getDate()).padStart(2, "0");
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0"); // Los meses son 0-indexed
  const year = parsedDate.getFullYear();

  return `${day}/${month}/${year}`;
}

export function formatFormalDate(dateString: string | number | undefined) {
  if (!dateString) return "";

  const date = new Date(dateString);

  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}
