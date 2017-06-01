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

<script>
import Logo from './components/Logo'
import GetStart from './components/GetStart'
import Usage from './components/Usage'
import Attributes from './components/Attributes'
import Methods from './components/Methods'
import Footbar from './components/Footer'
import './css/styles.css'

export default {
  components: {
    Logo,
    GetStart,
    Usage,
    Attributes,
    Methods,
    Footbar,
  },
}
</script>
