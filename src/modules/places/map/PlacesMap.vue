<script setup>
  import { LMap, LTileLayer, LGeoJson } from '@vue-leaflet/vue-leaflet';
  import { ref, watch, onMounted } from 'vue';
  import L from 'leaflet';
  import { usePlacesStore } from '@/modules/places/stores/placesStore';

  const props = defineProps({
    activeSidebar: { type: Boolean, default: false },
  });

  const placesStore = usePlacesStore();

  const zoom = ref(6);
  const center = ref([48.3794, 31.1656]); // Центр України
  const mapRef = ref(null);

  function fitToFeatures(features) {
    if (!mapRef.value || !mapRef.value.leafletObject) return;
    try {
      const layer = L.geoJSON(features);
      const b = layer.getBounds();
      if (b && b.isValid()) mapRef.value.leafletObject.fitBounds(b, { padding: [20, 20] });
    } catch (error) {
      console.error('Error fitting map bounds:', error);
    }
  }

  function invalidateSizeWithDelay() {
    setTimeout(() => {
      if (mapRef.value && mapRef.value.leafletObject) mapRef.value.leafletObject.invalidateSize();
    }, 500);
  }

  onMounted(() => {
    if (placesStore.features && placesStore.features.length) {
      fitToFeatures({ type: 'FeatureCollection', features: placesStore.features });
    }
  });

  watch(
    () => props.activeSidebar,
    () => invalidateSizeWithDelay()
  );

  watch(
    () => placesStore.selectedGeometry,
    val => {
      if (val) {
        fitToFeatures(val);
      } else if (placesStore.features && placesStore.features.length) {
        fitToFeatures({ type: 'FeatureCollection', features: placesStore.features });
      }
    }
  );

  // Fit when features become available
  watch(
    () => placesStore.features,
    feats => {
      if (Array.isArray(feats) && feats.length && !placesStore.selectedGeometry) {
        fitToFeatures({ type: 'FeatureCollection', features: feats });
      }
    },
    { deep: true }
  );
</script>

<template>
  <l-map
    ref="mapRef"
    v-model:zoom="zoom"
    :center="center"
    :use-global-leaflet="false">
    <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

    <!-- Полігони -->
    <l-geo-json
      v-if="!placesStore.selectedGeometry && placesStore.features && placesStore.features.length"
      :geojson="{ type: 'FeatureCollection', features: placesStore.features }"
      :optionsStyle="
        feature => ({
          color: feature.properties.color,
          fillColor: feature.properties.fillColor,
          fillOpacity: feature.properties.fillOpacity,
          weight: feature.properties.weight,
          opacity: feature.properties.opacity,
        })
      " />

    <!-- Контур обраного населеного пункту -->
    <l-geo-json
      v-else-if="placesStore.selectedGeometry"
      :geojson="placesStore.selectedGeometry"
      :options="{ pane: 'overlayPane' }"
      :optionsStyle="() => ({ color: '#ff3b3b', weight: 3, opacity: 0.9, fillOpacity: 0 })" />
  </l-map>
</template>

<style></style>
