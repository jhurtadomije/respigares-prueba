<template>
  <div class="admin-login">
    <h1>Acceso panel Respigares</h1>

    <form @submit.prevent="onSubmit" class="admin-login__form">
      <label>
        Usuario
        <input v-model="username" type="text" autocomplete="username" />
      </label>

      <label>
        Contraseña
        <input
          v-model="password"
          type="password"
          autocomplete="current-password"
        />
      </label>

      <button type="submit" :disabled="loading">
        {{ loading ? "Entrando..." : "Entrar" }}
      </button>

      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "../services/authService";

const username = ref("");
const password = ref("");
const loading = ref(false);
const error = ref("");
const router = useRouter();

async function onSubmit() {
  error.value = "";
  loading.value = true;
  try {
    await login(username.value, password.value);
    router.push({ name: "admin-productos" });
  } catch (err) {
    console.error(err);
    error.value =
      err.response?.data?.error || "No se ha podido iniciar sesión";
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.admin-login {
  max-width: 400px;
  margin: 3rem auto;
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  background: #fff;
}

.admin-login__form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
}

input {
  padding: 0.4rem 0.6rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  padding: 0.5rem 0.8rem;
  border-radius: 4px;
  border: none;
  background: #006bb7;
  color: #fff;
  cursor: pointer;
}

button[disabled] {
  opacity: 0.6;
  cursor: default;
}

.error {
  color: #c00;
  font-size: 0.85rem;
}
</style>
