// Adresse de l'API Express, écrite une seule fois pour tout le front
const BASE_URL = "http://localhost:3000";

// Lecture : GET sur l'API, retourne les données ou lance une erreur
export async function request(path) {
  const response = await fetch(`${BASE_URL}${path}`);

  // Un 404 ou un 500 ne fait pas échouer fetch : il faut tester response.ok
  if (!response.ok) {
    throw new Error(`Erreur ${response.status}`);
  }

  return response.json();
}

// Écriture : POST sur l'API avec un corps JSON
export async function post(path, corps) {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(corps),
  });

  // On lit le corps avant de tester ok, pour récupérer le message de l'API
  const donnees = await response.json();

  if (!response.ok) {
    throw new Error(donnees.erreur ?? `Erreur ${response.status}`);
  }

  return donnees;
}