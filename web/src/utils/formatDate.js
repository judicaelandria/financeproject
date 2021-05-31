export default function formatDate(date) {
  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("fr-FR", options).format(new Date(date));
}
