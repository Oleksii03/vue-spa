<script setup>
  defineProps({ place: Object });
</script>

<template>
  <li class="place-card">
    <div class="place-card__content">
      <h3 class="place-card__title">{{ place.name }}</h3>
      <p class="place-card__state">{{ place.state }}</p>
      <p class="place-card__country">{{ place.country }}</p>
    </div>
  </li>
</template>

<style lang="scss" scoped>
  @use '@/assets/styles/utils/variables.scss' as *;

  .place-card {
    padding: 10px;
    border: 2px solid $bg-gray;
    border-radius: 5px;
    color: $bg-light;
  }
</style>
