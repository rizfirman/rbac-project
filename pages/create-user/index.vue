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
      <div class="mt-3">
        <label for="multiple-ac-1" class="font-bold mb-2 block">Permission List</label>
        <MultiSelect
          v-model="permissions"
          :options="permissionList"
          optionLabel="name"
          optionValue="name"
          filter
          placeholder="Select Permission"
          :maxSelectedLabels="3"
          class="w-full"
        />
      </div>
      <div class="flex justify-center mt-2">
        <Button label="Send data!" @click="createUser" />
      </div>
    </div>
    <Toast />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'main-layout',
});

const { useIFetch } = useFetchData();

const toast = useToast();

const username = ref('');
const password = ref('');
const email = ref('');
const permissions = ref(null);

const permissionList = ref([]);

watch(permissions, (value) => {
  console.log(value);
});

const getPermissionList = async () => {
  try {
    const response = await useIFetch('/admin/permissions?name=rbac', {
      method: 'GET',
    });
    const value = response.data.value as any;
    permissionList.value = value.data as any;
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

const createUser = async () => {
  try {
    const response = await useIFetch('/user', {
      method: 'POST',
      body: {
        name: username.value,
        password: password.value,
        email: email.value,
        permissions: permissions.value,
      },
    });
    console.log('payload', {
      name: username.value,
      password: password.value,
      email: email.value,
      permissions: permissions.value,
    });
    console.log(response);
    if (response.status.value === 'success') {
      toast.add({ severity: 'success', summary: 'Success!', detail: 'Success add new data', life: 3000 });
    } else {
      toast.add({ severity: 'error', summary: 'Error!', detail: 'Failed add new data', life: 3000 });
    }
    username.value = '';
    password.value = '';
    email.value = '';
    permissions.value = null;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getPermissionList();
});
</script>
