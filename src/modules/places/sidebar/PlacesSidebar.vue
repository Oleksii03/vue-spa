<script setup>
  import PlaceHeader from './components/PlaceHeader.vue';
  import PlaceList from './components/PlaceList.vue';

  const emit = defineEmits(['toggle-sidebar']);
  defineProps({ activeSidebar: Boolean });
</script>

<template>
  <aside :class="['sidebar', { active: activeSidebar }]">
    <div class="sidebar__container">
      <PlaceHeader @toggle-sidebar="emit('toggle-sidebar')" />
      <PlaceList />
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
    transition: transform 0.5s linear;

    &.active {
      transform: translateX(calc(-100% + 55px));
    }

    @media (min-width: $sm) {
      width: 350px;
    }

    &__container {
      height: 100%;
      width: 100%;
      padding: 20px 15px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  }
</style>
