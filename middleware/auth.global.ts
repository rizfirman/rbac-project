import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware((to, from) => {
  const store = useAuthStore();

  // Jika pengguna tidak memiliki token dan mencoba mengakses halaman utama, redirect ke login
  if (!store?.accessToken && to.path !== '/login') {
    return navigateTo('/login');
  }

  // Jika pengguna sudah memiliki token dan mencoba mengakses halaman login, redirect ke home
  if (store?.accessToken && to.path === '/login') {
    return navigateTo('/home');
  }

  // Lanjutkan navigasi ke halaman yang diminta
});
