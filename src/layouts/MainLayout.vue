<script setup></script>

<template>
  <div class="wrapper">
    <div class="sidebar">
      <slot name="sidebar" />
    </div>

    <main class="content">
      <slot name="main" />
    </main>
  </div>
</template>

<style lang="scss" scoped>
  .wrapper {
    display: flex;
    height: 100dvh;
  }

  .content {
    background-color: #0c4fb3;
    width: 100%;
    height: 100%;
  }
</style>
