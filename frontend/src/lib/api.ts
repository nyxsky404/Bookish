export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export function authHeaders(token?: string | null): HeadersInit {
  if (!token) {
    return {};
  }

  return { Authorization: `Bearer ${token}` };
}

export async function parseJson<T>(response: Response): Promise<T> {
  const data = await response.json();
  if (!response.ok) {
    const message = (data as { message?: string }).message || "Request failed";
    throw new Error(message);
  }
  return data as T;
}
