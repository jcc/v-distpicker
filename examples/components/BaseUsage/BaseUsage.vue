<template>
  <div class="block">
    <h4 class="text-center">Base Usage</h4>
   <basic></basic>
    <placeholders></placeholders>
    <default-value></default-value>
    <only-area-code></only-area-code>
     <hide-area></hide-area>
    <only-province></only-province>
    <trigger-event></trigger-event>
    <reset-button></reset-button>
    <disabled></disabled>
     <data-source></data-source>
  </div>
</template>

<script>
import Basic from './Basic'
import Placeholders from './Placeholders'
import DefaultValue from './DefaultValue'
import HideArea from './HideArea'
import OnlyProvince from './OnlyProvince'
import TriggerEvent from './TriggerEvent'
import ResetButton from './ResetButton'
import Disabled from "./Disabled";
import DataSource from './DataSource'
import OnlyAreaCode from './OnlyAreaCode.vue'
export default {
  components: {
	  Disabled,
    Basic,
    Placeholders,
    DefaultValue,
    HideArea,
    OnlyProvince,
    TriggerEvent,
    ResetButton,
    DataSource,
    OnlyAreaCode
  },
}
</script>
