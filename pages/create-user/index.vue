<template>
  <div class="flex justify-center items-center">
    <div class="bg-white rounded-lg p-4 w-[520px]">
      <div class="flex justify-center">
        <p class="text-xl font-bold">Create User</p>
      </div>
      <div class="mt-3">
        <InputText type="text" placeholder="Username" class="w-full" v-model="username" />
      </div>

      <div class="mt-3">
        <InputText id="password" type="password" placeholder="Password" class="w-full" v-model="password" />
      </div>
      <div class="mt-3">
        <InputText id="email" type="email" placeholder="Email" class="w-full" v-model="email" />
      </div>

      <div class="flex justify-center mt-2">
        <Button label="Send data!" @click="createUser" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { useIFetch } = useFetchData();
definePageMeta({
  layout: 'main-layout',
});

const username = ref('');
const password = ref('');
const email = ref('');

const createUser = async () => {
  try {
    const response = await useIFetch('/user', {
      method: 'POST',
      body: {
        name: username.value,
        password: password.value,
        email: email.value,
      },
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
</script>
