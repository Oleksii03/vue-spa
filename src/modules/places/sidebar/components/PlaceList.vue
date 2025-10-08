<script setup>
  import { ref, onMounted } from 'vue';
  import * as turf from '@turf/turf';
  import polygons from '@/modules/places/data/polygons.json';
  import { convertToGeoJSON } from '@/modules/places/utils/geoJsonConverter';
  import Nominatim from 'nominatim-browser';

  const { features } = convertToGeoJSON(polygons);
  const places = ref([]);

  async function getPlacesInPolygon() {
    const partialFeatures = features.slice(0, 3);

    for (let i = 0; i < partialFeatures.length; i++) {
      const feature = partialFeatures[i];
      const [lon, lat] = turf.center(feature).geometry.coordinates;

      if (i > 0) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      try {
        const data = await Nominatim.reverse({
          lat,
          lon,
          zoom: 10,
          addressdetails: 1,
        });

        places.value.push(data);
      } catch (err) {
        console.log('Помилка запиту:', err);
      }
    }
  }

  onMounted(() => getPlacesInPolygon());
</script>

<template>
  <div>
    <h2>Отримані місця:</h2>
    <ul>
      <li
        v-for="(place, index) in places"
        :key="index">
        {{ place.display_name }}
      </li>
    </ul>
  </div>
</template>
