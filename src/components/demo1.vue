<script setup lang="ts">
import { ref, watchEffect, onMounted } from 'vue';
// import {Roll} from '../lib/number-roll'
import {Roll} from '../../dist/number-roll.js'
import buttonVue from './button.vue'
const $ = s => document.querySelector(s)

let numberRollInstance = null as Roll
let count = 1000000000

onMounted(() => {
  numberRollInstance = new Roll({
    node: $('#number-1'),
    from: 0,
    to: count,
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
    
  })
})

function minus () {
  count -= 100
  numberRollInstance.rollTo({
    to:  count,
    direct: false
  })
}

</script>
<template>
  <div class="number-box">
    <div id="number-1" class="number"></div>
    <buttonVue @click="minus">减</buttonVue>
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