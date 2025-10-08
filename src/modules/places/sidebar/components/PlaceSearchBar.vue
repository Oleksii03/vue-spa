<script setup>
  defineProps({
    modelValue: String,
    isLoading: Boolean,
  });
  defineEmits(['update:modelValue']);
</script>

<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    placeholder="Пошук місць..."
    :disabled="isLoading" />
</template>

<style lang="scss" scoped>
  @use '@/assets/styles/utils/variables.scss' as *;

  input {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border-radius: 4px;
  }

  input:disabled {
    background-color: $bg-light;
    cursor: not-allowed;
  }
</style>
