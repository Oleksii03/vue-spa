import { ref } from 'vue';
import { defineStore } from 'pinia';
import * as turf from '@turf/turf';
import axios from 'axios';
import { buildReverseUrl } from '@/modules/places/constants/index.js';

export const usePlacesStore = defineStore('places', () => {
  const places = ref([]);

  console.log(places.value.length);

  async function getPlacesInPolygon(features) {
    places.value = [];

    for (let i = 0; i < features.length; i++) {
      if (places.value.length >= features.length) break;

      const [lon, lat] = turf.center(features[i]).geometry.coordinates;

      try {
        const url = buildReverseUrl({ lat, lon, format: 'json', lang: 'uk' });
        const { data } = await axios.get(url);

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
