// store/auth.ts
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: useCookie('accessToken').value || '',
    refreshToken: useCookie('refreshToken').value || '',
    refreshExpiresIn: 0,
    expiresIn: 0,
    roleName: '',
    authId: useCookie('authId').value || '',
  }),
  actions: {
    setTokens(accessToken: string, refreshToken: string) {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;

      useCookie('accessToken').value = accessToken;
      useCookie('refreshToken').value = refreshToken;
    },
    setRoleName(roleName: string) {
      this.roleName = roleName;
    },
    setAuthId(authId: string) {
      this.authId = authId;
      useCookie('authId').value = authId;
    },
  },
});
