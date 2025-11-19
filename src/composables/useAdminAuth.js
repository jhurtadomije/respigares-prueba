import { ref } from "vue";
import api from "../services/api";

const token = ref(localStorage.getItem("respigares_token") || null);

export function useAdminAuth() {
  const isAuthenticated = () => !!token.value;

  async function login(username, password) {
    const { data } = await api.post("/auth/login", { username, password });
    token.value = data.token;
    localStorage.setItem("respigares_token", data.token);
  }

  function logout() {
    token.value = null;
    localStorage.removeItem("respigares_token");
  }

  return {
    token,
    isAuthenticated,
    login,
    logout,
  };
}
