<template>
  <div class="h-screen flex justify-center items-center">
    <div class="bg-white rounded-lg p-8">
      <div class="flex justify-center">
        <i class="pi pi-shield text-[50px]" />
      </div>
      <div class="mt-3">
        <InputText type="text" placeholder="Username" />
      </div>

      <div class="mt-3">
        <InputText id="password" type="password" placeholder="Password" />
      </div>

      <div class="flex justify-center mt-2">
        <Button label="Submit" />
      </div>
    </div>
  </div>
</template>
