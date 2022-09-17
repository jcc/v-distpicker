<template>
  <div :class="wrapper">
    <template v-if="type !== 'mobile'">
      <label>
        <select @change="getCities" v-model="currentProvince" :disabled="disabled || provinceDisabled">
          <option :value="placeholders.province">{{ placeholders.province }}</option>
          <option
            v-for="(item, index) in provinces"
            :value="item"
            :key="index"
          >
            {{ item }}
          </option>
        </select>
      </label>
      <template v-if="!onlyProvince">
        <label>
          <select
            @change="getAreas"
            v-model="currentCity"
            :disabled="disabled || cityDisabled"
          >
            <option :value="placeholders.city">{{ placeholders.city }}</option>
            <option
              v-for="(item, index) in cities"
              :value="item"
              :key="index"
            >
              {{ item }}
            </option>
          </select>
        </label>
        <label>
          <select v-if="!hideArea" @change="changeArea" v-model="currentArea" :disabled="disabled || areaDisabled">
            <option :value="placeholders.area">{{ placeholders.area }}</option>
            <option v-for="(item, index) in areas "
                    :value="item"
                    :key="index">
              {{ item }}
            </option>
          </select>
        </label>
      </template>
    </template>
    <template v-else>
      <div :class="addressHeader">
        <ul >
          <li :class="{'active': tab === 1}" @click="resetProvince">{{ currentProvince && !staticPlaceholder ? currentProvince : placeholders.province }}</li>
          <template v-if="!onlyProvince">
            <li v-if="showCityTab" :class="{'active': tab === 2}" @click="resetCity">{{  currentCity && !staticPlaceholder ? currentCity : placeholders.city }}</li>
            <li v-if="showAreaTab && !hideArea" :class="{'active': tab === 3}">{{ currentArea && !staticPlaceholder ? currentArea : placeholders.area }}</li>
          </template>
        </ul>
      </div>
      <div :class="addressContainer">
        <ul v-if="tab === 1">
          <li v-for="(item, index) in provinces"
              :class="{'active': item === currentProvince}"
              @click="chooseProvince(item)"
              :key="index">
            {{ item }}
          </li>
        </ul>
        <template v-if="!onlyProvince">
          <ul v-if="tab === 2">
            <li v-for="(item, index) in cities"
                :class="{'active': item === currentCity}"
                @click="chooseCity(item)"
                :key="index">
              {{ item }}
            </li>
          </ul>
          <ul v-if="tab === 3 && !hideArea">
            <li v-for="(item, index) in areas"
                :class="{'active': item === currentArea}"
                @click="chooseArea(item)"
                :key="index">
              {{ item }}
            </li>
          </ul>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
import { isChn, isEmpty, isDistCode } from './util'
import { autoCompleteDistCode } from './transform'
import DEFAULT_PROVINCE from './province'
import DEFAULT_CITY from './city'
import DEFAULT_AREA from './area'


export default {
  name: 'v-distpicker',
  props: {
    province: { type: [String, Number], default: '' },
    city: { type: [String, Number], default: '' },
    area: { type: [String, Number], default: '' },
    type: { type: String, default: '' },
    hideArea: { type: Boolean, default: false },
    onlyProvince: { type: Boolean, default: false },
    staticPlaceholder: { type: Boolean, default: false },
    placeholders: {
      type: Object,
      default() {
        return {
          province: '省',
          city: '市',
          area: '区',
        }
      }
    },
    provinceSource: Object,
    citySource: Object,
    areaSource: Object,
    disabled: { type: Boolean, default: false },
    provinceDisabled: { type: Boolean, default: false },
    cityDisabled: { type: Boolean, default: false },
    areaDisabled: { type: Boolean, default: false },
    addressHeader: { type: String, default: 'address-header' },
    addressContainer: { type: String, default: 'address-container' },
    wrapper: { type: String, default: 'distpicker-address-wrapper' },
  },
  data() {
    return {
      tab: 1,
      showCityTab: false,
      showAreaTab: false,
      provinces: [],
      cities: [],
      areas: [],
      provinceData: {},
      cityData: {},
      areaData: {},
      currentProvince: '',
      currentCity: '',
      currentArea: '',
    }
  },
  created() {
    this.provinceData = this.provinceSource || DEFAULT_PROVINCE
    this.cityData = this.citySource || DEFAULT_CITY
    this.areaData = this.areaSource || DEFAULT_AREA

    let provinceVal = this.province
    let cityVal = this.city 
    if (isDistCode(this.area)) {
       let { provinceCode,cityCode} = autoCompleteDistCode(this.area, 'area')
        this.currentProvince =this.getProvinceVal(provinceCode,false)||this.placeholders.province
        provinceVal=provinceCode
        this.currentCity = this.getCityVal(cityCode, false)||this.placeholders.city
        cityVal=cityCode
    }
    let { name:areaName } = this.getCodeValue(this.area, 'area')
    this.currentArea = areaName || this.placeholders.area
    if (isEmpty(this.currentProvince)) { 
      let { name: provinceName } =this.getCodeValue(provinceVal, 'province')
      this.currentProvince = provinceName || this.placeholders.province
    }
    if (isEmpty(this.currentCity)) { 
      let { name: cityName } = this.getCodeValue(cityVal, 'city')
      this.currentCity = cityName || this.placeholders.city
    }
    if (this.type !== 'mobile') {
       this.provinces =this. getProvinceList()
      this.cities =this.getCityList(provinceVal)
      this.areas =this. getAreaList(cityVal)
    } else {
      if (this.area && !this.hideArea && !this.onlyProvince) {
        this.tab = 3
        this.showCityTab = true
        this.showAreaTab = true
         this.areas =this. getAreaList(cityVal)
      } else if (cityVal && this.hideArea && !this.onlyProvince) {
        this.tab = 2
        this.showCityTab = true
        this.cities =this.getCityList(this.province)
      } else {
        this.provinces = this.getProvinceList()
      }
    }
  },
  watch: {
    currentProvince(value) {
      this.$emit('change-province', this.setData(value, 'province'))
      if (this.onlyProvince) {
         this.emit('change')
      }
    },
    currentCity(value) {
      this.$emit('change-city', this.setData(value, 'city'))
      if (this.hideArea) {
          this.emit('change')
      }
    },
    currentArea(value) {
      this.$emit('change-area', this.setData(value, 'area'))
      this.emit('change')
    },
    province(value) {
      let val = this.province || this.placeholders.province
      let { name: provinceName, code: provinceCode } = this.getCodeValue(val, 'province')
      this.currentProvince =provinceName
      this.cities = this.getCityList(provinceCode)
    },
    city(value) {
      let city = this.city || this.placeholders.city
      let { name:cityName,code:cityCode }  = this.getCodeValue(city, 'city', this.cities)
      this.currentCity = cityName
      this.areas =this.getAreaList(cityCode)  
    },
    area(value) {
      let area = this.area || this.placeholders.area
      this.changeAreaCode(area)
    },
  },
  methods: {
    setData(value, type) {
      let code = ''
    if (!isEmpty(value)) { 
        switch (type) {
          case 'area':
             let isAreaHolder = this.currentArea == this.placeholders.area
             code =isAreaHolder?'':this.getAreaVal(value,true,this.areas)
          break
          case 'city':
            let isCityHolder = value == this.placeholders.city
            code =isCityHolder?'':this.getCityVal(value,true, this.cities)
          break
          case 'province':
             let isProvinceHolder = value == this.placeholders.province
            code = isProvinceHolder?'':this.getProvinceVal(value,true)
          break
      }
    }
     return { code, value}
    },
    emit(name) {
      let data = {
        province: this.setData(this.currentProvince, 'province')
      }
      if (!this.onlyProvince) {
        this.$set(data, 'city', this.setData(this.currentCity, 'city'))
      } 
      if (!this.onlyProvince && !this.hideArea) {
          this.$set(data, 'area', this.setData(this.currentArea, 'area'))
      }
      this.$emit(name, data)
    },
    changeArea() { 
      this.$emit('area', this.setData(this.currentArea, 'area'))
      this.emit('selected')
    },
    getCities() {
      this.currentCity = this.placeholders.city
      this.currentArea = this.placeholders.area
      this.cities = this.getCityList(this.currentProvince)
      this.$emit('province', this.setData(this.currentProvince, 'province'))
      if (this.onlyProvince) { 
          this.emit('selected')
      }
      this.cleanList()
      if (this.cities.length === 0) {
        this.tab = 1
        this.showCityTab = false
      }
    },
    getAreas() {
      this.currentArea = this.placeholders.area
      let { code: cityCode } =this.getCodeValue(this.currentCity, 'city',this.cities)
      this.areas = this.getAreaList(cityCode)
      this.$emit('city', this.setData(this.currentCity, 'city'))
      if (this.hideArea) { 
          this.emit('selected')
      }
      if (this.areas.length === 0) {
        this.tab = 2
        this.showAreaTab = false
      }
    },
    resetProvince() {
      this.tab = 1
      this.provinces = this.getProvinceList()
      this.showCityTab = false
      this.showAreaTab = false
    },
    resetCity() {
      this.tab = 2
      this.showCityTab = true
      this.showAreaTab = false
      this.getCities()
    },
    chooseProvince(name) {
      this.currentProvince = name
      this.tab = 2
      this.showCityTab = true
      this.showAreaTab = false
      this.getCities()
    },
    chooseCity(name) {
      this.currentCity = name
      this.tab = 3
      this.showCityTab = true
      this.showAreaTab = true
      this.getAreas()
    },
    chooseArea(name) {
      this.currentArea = name
      this.changeArea()
    },
     cleanList() {
      this.areas=[]
    },
 
    changeAreaCode(areaCode) {
      if(isDistCode(areaCode)){
      let { provinceCode, cityCode } = autoCompleteDistCode(areaCode, 'area')
      this.currentProvince = this.getProvinceVal(provinceCode, false)
      this.currentCity = this.getCityVal(cityCode, false)
      this.cities = this.getCityList(provinceCode)
      this.areas = this.getAreaList(cityCode)
      }
      let { name:areaName } =this.getCodeValue(areaCode, 'area')
      this.currentArea = areaName
    },
/**
 * 根据名称 或 编码 ,返回下拉框选项
 * 名称转换为编码查找
 *@param codeOrName 名称 或 编码 
 * 
 */
 getCityList(codeOrName) {
   let code  = isChn(codeOrName)?this.getProvinceVal(codeOrName,true):codeOrName
   return  this.cityData[code] || []
},

 getAreaList(codeOrName) { 
  let code = isChn(codeOrName) ? this.getCityVal(codeOrName,true) : codeOrName
  return this.areaData[code]||[]
},

 getProvinceList() { 
  return this.provinceData
},

 getTransformData(val,itemCode,data,isName) { 
  if (isName) {
        if (data[itemCode] == val)  return itemCode
      } else { 
        if (itemCode == val) return data[itemCode]
  }
  return null
},
 

/**
 * 查找
 * @param provinceVal 值
 * @param data 数据源,默认从所有数据查找
 * @param isName false 传入编码 返回 名称，true 传入名称 返回 编码
 */
 getCityVal(cityVal,isName=false, data) { 
   if (data) {
      for (let itemCode in data) {
        let val =this.getTransformData(cityVal, itemCode, data,isName)
        if(val) return val
      }
    } else { 
      let cityArr = Object.values(this.cityData)
      for (let item of cityArr) { 
        for (let itemCode in item) {
          let val =this.getTransformData(cityVal, itemCode, item,isName)
          if (val) return val
        }
      }
    }
    return cityVal
},

 getProvinceVal(provinceVal,isName=false) {
    for (let itemCode in this.provinceData) {
      let val =this. getTransformData(provinceVal, itemCode, this.provinceData,isName)
       if(val) return val
    }
    return provinceVal
},

 getAreaVal(areaVal,isName=false,data) { 
    if (data) {
      for (let itemCode in data) {
        let val =this.getTransformData(areaVal, itemCode, data,isName)
        if (val) return val
      }
    } else { 
      let areaArr = Object.values(this.areaData)
      for (let item of areaArr) { 
        for (let itemCode in item) {
          let val = this.getTransformData(areaVal, itemCode, item,isName)
          if (val) return val
          }
        }
    }
    return areaVal
},

/**
 * 查找
 */
 getCodeValue(codeOrName, type,data) {
  if (isEmpty(codeOrName)) return { name: '', value: '' }
  let value = ''
    switch (type) {
      case 'area':
      value =this.getAreaVal(codeOrName, isChn(codeOrName),data)
        break
      case 'city':
      value = this.getCityVal(codeOrName, isChn(codeOrName),data)
        break
      case 'province':
      value = this.getProvinceVal(codeOrName, isChn(codeOrName))
        break
    }
    return isChn(codeOrName) ? { name: codeOrName, code: value } : { name: value, code: codeOrName }
 },
 }
}
</script>

<style lang="scss">
.distpicker-address-wrapper {
  color: #9caebf;
  select {
    padding: .5rem .75rem;
    height: 40px;
    font-size: 1rem;
    line-height: 1.25;
    color: #464a4c;
    background-color: #fff;
    background-image: none;
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
    border: 1px solid rgba(0,0,0,.15);
    border-radius: .25rem;
    -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    option {
      font-weight: normal;
      display: block;
      white-space: pre;
      min-height: 1.2em;
      padding: 0px 2px 1px;
    }
  }
  ul {
    margin: 0;
    padding: 0;
    li {
      list-style: none;
    }
  }
  .address-header {
    background-color: #fff;
    ul {
      display: flex;
      justify-content: space-around;
      align-items: stretch;
      li {
        display: inline-block;
        padding: 10px 10px 7px;
        &.active {
          border-bottom: #52697f solid 3px;
          color: #52697f;
        }
      }
    }
  }
  .address-container {
    background-color: #fff;
    ul {
      height: 100%;
      overflow: auto;
      li {
        padding: 8px 10px;
        border-top: 1px solid #f6f6f6;
        &.active {
          color: #52697f;
        }
      }
    }
  }
}
.disabled-color{
    background: #f8f8f8;
}
</style>