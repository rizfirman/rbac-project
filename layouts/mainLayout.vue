<template>
  <div class="h-screen overflow-hidden">
    <div
      class="w-full bg-white h-[72px] flex justify-between items-center pl-5 pr-5"
    >
      <div class="flex items-center">
        <i class="pi pi-shield text-[50px]" />
        <div class="ml-2">
          <p class="font-inter font-bold text-[15px]">Navbar</p>
        </div>
      </div>
      <div class="flex">
        <NuxtLink
          to="/home"
          class="flex items-center"
          v-if="checkRoles(['admin', 'admin_ticket'])"
        >
          <i class="pi pi-home text-[20px] mr-2" />
          <p class="font-inter font-bold text-[15px]">Home</p>
        </NuxtLink>
        <NuxtLink
          to="/create-user"
          class="flex items-center ml-5"
          v-if="checkRoles(['admin'])"
        >
          <i class="pi pi-user-plus text-[20px] mr-2" />
          <p class="font-inter font-bold text-[15px]">Create User</p>
        </NuxtLink>
      </div>

      <div class="flex items-center">
        <img
          class="inline-block h-[32px] w-[32px] rounded-full ring-2 ring-white"
          src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
        <div class="ml-2 mr-2">
          <p class="font-inter font-bold text-[15px]">User</p>
        </div>

        <i class="pi pi-angle-down text-[#525252]"></i>
      </div>
    </div>
    <main
      class="flex-grow p-4 transition-all duration-300 ml-2 overflow-y-auto pb-20"
    >
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
// roles decode jwt
const { $roles } = useNuxtApp();
const roles = $roles as any;
const checkRoles = (roleParams: String[]): boolean => {
  return roleParams.some((item) => roles.includes(item));
};

// roles menggunakan atribut dari keycloak
// const { $keycloak } = useNuxtApp();
// const keycloak = $keycloak as any;
// const { roles } = keycloak.realmAccess;
// const checkRoles = (roleParams: String[]): boolean => {
//   return roleParams.some((item) => roles.includes(item));
// };

// role menggunakan function hasRealmRole dari keycloak
// const { $keycloak } = useNuxtApp();
// const keycloak = $keycloak as any;
// const checkRoles = (roleParams: String[]): boolean => {
//   return roleParams.some((item) => keycloak.hasRealmRole(item));
// };
</script>

<style lang="scss">
.active {
  color: red;
}
</style>
