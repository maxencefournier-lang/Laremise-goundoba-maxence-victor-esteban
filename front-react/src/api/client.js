const BASE_URL = "http://localhost:3000";

export async function request(path) {
  const response = await fetch(`${BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`Erreur ${response.status}`);
  }

  return response.json();
}