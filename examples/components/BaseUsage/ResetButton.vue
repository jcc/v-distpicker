<template>
  <div class="row">
    <div class="example">
      <h5>Reset Button</h5>
      <div class="example-box">
        <div class="box-left d-flex align-items-baseline">
          <div class="col-md-7">
            <button class="btn btn-primary reset" @click="reset">Reset</button>
            <v-distpicker
              :province="select.province"
              :city="select.city"
              :area="select.area"
              @province="selectProvince"
              @city="selectCity"
              @area="selectArea"
            ></v-distpicker>
          </div>
          <div class="content-show col-md-5">
            <pre><code>{{ select }}</code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
let select = $ref({ province: '', city: '', area: '' })

function selectProvince(value) {
  console.log('provice value', value)
  select.province = value.value
  console.log(value)
}
function selectCity(value) {
  console.log('city value', value)
  select.city = value.value
  console.log(value)
}
function selectArea(value) {
  console.log('area value', value)
  select.area = value.value
  console.log(value)
}
function reset() {
  select.province = ''
  select.city = ''
  select.area = ''
  console.log('reset value', select)
}
</script>
