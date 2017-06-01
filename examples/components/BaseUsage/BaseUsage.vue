<template>
  <div class="block">
    <h4 class="text-center">Base Usage</h4>
    <basic></basic>
    <placeholders></placeholders>
    <default-value></default-value>
    <hide-area></hide-area>
    <only-province></only-province>
    <trigger-event></trigger-event>
    <reset-button></reset-button>
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

export default {
  components: {
    Basic,
    Placeholders,
    DefaultValue,
    HideArea,
    OnlyProvince,
    TriggerEvent,
    ResetButton,
  },
}
</script>
