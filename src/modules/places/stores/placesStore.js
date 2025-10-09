import { ref } from 'vue';
import { defineStore } from 'pinia';
import * as turf from '@turf/turf';
import axios from 'axios';
import { buildReverseUrl, buildSearchUrl } from '@/modules/places/constants/index.js';

export const usePlacesStore = defineStore('places', () => {
  const places = ref([]);
  const features = ref([]);
  const selectedPlace = ref(null);
  const selectedGeometry = ref(null);

  const reverseCache = new Map();
  const detailCache = new Map();

  function setFeatures(f) {
    features.value = Array.isArray(f) ? f : [];
  }

  async function getPlacesInPolygon(f) {
    places.value = [];

    const feats = Array.isArray(f) ? f : features.value;
    if (!Array.isArray(feats) || feats.length === 0) return;

    for (let i = 0; i < feats.length; i++) {
      const [lon, lat] = turf.center(feats[i]).geometry.coordinates;
      const cacheKey = `${lat},${lon}`;

      try {
        if (reverseCache.has(cacheKey)) {
          places.value.push(reverseCache.get(cacheKey));
          continue;
        }

        const url = buildReverseUrl({ lat, lon, format: 'json', lang: 'uk' });
        const { data } = await axios.get(url);

        const place = {
          country: data.address?.country,
          state: data.address?.state,
          name: data.name || data.display_name,
          place_id: data.place_id,
        };

        reverseCache.set(cacheKey, place);
        places.value.push(place);
      } catch (err) {
        console.log('Помилка запиту:', err);
      }
    }
  }

  async function selectPlace(place) {
    if (!place) return;

    selectedPlace.value = place;

    try {
      const cached = detailCache.get(place.place_id);
      if (cached) {
        selectedGeometry.value = cached.geojson || cached.geometry || null;
        return;
      }

      const query = [place.name, place.state, place.country].filter(Boolean).join(', ');
      const url = buildSearchUrl({
        q: query,
        format: 'json',
        lang: 'uk',
        polygon_geojson: 1,
        limit: 1,
      });
      const { data } = await axios.get(url);

      const item = Array.isArray(data) ? data[0] : null;
      if (item) {
        selectedGeometry.value = item.geojson || item.geometry || null;
        detailCache.set(place.place_id, item);
      } else {
        selectedGeometry.value = null;
      }
    } catch (err) {
      console.log('Помилка запиту детальної інформації:', err);
      selectedGeometry.value = null;
    }
  }

  function clearSelection() {
    selectedPlace.value = null;
    selectedGeometry.value = null;
  }

  return {
    places,
    features,
    selectedPlace,
    selectedGeometry,
    setFeatures,
    getPlacesInPolygon,
    selectPlace,
    clearSelection,
  };
});
