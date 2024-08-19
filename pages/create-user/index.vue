<template>
  <div class="flex justify-center items-center">
    <div class="bg-white rounded-lg p-4 w-[520px]">
      <div class="flex justify-center">
        <p class="text-xl font-bold">Create User</p>
      </div>
      <div class="mt-3">
        <InputText type="text" placeholder="Username" class="w-full" />
      </div>

      <div class="mt-3">
        <InputText id="password" type="password" placeholder="Password" class="w-full" />
      </div>
      <div class="mt-3">
        <InputText id="password" type="email" placeholder="Email" class="w-full" />
      </div>

      <div class="flex justify-center mt-2">
        <Button label="Send data!" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'main-layout',
});
</script>
