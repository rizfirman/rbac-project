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
                  <i class="pi pi-times-circle text-red-500 cursor-pointer" @click="handleShowDialogDelete(data)" />
                  <i class="pi pi-user-edit text-green-500 cursor-pointer" @click="handleShowDialogEdit(data)" />
                </div>
              </div>
            </template>
          </Column>
        </DataTable>
        <Dialog v-model:visible="visibleDialogEdit" modal header="Edit User" :style="{ width: '25rem' }">
          <span class="text-surface-500 dark:text-surface-400 block mb-8">Update your information.</span>
          <div class="flex items-center gap-4 mb-4">
            <label for="username" class="font-semibold w-24">Username</label>
            <InputText v-model="userData.name" id="username" class="flex-auto" autocomplete="off" />
          </div>
          <div class="flex items-center gap-4 mb-2">
            <label for="email" class="font-semibold w-24">Email</label>
            <InputText v-model="userData.email" id="email" class="flex-auto" autocomplete="off" />
          </div>
          <!-- <div class="flex items-center gap-4 mb-2">
            <label for="password" class="font-semibold w-24">Password</label>
            <InputText
              v-model="userData.password"
              type="password"
              id="password"
              class="flex-auto"
              autocomplete="off"
            />
          </div> -->
          <template #footer>
            <Button label="Cancel" text severity="secondary" @click="visibleDialogEdit = false" autofocus />
            <Button label="Save" outlined severity="secondary" @click="updateUser(userData.id)" autofocus />
          </template>
        </Dialog>
        <Dialog v-model:visible="visibleDialogDelete" modal header="Hapus User" class="w-[400px]">
          <p>Apakah Anda yakin ingin menghapus data ini?</p>
          <p class="font-bold">{{ userData.id }} - {{ userData.name }}</p>
          <template #footer>
            <Button label="Cancel" text severity="secondary" @click="visibleDialogDelete = false" autofocus />
            <Button label="Save" outlined severity="secondary" @click="deleteUser(userData.id)" autofocus />
          </template>
        </Dialog>
      </div>
      <Toast />
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'main-layout',
});

const { useIFetch } = useFetchData();
const toast = useToast();
const visibleDialogEdit = ref(false);
const visibleDialogDelete = ref(false);
const userId = ref(null);
interface ResponseData {
  id: string;
  name: string;
  email: string;
  password: string;
}
const userList = ref<ResponseData[]>([]);
const userData = ref({
  id: '',
  name: '',
  email: '',
  password: '',
});

const handleShowDialogEdit = (data: any) => {
  userId.value = data.id;
  userData.value = data;
  if (data.id === userId.value) {
    visibleDialogEdit.value = true;
  }
};

const handleShowDialogDelete = (data: any) => {
  userId.value = data.id;
  userData.value = data;
  if (data.id === userId.value) {
    visibleDialogDelete.value = true;
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

const deleteUser = async (idUser: string) => {
  try {
    const response = await useIFetch(`/user/${idUser}`, { method: 'DELETE' });
    if (response.status.value === 'success') {
      toast.add({
        severity: 'success',
        summary: 'Success!',
        detail: 'Success delete user',
        life: 3000,
      });
    } else {
      toast.add({
        severity: 'error',
        summary: 'Error!',
        detail: 'Error delete user',
        life: 3000,
      });
    }
  } catch (error) {
    console.error(error);
    toast.add({
      severity: 'error',
      summary: 'Error!',
      detail: 'Error delete user',
      life: 3000,
    });
  }
  visibleDialogDelete.value = false;
};

const updateUser = async (idUser: string) => {
  try {
    const response = await useIFetch(`/user/${idUser}`, {
      method: 'PATCH',
      body: {
        name: userData.value.name,
        email: userData.value.email,
        authId: userData.value.id, // perlu makesure id darimana
      },
    });
    if (response.status.value === 'success') {
      toast.add({
        severity: 'success',
        summary: 'Success!',
        detail: 'Success update user',
        life: 3000,
      });
    } else {
      toast.add({
        severity: 'error',
        summary: 'Error!',
        detail: 'Error update user',
        life: 3000,
      });
    }
  } catch (error) {
    console.error(error);
    toast.add({
      severity: 'error',
      summary: 'Error!',
      detail: 'Error update user',
      life: 3000,
    });
  }
  visibleDialogEdit.value = false;
};

onMounted(() => {
  getUserList();
});

const handleDelete = async (id: any) => {
  console.log(id);
  try {
    const response = await useIFetch(`/user/${id}`, {
      method: 'DELETE',
    });
    console.log(response);
    getUserList();
  } catch (error) {
    console.error(error);
  }
};
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
