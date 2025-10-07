<script setup>
  import { ref } from 'vue';

  const activeBtn = ref(false);
  const emit = defineEmits(['toggle-sidebar']);
</script>

<template>
  <div class="header">
    <h1 class="header__title">TerraView</h1>

    <button
      class="header__menu-btn"
      @click="
        activeBtn = !activeBtn;
        emit('toggle-sidebar');
      ">
      <span
        v-for="i of 3"
        :key="i"
        :class="['header__menu-btn-icon', { active: activeBtn }]"></span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
  @use '@/assets/styles/utils/variables.scss' as *;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__title {
      font-size: 24px;
      font-weight: 600;
      color: $bg-light;
    }

    &__menu-btn {
      position: relative;
      width: 30px;
      height: 20px;

      &-icon {
        position: absolute;
        left: 0;
        width: 100%;
        height: 3px;
        background-color: $bg-light;
        transition:
          transform 0.3s ease-in-out,
          opacity 0.3s ease-in-out,
          width 0.3s ease-in-out;

        &:nth-child(1) {
          top: 0;
          transform-origin: top right;
        }
        &:nth-child(2) {
          top: 50%;
          transform: translateY(-50%);
        }
        &:nth-child(3) {
          bottom: 0;
          transform-origin: bottom right;
        }

        &.active {
          width: 85%;
          border-radius: 2px;
          &:nth-child(1) {
            transform: rotate(-45deg);
          }
          &:nth-child(2) {
            opacity: 0;
          }
          &:nth-child(3) {
            transform: rotate(45deg);
          }
        }
      }
    }
  }
</style>
