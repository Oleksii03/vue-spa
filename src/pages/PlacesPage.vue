<script setup>
  import MainLayout from '@/layouts/MainLayout.vue';
  import { PlacesSidebar, PlacesMap } from '@/modules/places';
  import { ref } from 'vue';

  const activeSidebar = ref(false);
</script>

<template>
  <MainLayout :active-sidebar="activeSidebar">
    <template #sidebar>
      <PlacesSidebar
        @toggle-sidebar="activeSidebar = !activeSidebar"
        :active-sidebar="activeSidebar" />
    </template>

    <template #main>
      <PlacesMap :active-sidebar="activeSidebar" />
    </template>
  </MainLayout>
</template>

<style scoped></style>
