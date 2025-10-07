<script setup>
  import { ref } from 'vue';
  import PlaceHeader from './components/PlaceHeader.vue';

  const activeSidebar = ref(false);
</script>

<template>
  <aside
    :class="['sidebar', { active: activeSidebar }]"
    @click="activeSidebar = !activeSidebar">
    <div class="sidebar__container">
      <PlaceHeader />
    </div>
  </aside>
</template>

<style lang="scss" scoped>
  @use '@/assets/styles/utils/variables.scss' as *;

  .sidebar {
    background-color: $bg-dark;
    height: 100%;
    width: 250px;
    transform: translateX(0);
    transition: transform 0.3s ease-in-out;

    &.active {
      transform: translateX(calc(-100% + 50px));
    }

    @media (min-width: $sm) {
      width: 350px;
    }

    &__container {
      height: 100%;
      width: 100%;
      padding: 20px 15px;
      margin: 0 auto;
    }
  }
</style>
