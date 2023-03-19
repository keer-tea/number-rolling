<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Roll } from '../lib/number-rolling';
import buttonVue from './button.vue'
const $ = s => document.querySelector(s)

const randomNumber = 123456789;
let numberRollInstance = null;

const generateRandomNumber = () => {
  let count = Math.floor(Math.random() * randomNumber);
  numberRollInstance.rollTo({
    to: count,
    direct: false
  })
};

onMounted(() => {
  numberRollInstance = new Roll({
    node: $('#number-9'),
    from: randomNumber,
    letterMargin: 7
  });
});

</script>

<template>
  <div class="number-box">
    <div id="number-9" class="number"></div>
    <buttonVue @click="generateRandomNumber">设置字体样式</buttonVue>
  </div>
</template>

<style lang="scss" scoped>
.number-box {
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #F5F5F5;
  border-radius: 10px;
  border: 2px solid #D3D3D3;
  .number {
    font-size: 40px;
    font-weight: bold;
    font-style: italic;
  }
}
</style>