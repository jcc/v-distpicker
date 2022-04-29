<template>
  <div class="container">
    <logo></logo>
    <get-start></get-start>
    <usage></usage>
    <attributes></attributes>
    <methods></methods>
    <footbar></footbar>
  </div>
</template>
<script setup>
import Logo from './components/Logo'
import GetStart from './components/GetStart'
import Usage from './components/Usage'
import Attributes from './components/Attributes'
import Methods from './components/Methods'
import Footbar from './components/Footer'
</script>
<style lang="scss">
@import './css/styles.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
