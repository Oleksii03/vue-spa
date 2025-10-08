import { ref } from 'vue';
import { defineStore } from 'pinia';
import * as turf from '@turf/turf';
import axios from 'axios';
import { NOMINATIM_BASE_URL } from '@/modules/places/constants/index.js';

export const usePlacesStore = defineStore('places', () => {
  const places = ref([]);

  console.log(places.value.length);

  async function getPlacesInPolygon(features) {
    places.value = [];

    for (let i = 0; i < features.length; i++) {
      if (places.value.length >= features.length) break;

      const [lon, lat] = turf.center(features[i]).geometry.coordinates;

      try {
        const { data } = await axios.get(NOMINATIM_BASE_URL, {
          params: {
            format: 'json',
            lat: lat,
            lon: lon,
          },
          headers: { 'Accept-Language': 'uk' },
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
