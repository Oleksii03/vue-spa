<script setup>
  import { ref, computed, onMounted, inject } from 'vue';
  import polygons from '@/modules/places/data/polygons.json';
  import { convertToGeoJSON } from '@/modules/places/utils/geoJsonConverter';
  import { usePlacesStore } from '@/modules/places/stores/placesStore';
  import PlaceCard from './PlaceCard.vue';
  import PlaceSearchBar from './PlaceSearchBar.vue';

  const { features } = convertToGeoJSON(polygons);
  const placesStore = usePlacesStore();

  const searchQuery = ref('');
  const isLoading = ref(false);
  const activeSidebar = inject('active-sidebar');

  const filteredPlaces = computed(() => {
    const query = searchQuery.value.toLowerCase();
    if (query.length < 2) return placesStore.places;
    return placesStore.places.filter(place => (place?.name || '').toLowerCase().includes(query));
  });

  onMounted(async () => {
    isLoading.value = true;
    try {
      placesStore.setFeatures(features);
      await placesStore.getPlacesInPolygon(features);
    } catch (err) {
      console.error('Помилка завантаження місць:', err);
    } finally {
      isLoading.value = false;
    }
  });

  function onSelect(place) {
    placesStore.selectPlace(place);
  }
</script>

<template>
  <div :class="['place-body', { active: activeSidebar }]">
    <PlaceSearchBar
      v-model.trim="searchQuery"
      :is-loading="isLoading" />

    <div class="loading-message">
      <p v-if="isLoading">Завантаження даних...</p>
      <p v-else>Знайдено місць: {{ filteredPlaces.length }}</p>
      <p>Пошуковий запит: {{ searchQuery }}</p>
    </div>

    <ul class="place-list">
      <PlaceCard
        v-for="place in filteredPlaces"
        :key="place.place_id"
        :place="place"
        @click="onSelect(place)" />
    </ul>
  </div>
</template>

<style scoped>
  .place-body {
    opacity: 0;
    pointer-events: none;

    transition: opacity 0.5s linear;

    &.active {
      opacity: 1;
      pointer-events: auto;
    }
  }

  .place-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    list-style: none;
    padding: 0;
    height: calc(100vh - 300px);
    overflow-y: auto;
    border-radius: 5px;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .loading-message {
    margin: 15px 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>
