<template>
  <div class="h-screen flex justify-center items-center">
    <div>
      <div class="flex justify-center items-center">
        <InputText type="text" v-model="textValue" class="w-full" />
        <Button label="Edit when you have access!" class="w-[500px] h-[40px] ml-2" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'main-layout',
});

const textValue = ref('lorem ipsum dolor');
</script>
