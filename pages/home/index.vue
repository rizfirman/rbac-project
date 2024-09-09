<template>
  <div class="flex justify-center items-center">
    <div>
      <div class="flex justify-center items-center">
        <p>{{ `This is a ${name} home page` }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'main-layout',
});

import { useAuthStore } from '~/stores/auth';

const storeAuth = useAuthStore();
const name = storeAuth.roleName;
</script>
