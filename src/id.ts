const urlRegex = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
export function toID(url: string) {
  return url.match(urlRegex)?.[1] || url;
}
