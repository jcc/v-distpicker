<template>
  <footer>
    <div class="container text-center">
      <p class="heart"></p>
      <h4>{{ name }}：{{ version }} , {{ buildDataTime }}</h4>
      <p class="heart"></p>
      <nav>
        <a class="nav-link" href="https://github.com/jcc/v-distpicker" target="_blank">GitHub</a>
        <a class="nav-link" href="https://pigjian.com" target="_blank">About</a>
        <a class="nav-link" href="https://pigjian.com/donate" target="_blank">Donate</a>
      </nav>
    </div>
  </footer>
</template>
<script setup>
import { version,name } from '../../package.json'
const buildDataTime =new Date().toLocaleString()
</script>
