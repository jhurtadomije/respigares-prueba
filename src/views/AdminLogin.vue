<template>
  <section class="admin-login">
    <div class="admin-login__card">
      <h1 class="admin-login__title">Acceso panel Respigares</h1>

      <form @submit.prevent="onSubmit" class="admin-login__form">
        <label class="admin-login__label">
          Usuario
          <input
            v-model="username"
            type="text"
            autocomplete="username"
            class="admin-login__input"
            placeholder="admin"
          />
        </label>

        <label class="admin-login__label">
          Contraseña
          <input
            v-model="password"
            type="password"
            autocomplete="current-password"
            class="admin-login__input"
            placeholder="••••••••"
          />
        </label>

        <button
          type="submit"
          class="admin-login__btn"
          :disabled="loading"
        >
          {{ loading ? "Entrando..." : "Entrar" }}
        </button>

        <p v-if="error" class="admin-login__error">{{ error }}</p>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { login, isAuthenticated } from "../services/authService";

const username = ref("");
const password = ref("");
const loading = ref(false);
const error = ref("");

const router = useRouter();
const route = useRoute();

onMounted(() => {
  // ✅ Si ya está autenticado y entra al login, lo mandamos al dashboard
  if (isAuthenticated()) {
    router.replace({ name: "AdminDashboard" });
  }
});

async function onSubmit() {
  error.value = "";
  loading.value = true;

  try {
    await login(username.value, password.value);

    // ✅ volver a donde quería ir (guard -> query.redirect)
    const redirect = route.query.redirect || "/admin";
    router.replace(redirect);
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
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 2rem 1rem;
  background:
    radial-gradient(900px circle at 15% -10%, #ab0a3d22, transparent 55%),
    radial-gradient(700px circle at 90% 0%, #33669322, transparent 60%),
    linear-gradient(180deg, #f7f9fb 0%, #f1f4f7 100%);
}

.admin-login__card {
  width: 100%;
  max-width: 420px;
  background: #fff;
  border-radius: 1.2rem;
  padding: 2rem 1.6rem;
  box-shadow: 0 0.8rem 2.2rem rgba(0,0,0,0.10);
  border: 1px solid #eee;
  animation: cardIn .45s ease-out;
}

@keyframes cardIn {
  from { opacity: 0; transform: translateY(8px) scale(.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

.admin-login__title {
  margin-bottom: 1.5rem;
  font-size: 1.6rem;
  color: var(--color-main);
  font-weight: 900;
  text-align: center;
}

.admin-login__form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.admin-login__label {
  font-weight: 700;
  color: #444;
  font-size: 0.95rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.admin-login__input {
  width: 100%;
  padding: 0.75rem 0.9rem;
  border: 1px solid #d9dde4;
  border-radius: 0.7rem;
  outline: none;
  font-size: 1rem;
  background: #f7f8fa;
  transition: border .15s ease, box-shadow .15s ease, background .15s ease;
}

.admin-login__input:focus {
  background: #fff;
  border-color: var(--color-main);
  box-shadow: 0 0 0 3px #ab0a3d1a;
}

.admin-login__btn {
  margin-top: 0.4rem;
  width: 100%;
  padding: 0.9rem 1rem;
  border-radius: 999px;
  font-weight: 900;
  font-size: 1rem;
  background: linear-gradient(135deg, var(--color-main), var(--color-gray));
  color: #fff;
  cursor: pointer;
  transition: filter .15s ease, transform .1s ease, box-shadow .2s ease;
  box-shadow: 0 8px 18px #ab0a3d2a;
}

.admin-login__btn:hover {
  filter: brightness(1.05);
  transform: translateY(-1px);
}

.admin-login__btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.admin-login__error {
  margin-top: 0.4rem;
  color: #b00020;
  font-weight: 700;
  text-align: center;
  background: #b0002010;
  border: 1px solid #b0002020;
  padding: 0.55rem 0.8rem;
  border-radius: 0.6rem;
}
</style>
