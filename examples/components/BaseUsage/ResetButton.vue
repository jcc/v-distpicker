<template>
  <div class="row">
    <div class="example">
      <h5>Reset Button</h5>
      <div class="example-box">
        <div class="box-left d-flex align-items-baseline">
          <div class="col-md-7">
            <button class="btn btn-primary reset" @click="reset">Reset</button>
            <v-distpicker :province="select.province" :city="select.city" :area="select.area" @province="selectProvince" @city="selectCity" @area="selectArea"></v-distpicker>
          </div>
          <div class="content-show col-md-5">
            <pre><code>{{ select }}</code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VDistpicker from '../../../src/Distpicker'

export default {
  components: { VDistpicker },
  data() {
    return {
      showCode: false,
      select: { province: '', city: '', area: '' },
    }
  },
  methods: {
    selectProvince(value) {
      this.select.province = value.value
      console.log(value);
    },
    selectCity(value) {
      this.select.city = value.value
      console.log(value);
    },
    selectArea(value) {
      this.select.area = value.value
      console.log(value);
    },
    onSelected(data) {
      console.log(data)
    },
    reset() {
      this.select.province = ''
      this.select.city = ''
      this.select.area = ''
    },
  },
}
</script>
