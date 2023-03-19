<script setup lang="ts">
import demo1 from './components/demo1.vue';
import demo2 from './components/demo2.vue';
import demo3 from './components/demo3.vue';
import demo4 from './components/demo4.vue';
import demo5 from './components/demo5.vue';
import demo6 from './components/demo6.vue';
import demo7 from './components/demo7.vue';
import demo8 from './components/demo8.vue';
import demo9 from './components/demo9.vue';
</script>
<template>
  <div class="page">
    <demo1></demo1>
    <demo2></demo2>
    <demo3></demo3>
    <demo4></demo4>
    <demo5></demo5>
    <demo6></demo6>
    <demo7></demo7>
    <demo8></demo8>
    <demo9></demo9>
  </div>
</template>
<style lang="scss">
html, body {
  padding: 0;
  margin: 0;
}

.page {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
  .number-box {
    flex-basis: 25%; /* 每行 1/4 */
    margin: 10px;
    @media (max-width: 768px) {
      flex-basis: 50% /* 每行 1/2 */
    }
    @media (max-width: 480px) {
      flex-basis: 100%; /* 每行 1/1 */
    }
  }
}

</style>
