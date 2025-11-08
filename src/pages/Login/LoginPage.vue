<template>
  <div class="login-page d-flex align-items-center justify-content-center min-vh-100 bg-dark text-white">
    <div class="card shadow-lg p-4" style="width: 400px; border-radius: 1rem;">
      <h3 class="text-center mb-4 text-uppercase">Entrar</h3>
      <LoginForm />
    </div>
  </div>
</template>

<script>
import LoginForm from "@/components/Login/LoginForm.vue";

export default {
  name: "LoginPage",
  components: { LoginForm },
};
</script>

<style scoped>
.login-page {
  background: linear-gradient(135deg, #1e1e2f, #2c2c54);
}
.card {
  background-color: #2a2a40;
  color: #fff;
}
</style>
