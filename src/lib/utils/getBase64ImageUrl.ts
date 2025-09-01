export function getBase64ImageUrl(dataUrl: string): string {
  if (dataUrl) {
    return dataUrl.replace(/^data:image\/\w+;base64,/, "");
  } else {
    return "";
  }
}
