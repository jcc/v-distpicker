<template>
  <div class="row">
    <div class="example">
      <h5>OnlyAreaCode</h5>
      <div class="example-box">
        <div class="box-left d-flex align-items-baseline">
          <div class="col-md-7">
            <v-distpicker   :area="select.area" @selected="onSelect" @province="selectProvince" @city="selectCity" @area="selectArea" ></v-distpicker>
             <button class="btn btn-primary btn-sm example-btn" @click="changeSetCode">setByCode</button>
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


export default {
  
  data() {
    return {
      showCode: false,
      select: {   area:  '110102' },
    }
  },
  methods: {
    onSelect({ province, city, area }) {
      this.select.area = area.code
      console.log('select',{province,city, area})
    },
     changeSetCode() {
      this.select.area = '710104'
     },
    selectProvince(value) {
      console.log(value);
    },
    selectCity(value) {
      console.log(value);
    },
    selectArea(value) {
      
      console.log(value);
    },
  },
}
</script>
