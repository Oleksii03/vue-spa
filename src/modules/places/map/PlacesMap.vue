<script setup>
  import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet';
  import { ref } from 'vue';
  import L from 'leaflet';
  import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
  import markerIcon from 'leaflet/dist/images/marker-icon.png';
  import markerShadow from 'leaflet/dist/images/marker-shadow.png';

  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
  });

  const zoom = ref(13);
  const center = ref([50.4501, 30.5234]); // Київ
</script>

<template>
  <l-map
    v-model:zoom="zoom"
    :center="center"
    :use-global-leaflet="false">
    <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    <l-marker :lat-lng="center" />
  </l-map>
</template>

<style>
  .l-map {
    height: 100%;
    width: 100%;
  }
</style>
