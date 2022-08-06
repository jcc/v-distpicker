<template>
  <div class="row">
    <div class="example">
      <h5>Custom Data Source</h5>
      <div class="example-box">
        <div class="box-left d-flex align-items-baseline">
          <div class="col-md-7">
            <v-distpicker :province="select.province" :city="select.city" :area="select.area" :area-source="areaSource" :city-source="citySource" :province-source="provinceSource" @change="onChange" @selected="onSelect" @province="selectProvince" @city="selectCity" @area="selectArea"></v-distpicker>
            <button class="btn btn-primary btn-sm example-btn" @click="changeSetCode">setByCode</button>
            <button class="btn btn-primary btn-sm example-btn" @click="changeSetName">setByName</button>
          </div>
          <div class="content-show col-md-5">
            <pre><code>{{ select }}</code></pre>
          </div>
        </div>
        <div v-if="showCode" class="box-right col-md-12">
          <pre
            class="language-javascript code-toolbar"
          ><code class=" language-javascript">{{ code }}
          </code></pre>
        </div>
         
        <div class="box-footer" @click="change">
          {{ showCode ? 'Hide Code' : 'Show Code' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import areaSource from '../data/area_data'
import citySource from '../data/city_data'
import provinceSource from '../data/province_data'

let showCode = $ref(false)
let select = reactive({ province: '', city: '', area: '' })
let code = `<template>
<v-distpicker :province="select.province" :city="select.city" 
:area="select.area" :area-source="areaSource" :city-source="citySource" 
:province-source="provinceSource"
 @change="onChange" @selected="onSelect"
 @province="selectProvince" @city="selectCity"
  @area="selectArea"></v-distpicker>
</template>

<script setup>
import areaSource from '../data/area_data'
import citySource from '../data/city_data'
import provinceSource from '../data/province_data'

function changeSetCode() {
   select.province = 810000
   select.city = '810100'
   select.area = 810104
}
function changeSetName() { 
  select.province = '台湾省'
  select.city = '台北市'
  select.area = 710101
}
function onChange({ province, city, area }) {
    select.province = province.value
    select.city = city.value
    select.area = area.value
    console.log('change',{ province, city, area })
}
function onSelect(data) {
  console.log(data)
}
<script>`
 
function onChange({ province, city, area }) {
    select.province = province.value
    select.city = city.value
    select.area = area.value
    console.log('change',{ province, city, area })
}
function change() { 
  console.log(+new Date(), showCode.value)
  
  showCode = !showCode
}
 
function onSelect(data) {
  console.log(data)
}
function selectProvince({ code,value}) {
  select.province = value
  console.log({ code,value})
}
function selectCity({ code,value}) {
  select.city = value
  console.log({ code,value})
}
function selectArea({ code,value}) {
  select.area = value
  console.log({ code,value})
}
function changeSetCode() {
   select.province = 810000
   select.city = '810100'
   select.area = 810104
}
function changeSetName() { 
  select.province = '台湾省'
  select.city = '台北市'
  select.area = 710101
}

</script>
