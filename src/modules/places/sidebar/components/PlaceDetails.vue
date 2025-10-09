<script setup>
  import { usePlacesStore } from '@/modules/places/stores/placesStore';
  const placesStore = usePlacesStore();
</script>

<template>
  <div class="details">
    <h2 class="details__title">{{ placesStore.selectedPlace.name }}</h2>
    <ul class="details__list">
      <li>Область: {{ placesStore.selectedPlace.state }}</li>
      <li>Країна: {{ placesStore.selectedPlace.country }}</li>
      <li v-if="placesStore.selectedGeometry?.type">Тип геометрії: {{ placesStore.selectedGeometry.type }}</li>
      <li v-if="placesStore.selectedPlace.place_id">place_id: {{ placesStore.selectedPlace.place_id }}</li>
    </ul>
    <button class="details__back" @click="placesStore.clearSelection()">Назад</button>
  </div>
</template>

<style lang="scss" scoped>
  @use '@/assets/styles/utils/variables.scss' as *;

  .details {
    color: $bg-light;

    &__title {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 10px;
    }

    &__list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 20px;
    }

    &__back {
      padding: 8px 12px;
      border-radius: 4px;
      background-color: $bg-gray;
      color: $bg-dark;
    }
  }
</style>