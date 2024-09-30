import { jwtDecode } from 'jwt-decode';
import { useAuthStore } from '~/stores/auth';

export default defineNuxtPlugin((nuxtApp) => {
  const authStore = useAuthStore();
  if (authStore.accessToken) {
    const decoded = jwtDecode(authStore.accessToken);
    console.log('name', decoded);
    authStore.setRoleName(decoded.name);
    authStore.setAuthId(decoded.sub);
    nuxtApp.provide('roles', decoded.realm_access.roles);
  }
});
