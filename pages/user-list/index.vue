<template>
  <div class="flex justify-center items-center">
    <div class="bg-white rounded-lg p-4">
      <div class="card">
        <DataTable :value="userList" tableStyle="min-width: 50rem">
          <Column field="name" header="Name" class="w-full"></Column>
          <Column field="email" header="Email"></Column>
          <Column header="Action">
            <template #body="{ data }">
              <div class="card flex justify-center">
                <div class="flex items-center gap-2">
                  <i class="pi pi-times-circle text-red-500 cursor-pointer" />
                  <i class="pi pi-user-edit text-green-500 cursor-pointer" @click="handleShowDialogEdit(data)" />
                </div>
              </div>
            </template>
          </Column>
        </DataTable>
        <Dialog v-model:visible="visible" modal :header="`Edit User ${userId}`" :style="{ width: '25rem' }">
          <span class="text-surface-500 dark:text-surface-400 block mb-8">Update your information.</span>
          <div class="flex items-center gap-4 mb-4">
            <label for="username" class="font-semibold w-24">Username</label>
            <InputText id="username" class="flex-auto" autocomplete="off" />
          </div>
          <div class="flex items-center gap-4 mb-2">
            <label for="email" class="font-semibold w-24">Email</label>
            <InputText id="email" class="flex-auto" autocomplete="off" />
          </div>
          <div class="flex items-center gap-4 mb-2">
            <label for="password" class="font-semibold w-24">Password</label>
            <InputText id="password" class="flex-auto" autocomplete="off" />
          </div>
          <template #footer>
            <Button label="Cancel" text severity="secondary" @click="visible = false" autofocus />
            <Button label="Save" outlined severity="secondary" @click="visible = false" autofocus />
          </template>
        </Dialog>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'main-layout',
});

const { useIFetch } = useFetchData();
const visible = ref(false);
const userId = ref(null);
const userData = ref(null);
interface ResponseData {
  id: string;
  name: string;
  email: string;
  password: string;
}
const userList = ref<ResponseData[]>([]);

const handleShowDialogEdit = (data: any) => {
  userId.value = data.id;
  userData.value = data;
  if (data.id === userId.value) {
    visible.value = true;
  }
};

const getUserList = async () => {
  try {
    const response = await useIFetch('/user', {
      method: 'GET',
    });
    userList.value = response.data.value as ResponseData[];
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getUserList();
});
// const userList = ref([
//   {
//     id: 1,
//     name: 'John Doe',
//     email: 'johndoe@gmail.com',
//   },
//   {
//     id: 2,
//     name: 'Jane Doe',
//     email: 'jane@gmail.com',
//   },
//   {
//     id: 3,
//     name: 'John Smith',
//     email: 'johnsmith@gmail.com',
//   },
//   {
//     id: 4,
//     name: 'Jane Smith',
//     email: 'janesmith@gmail.com',
//   },
// ]);
</script>
