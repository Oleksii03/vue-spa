<script setup>
  import { onMounted } from 'vue';
  import * as turf from '@turf/turf';
  import polygons from '@/modules/places/data/polygons.json';
  import { convertToGeoJSON } from '@/modules/places/utils/geoJsonConverter';

  const { features } = convertToGeoJSON(polygons);

  async function getPlacesInPolygon() {
    const partialFeatures = features.slice(0, 3);

    for (let i = 0; i < partialFeatures.length; i++) {
      const feature = partialFeatures[i];
      const [lon, lat] = turf.center(feature).geometry.coordinates;

      // Додаємо затримку між запитами (1 секунда)
      if (i > 0) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      fetch(
        'https://api.allorigins.win/raw?url=' +
          encodeURIComponent(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`
          )
      )
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => console.log('Помилка запиту:', error));
    }
  }

  // onMounted(() => getPlacesInPolygon());
</script>

<template>
  <div></div>
</template>

<style lang="scss" scoped></style>
