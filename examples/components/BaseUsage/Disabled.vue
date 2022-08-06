<template>
  <div class="row">
    <div class="example">
      <h5>Disabled Value</h5>
      <div class="example-box">
        <div class="box-left d-flex align-items-baseline">
          <div class="col-md-7">
            <v-distpicker
              :province="select.province"
              :city="select.city"
              :area="select.area"
              :province-disabled="true"
              :city-disabled="true"
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
let showCode = $ref(false)
let select = $ref({ province: 440000, city: '广州市', area: '海珠区' })

function selectProvince(value) {
  select.province = value.value
  console.log(value)
}
function selectCity(value) {
  select.city = value.value
  console.log(value)
}
function selectArea(value) {
  select.area = value.value
  console.log(value)
}
</script>
