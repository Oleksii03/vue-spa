import { ref } from 'vue';
import { defineStore } from 'pinia';

import * as turf from '@turf/turf';
import axios from 'axios';
import { NOMINATIM_BASE_URL } from '@/modules/places/constants/index.js';

export const usePlacesStore = defineStore('places', () => {
  const places = ref([]);

  async function getPlacesInPolygon(features) {
    const partialFeatures = features.slice(0, 2);

    for (let i = 0; i < partialFeatures.length; i++) {
      const feature = partialFeatures[i];
      const [lon, lat] = turf.center(feature).geometry.coordinates;

      // if (i > 0) await new Promise(resolve => setTimeout(resolve, 1500));

      try {
        const { data } = await axios.get(NOMINATIM_BASE_URL, {
          params: {
            format: 'json',
            lat: lat,
            lon: lon,
          },
          headers: {
            'Accept-Language': 'uk',
          },
        });

        places.value.push({
          country: data.address.country,
          state: data.address.state,
          name: data.name,
          place_id: data.place_id,
        });
      } catch (err) {
        console.log('Помилка запиту:', err);
      }
    }
  }

  return { places, getPlacesInPolygon };
});
