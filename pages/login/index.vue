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

<script setup>
// import { useAuth } from "~/composables/useAuth";

const { signIn } = useAuth();

function login() {
  signIn("keycloak");
}
</script>
