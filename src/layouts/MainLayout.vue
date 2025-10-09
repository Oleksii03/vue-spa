<script setup>
  defineProps({
    activeSidebar: {
      type: Boolean,
      default: false,
    },
  });
</script>

<template>
  <div :class="['wrapper', { active: activeSidebar }]">
    <div class="sidebar-wrapper">
      <slot name="sidebar" />
    </div>

    <main class="content-wrapper">
      <slot name="main" />
    </main>
  </div>
</template>

<style lang="scss" scoped>
  @use '@/assets/styles/utils/variables.scss' as *;

  .wrapper {
    display: grid;
    grid-template-columns: 52px 1fr;
    height: 100dvh;
    transition: grid-template-columns 0.5s linear;

    &.active {
      grid-template-columns: 250px 1fr;

      @media (min-width: $sm) {
        grid-template-columns: 350px 1fr;
      }
    }
  }

  .content-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
