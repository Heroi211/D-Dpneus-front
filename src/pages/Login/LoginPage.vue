<template>
  <div
    class="login-page d-flex align-items-center justify-content-center min-vh-100 bg-dark text-white"
  >
    <div
      class="card shadow-lg p-4 text-center login-card"
      style="width: 400px; border-radius: 1rem;"
    >
      <transition name="fade-slide" mode="out-in">
        <div v-if="!showForm" key="logo" @click="revealForm" class="logo-container">
          <img
            src="/img/D&D_SIDEBAR_GREENJ.png"
            alt="Logo D&D Pneus"
            class="login-logo"
          />
          <p class="mt-3 text-muted small">Clique para entrar</p>
        </div>

        <div v-else key="form">
          <img
            src="/img/D&D_SIDEBAR_GREENJ.png"
            alt="Logo D&D Pneus"
            class="login-logo-small mb-3"
          />
          <LoginForm />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import LoginForm from "@/components/Login/LoginForm.vue";

export default {
  name: "LoginPage",
  components: { LoginForm },
  data() {
    return {
      showForm: false,
    };
  },
  methods: {
    revealForm() {
      this.showForm = true;
    },
  },
};
</script>
