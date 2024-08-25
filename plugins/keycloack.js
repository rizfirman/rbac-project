import Keycloak from "keycloak-js";
import { useAuthStore } from "~/stores/auth";
// import { jwtDecode } from 'jwt-decode';

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig();
  const authStore = useAuthStore();
  const keyCloackConfig = {
    url: config.public.keycloakBaseUrl, // ganti dengan URL Keycloak Anda
    realm: "superapps-admin", // ganti dengan realm Keycloak Anda
    clientId: config.public.keyCloackClientId, // ganti dengan client ID Keycloak Anda
  };

  const keycloak = new Keycloak(keyCloackConfig);

  await keycloak
    .init({
      onLoad: "check-sso", // Ini tidak memaksa login otomatis, hanya memeriksa sesi
      checkLoginIframe: false,
    })
    .then((authenticated) => {
      if (authenticated) {
        // Simpan token di local storage atau Pinia store
        // const decoded = jwtDecode(keycloak.token);
        // console.log('decoded', decoded);
        authStore.setTokens(keycloak.token, keycloak.refreshToken);

        navigateTo("/home");
      }
    })
    .catch((error) => {
      console.error("Keycloak initialization failed", error);
    });

  // Tambahkan keycloak ke nuxtApp untuk akses di seluruh komponen
  nuxtApp.provide("keycloak", keycloak);
});
