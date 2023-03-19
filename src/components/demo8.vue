<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Roll } from '../lib/number-roll';
import buttonVue from './button.vue'
const $ = s => document.querySelector(s)

const randomNumber = 90000000000000;
let numberRollInstance = null;

const generateRandomNumber = () => {
  let count = Math.floor(Math.random() * randomNumber);
  numberRollInstance.rollTo({
    to: count,
    direct: true
  })
};

onMounted(() => {
  numberRollInstance = new Roll({
    node: $('#number-8'),
    from: randomNumber,
    systemArr: ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  });
});

</script>

<template>
  <div class="number-box">
    <div id="number-8" class="number"></div>
    <buttonVue @click="generateRandomNumber">转换字符</buttonVue>
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
    font-size: 32px;
    font-weight: bold;
    margin-right: 10px;
  }
}
</style>