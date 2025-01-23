export const setToken = (token) => {
  localStorage.setItem('token', token); // Enregistre le token dans le localStorage
};

export const getToken = () => {
  return localStorage.getItem('token'); // Récupère le token depuis le localStorage
};

export const removeToken = () => {
  localStorage.removeItem('token'); // Supprime le token
};

