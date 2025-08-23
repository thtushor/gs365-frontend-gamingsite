export default function formatDate(
  isoString: string,
  onlyDate: boolean = false
): string {
  const date = new Date(isoString);

  const options: Intl.DateTimeFormatOptions = onlyDate
    ? {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    : {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      };

  return date.toLocaleString("en-US", options);
}
