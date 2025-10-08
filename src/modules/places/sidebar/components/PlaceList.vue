<script setup>
  import { onMounted } from 'vue';
  import polygons from '@/modules/places/data/polygons.json';
  import { convertToGeoJSON } from '@/modules/places/utils/geoJsonConverter';
  import { usePlacesStore } from '@/modules/places/stores/placesStore';

  const { features } = convertToGeoJSON(polygons);

  const { places, getPlacesInPolygon } = usePlacesStore();

  onMounted(async () => await getPlacesInPolygon(features));
</script>

<template>
  <div>
    <h2>Отримані місця:</h2>
    <ul>
      <li
        v-for="{ country, state, name, place_id } in places"
        :key="place_id">
        {{ country }} {{ state }} {{ name }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
  h2 {
    color: #d3cece;
  }
  ul {
    list-style-type: none;
    padding: 0;
    color: #d3cece;
  }
</style>
