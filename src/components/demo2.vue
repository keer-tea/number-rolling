<script setup lang="ts">
import { ref, watchEffect, onMounted } from 'vue';
import {Roll} from '../lib/number-rolling'
import buttonVue from './button.vue'
const $ = s => document.querySelector(s)

let numberRollInstance = null as Roll
let count = 0

onMounted(() => {
  numberRollInstance = new Roll({
    node: $('#number-2'),
    from: 999999999999999,
    to: 0,
    // separator: '-',
    // separateOnly 和 separateEvery 只有一个能生效
    // separateOnly 优先级较高
    // separateOnly: 2,
    // separateEvery: 2,
    direct: true,
    easeFn: function(pos) {
      if ((pos/=0.5) < 1) return 0.5*Math.pow(pos,3);
      return 0.5 * (Math.pow((pos-2),3) + 2);
    },
    // systemArr: ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  })
})

function add () {
  count += 100
  numberRollInstance.rollTo({
    to:  count,
    direct: false
  })
}

</script>
<template>
  <div class="number-box">
    <div id="number-2" class="number"></div>
    <buttonVue @click="add">加</buttonVue>
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