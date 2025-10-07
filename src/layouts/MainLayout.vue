<script setup>
  import { ref } from 'vue';

  const activeSidebar = ref(false);
</script>

<template>
  <div class="wrapper">
    <div :class="['sidebar-wrapper', { active: activeSidebar }]">
      <slot name="sidebar" />
    </div>

    <main class="content-wrapper">
      <slot name="main" />
    </main>
  </div>
</template>

<style lang="scss" scoped>
  .wrapper {
    display: flex;
    width: 100%;
    height: 100dvh;
  }

  .sidebar-wrapper {
    background-color: #000;
    transition: width 0.3s ease-in-out;

    &.active {
      width: 50px;
    }
  }

  .content-wrapper {
    width: 100%;
    height: 100%;
  }
</style>
