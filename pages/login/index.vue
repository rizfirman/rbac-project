<template>
  <div class="h-screen flex justify-center items-center">
    <div class="bg-white rounded-lg p-8">
      <div class="flex justify-center">
        <p class="text-xl font-bold">RBAC PROJECT</p>
      </div>

      <div class="flex justify-center mt-2">
        <Button label="Login" @click="login()" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';
const { $keycloak } = useNuxtApp();
const store = useAuthStore();

onBeforeMount(() => {
  if (store.accessToken) {
    navigateTo('/home');
  }
});

const login = () => {
  const keycloak = $keycloak as any;
  // Memanggil fungsi login dari Keycloak
  keycloak.login({
    redirectUri: window.location.origin, // Redirect ke URL ini setelah login
  });
};
</script>
