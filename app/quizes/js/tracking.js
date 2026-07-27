export function getGAClientId() {
  const cookie = document.cookie
    .split("; ")
    .find(c => c.startsWith("_ga="));

  if (!cookie) return null;

  return cookie.split(".").slice(2).join(".");
}