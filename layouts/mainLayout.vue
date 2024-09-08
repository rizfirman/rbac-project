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
        <div v-for="(itemMenu, index) in listMenu" :key="itemMenu.name">
          <NuxtLink
            :to="itemMenu.path"
            class="flex items-center"
            :class="{ 'ml-5': index > 0 }"
            v-if="isPermission(itemMenu.permission)"
          >
            <i :class="`pi ${itemMenu.icon} text-[20px] mr-2`" />
            <p class="font-inter font-bold text-[15px]">{{ itemMenu.name }}</p>
          </NuxtLink>
        </div>

        <!-- <NuxtLink
          to="/home"
          class="flex items-center"
          v-if="checkRoles(['rbac:home-access'])"
        >
          <i class="pi pi-home text-[20px] mr-2" />
          <p class="font-inter font-bold text-[15px]">Home</p>
        </NuxtLink>
        <NuxtLink
          to="/create-user"
          class="flex items-center ml-5"
          v-if="checkRoles(['rbac:user-create'])"
        >
          <i class="pi pi-user-plus text-[20px] mr-2" />
          <p class="font-inter font-bold text-[15px]">Create User</p>
        </NuxtLink>
        <NuxtLink
          to="/user-list"
          class="flex items-center ml-5"
          v-if="checkRoles(['rbac:user-view'])"
        >
          <i class="pi pi-users text-[20px] mr-2" />
          <p class="font-inter font-bold text-[15px]">User List</p>
        </NuxtLink> -->
      </div>

      <div class="flex items-center cursor-pointer" @click="toggle">
        <img
          class="inline-block h-[32px] w-[32px] rounded-full ring-2 ring-white"
          src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
        <div class="ml-2 mr-2">
          <p class="font-inter font-bold text-[15px]">{{ dataUser.name }}</p>
        </div>

        <i class="pi pi-angle-down text-[#525252]"></i>
      </div>
    </div>
    <Popover ref="op" @click="logout()">Logout</Popover>
    <main
      class="flex-grow p-4 transition-all duration-300 ml-2 overflow-y-auto pb-20"
    >
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
const { $keycloak } = useNuxtApp();
const keycloak = $keycloak as any;
const storeAuth = useAuthStore();
const { isPermission } = usePermission();
const op = ref();

const toggle = (event: any) => {
  op.value.toggle(event);
};

interface User {
  email: string;
  name: string;
}

const dataUser = ref<User>({ email: "", name: "" });

dataUser.value = keycloak.tokenParsed as User;

const listMenu = [
  {
    name: "Home",
    path: "/home",
    icon: "pi-home",
    permission: ["rbac:home-access"],
  },
  {
    name: "Create User",
    path: "/create-user",
    icon: "pi-user-plus",
    permission: ["rbac:user-create"],
  },
  {
    name: "User List",
    path: "/user-list",
    icon: "pi-users",
    permission: ["rbac:user-view"],
  },
];

const logout = () => {
  const keycloak = $keycloak as any;
  keycloak.logout({ redirectUri: `${window.location.origin}/` }).then(() => {
    //remove accessToken and refreshToken from cookie with useCookies
    storeAuth.setTokens("", "");
  });
};
</script>

<style lang="scss">
.active {
  color: red;
}
</style>
