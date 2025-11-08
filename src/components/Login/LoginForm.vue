<template>
  <form @submit.prevent="login">
    <div class="form-group mb-3">
      <label for="email">Usuário</label>
      <input
        type="text"
        id="email"
        v-model="email"
        class="form-control"
        placeholder="Digite seu usuário"
        required
      />
    </div>
    <div class="form-group mb-4">
      <label for="password">Senha</label>
      <input
        type="password"
        id="password"
        v-model="password"
        class="form-control"
        placeholder="Digite sua senha"
        required
      />
    </div>
    <button type="submit" class="btn btn-success w-100">
      Entrar
    </button>
    <div v-if="error" class="alert alert-danger mt-3 text-center">
      {{ error }}
    </div>
    <footer class="footer-login text-center py-3">
      <small>© {{ new Date().getFullYear() }} D&D Pneus e lubrificantes</small>
    </footer>
  </form>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    login() {
      if (this.email === "admin" && this.password === "1234") {
        localStorage.setItem("token", "fake-token");
        this.$router.push("/dashboard");
      } else {
        this.error = "Usuário ou senha incorretos.";
      }
    },
  },
};
</script>

 
