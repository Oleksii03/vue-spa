<script setup>
  import { onMounted } from 'vue';
  import polygons from '@/modules/places/data/polygons.json';
  import { convertToGeoJSON } from '@/modules/places/utils/geoJsonConverter';
  import { usePlacesStore } from '@/modules/places/stores/placesStore';
  import PlaceCard from './PlaceCard.vue';

  const { features } = convertToGeoJSON(polygons);

  const { places, getPlacesInPolygon } = usePlacesStore();

  console.log(places);

  onMounted(async () => await getPlacesInPolygon(features));
</script>

<template>
  <div>
    <ul class="place-list">
      <PlaceCard
        v-for="place in places"
        :key="place.place_id"
        :place="place" />
    </ul>
  </div>
</template>

<style scoped>
  .place-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>
