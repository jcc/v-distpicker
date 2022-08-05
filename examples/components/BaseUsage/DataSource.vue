<template>
  <div class="row">
    <div class="example">
      <h5>Custom Data Source</h5>
      <div class="example-box">
        <div class="box-left d-flex align-items-baseline">
          <div class="col-md-7">
            <v-distpicker :province="select.province" @change="onChange" :city="select.city" :area="select.area" :area-source="areaSource" :city-source="citySource" :province-source="provinceSource" @selected="onSelect" @province="selectProvince" @city="selectCity" @area="selectArea"></v-distpicker>
            <button class="btn btn-primary btn-sm example-btn" @click="changeSetCode">setByCode</button>
            <button class="btn btn-primary btn-sm example-btn" @click="changeSetName">setByName</button>
          </div>
          <div class="content-show col-md-5">
            <pre><code>{{ select }}</code></pre>
          </div>
        </div>
         
        <div class="box-footer" @click="showCode = !showCode">
          {{ showCode ? 'Hide Code' : 'Show Code' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import areaData from '../data/area_data'
import  cityData from '../data/city_data'
import provinceData from '../data/province_data'


export default {
  
  data() {
    return {
      showCode: false,
      select: { province: '', city: '', area: '' },
      areaSource: {},
      citySource: {},
      provinceSource: {}
    }
  },
  created() { 
    this.areaSource = areaData
    this.provinceSource = provinceData
    this.citySource=cityData
  },
  methods: {
    onSelect (data) {
      console.log(data)
    },
    onChange({ province, city, area }) {
      this.select.province = province.value
      this.select.city = city.value
      this.select.area = area.value
      console.log('change',{ province, city, area })
    },
    selectProvince({ code,value}) {
       this.select.province = value
      console.log({ code,value});
    },
    selectCity({ code,value}) {
       this.select.city = value
      console.log({ code,value});
    },
    selectArea({ code,value}) {
       this.select.area = value
      console.log({ code,value});
    },
    changeSetCode() {
      this.select.province = 810000
      this.select.city = '810100'
      this.select.area = 810104
  },
    changeSetName() { 
      // this.select.province = '台湾省'
      // this.select.city = '台北市'
      this.select.area = 710101
    }
  },
}
</script>

 
