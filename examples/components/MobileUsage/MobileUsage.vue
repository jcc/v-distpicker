<template>
  <div class="block">
    <h4 class="text-center">Mobile Usage</h4>
    <basic></basic>
    <static-placeholder></static-placeholder>
    <default-value></default-value>
    <hide-area></hide-area>
    <only-province></only-province>
    <trigger-event></trigger-event>
  </div>
</template>

<script>
import Basic from './Basic'
import StaticPlaceholder from './StaticPlaceholder'
import DefaultValue from './DefaultValue'
import HideArea from './HideArea'
import OnlyProvince from './OnlyProvince'
import TriggerEvent from './TriggerEvent'

export default {
  components: {
    Basic,
    StaticPlaceholder,
    DefaultValue,
    HideArea,
    OnlyProvince,
    TriggerEvent,
  },
}
</script>
