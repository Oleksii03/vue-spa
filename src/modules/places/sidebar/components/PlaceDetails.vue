<script setup>
  import { usePlacesStore } from '@/modules/places/stores/placesStore';
  import { inject } from 'vue';
  const placesStore = usePlacesStore();

  const activeSidebar = inject('active-sidebar');
</script>

<template>
  <div :class="['details', { active: !activeSidebar }]">
    <h2 class="details__title">{{ placesStore.selectedPlace.name }}</h2>
    <ul class="details__list">
      <li>Область: {{ placesStore.selectedPlace.state }}</li>
      <li>Країна: {{ placesStore.selectedPlace.country }}</li>
      <li v-if="placesStore.selectedGeometry?.type">
        Тип геометрії: {{ placesStore.selectedGeometry.type }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  @use '@/assets/styles/utils/variables.scss' as *;

  .details {
    background-color: $bg-gray;
    padding: 20px;
    border-radius: 5px;
    color: $bg-dark;
    font-weight: 600;
    opacity: 1;
    transition: opacity 0.5s linear;

    &.active {
      opacity: 0;
    }

    &__title {
      font-size: 20px;
      margin-bottom: 20px;
    }

    &__list {
      display: flex;
      flex-direction: column;
      gap: 15px;
      margin-bottom: 20px;
    }
  }
</style>
