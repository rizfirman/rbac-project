import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  console.log("Global middleware: auth to" + to.path);
  console.log("Global middleware: auth from" + from.path);

  const store = useAuthStore();
  if (to.hash) {
    return navigateTo(to.path);
  }

  // jika path mengarah ke "/"
  if (to.path === "/") {
    if (store?.accessToken) {
      return navigateTo("/home");
    }
    return navigateTo("/login");
  }

  // Jika pengguna tidak memiliki token dan mencoba mengakses halaman utama, redirect ke login
  // if (!store?.accessToken && to.path !== "/login") {
  //   return navigateTo("/login");
  // }

  // Jika pengguna sudah memiliki token dan mencoba mengakses halaman login, redirect ke home
  // if (store?.accessToken && to.path === "/login") {
  //   return navigateTo("/home");
  // }

  // Lanjutkan navigasi ke halaman yang diminta
});
