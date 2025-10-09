<script setup>
  import PlaceHeader from './components/PlaceHeader.vue';
  import PlaceList from './components/PlaceList.vue';
  import PlaceDetails from './components/PlaceDetails.vue';
  import { usePlacesStore } from '@/modules/places/stores/placesStore';

  const emit = defineEmits(['toggle-sidebar']);
  defineProps({ activeSidebar: Boolean });

  const placesStore = usePlacesStore();
</script>

<template>
  <aside :class="['sidebar', { active: activeSidebar }]">
    <div class="sidebar__container">
      <PlaceHeader @toggle-sidebar="emit('toggle-sidebar')" />

      <template v-if="!placesStore.selectedPlace">
        <PlaceList />
      </template>

      <template v-else>
        <PlaceDetails />
      </template>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
  @use '@/assets/styles/utils/variables.scss' as *;

  .sidebar {
    background-color: $bg-dark;
    height: 100%;
    width: 250px;
    transform: translateX(calc(-100% + 55px));

    transition: transform 0.5s linear;

    &.active {
      transform: translateX(0);
    }

    @media (min-width: $sm) {
      width: 350px;
    }

    &__container {
      height: 100%;
      width: 100%;
      padding: 20px 15px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  }

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
