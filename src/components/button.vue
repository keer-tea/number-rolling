<script setup lang="ts">
import { computed } from 'vue';
import { randomGradientColor } from '../utils/colors';

const emit = defineEmits(['click'])

const style = computed(() => ({
  background: randomGradientColor()
}));

function click () {
  emit('click')
}
</script>
<template>
  <div class="button" :style="style" @click="click">
    <slot></slot>
  </div>
</template>
<style scoped>
  .button {
    padding: 10px;
    width: 70%;
    line-height: 46px;
    text-align: center;
    border-radius: 12px;
    color: #fff;
    font-size: 16px;
    margin-top: 20px;
    user-select: none;
  }
</style>