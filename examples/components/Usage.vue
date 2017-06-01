<template>
  <div class="row">
    <div class="blocks">
      <h3 class="text-center mt-4">How to use</h3>
      <base-usage></base-usage>
      <mobile-usage class="mobile"></mobile-usage>
    </div>
  </div>
</template>

<script>
import BaseUsage from './BaseUsage/BaseUsage'
import MobileUsage from './MobileUsage/MobileUsage'

export default {
  components: {
    BaseUsage,
    MobileUsage,
  },
}
</script>
