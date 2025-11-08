<template>
  <div class="login-page d-flex align-items-center justify-content-center min-vh-100 bg-dark text-white">
    <div class="card shadow-lg p-4" style="width: 400px; border-radius: 1rem;">
      <!-- <h3 class="text-center mb-4 text-uppercase">Entrar</h3> -->
      <img src="/img/logo_ddpneus.png" alt="Descrição da imagem" width="210px" height="210px" class="mb-4 d-block mx-auto" />
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
