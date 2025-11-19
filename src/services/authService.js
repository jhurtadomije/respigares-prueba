// src/services/authService.js
import api from "./api";

const TOKEN_KEY = "respigares_token";

export async function login(username, password) {
  const res = await api.post("/auth/login", { username, password });
  const token = res.data.token;
  localStorage.setItem(TOKEN_KEY, token);
  return token;
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function isAuthenticated() {
  return !!getToken();
}
