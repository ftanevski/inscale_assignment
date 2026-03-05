export const LOGIN_URL =
  "https://tripx-test-functions.azurewebsites.net/api/login";

export const DESTINATIONS_URL =
  "https://book.tripx.se/wp-json/tripx/v1/destinations";

export interface LoginResult {
  success: boolean;
  error?: "invalid_credentials" | "server_error" | "network_error";
}

export async function login(
  username: string,
  password: string
): Promise<LoginResult> {
  try {
    const res = await fetch(LOGIN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      return { success: true };
    }

    if (res.status >= 500) {
      return { success: false, error: "server_error" };
    }

    return { success: false, error: "invalid_credentials" };
  } catch {
    return { success: false, error: "network_error" };
  }
}
