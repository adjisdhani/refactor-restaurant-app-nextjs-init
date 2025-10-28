export function getCsrfTokenFromCookie() {
  const cookie = document.cookie.split("; ").find(c => c.startsWith("csrf="))?.split("=")[1];
  if (!cookie) return null;
  const [token] = cookie.split(".");
  return token ?? null;
}
