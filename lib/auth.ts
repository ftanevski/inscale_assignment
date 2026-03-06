const AUTH_KEY = "tripx_authenticated";
const BOOKING_CODE_KEY = "tripx_booking_code";

export function setSession(bookingCode?: string): void {
  sessionStorage.setItem(AUTH_KEY, "true");
  if (bookingCode) {
    sessionStorage.setItem(BOOKING_CODE_KEY, bookingCode);
  } else {
    sessionStorage.removeItem(BOOKING_CODE_KEY);
  }
}

export function clearSession(): void {
  sessionStorage.removeItem(AUTH_KEY);
  sessionStorage.removeItem(BOOKING_CODE_KEY);
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(AUTH_KEY) === "true";
}

export function getBookingCode(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(BOOKING_CODE_KEY);
}
