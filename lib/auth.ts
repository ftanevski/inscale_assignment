const AUTH_KEY = "tripx_authenticated";

export function setSession(): void {
  sessionStorage.setItem(AUTH_KEY, "true");
}

export function clearSession(): void {
  sessionStorage.removeItem(AUTH_KEY);
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(AUTH_KEY) === "true";
}
