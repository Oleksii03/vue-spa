<script setup>
  import MainLayout from '@/layouts/MainLayout.vue';
  import { PlacesSidebar, PlacesMap } from '@/modules/places';
</script>

<template>
  <MainLayout>
    <template #sidebar>
      <PlacesSidebar />
    </template>

    <template #main>
      <PlacesMap />
    </template>
  </MainLayout>
</template>

<style scoped></style>
