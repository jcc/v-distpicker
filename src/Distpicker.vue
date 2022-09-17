<template>
  <div :class="wrapper">
    <template v-if="type !== 'mobile'">
      <label>
        <select v-model="currentProvince" :disabled="disabled || provinceDisabled" @change="getCities">
          <option :value="placeholders.province">{{ placeholders.province }}</option>
          <option v-for="(item, index) in provinces" :key="index" :value="item">
            {{ item }}
          </option>
        </select>
      </label>
      <template v-if="!onlyProvince">
        <label>
          <select v-model="currentCity" :disabled="disabled || cityDisabled" @change="getAreas">
            <option :value="placeholders.city">{{ placeholders.city }}</option>
            <option v-for="(item, index) in cities" :key="index" :value="item">
              {{ item }}
            </option>
          </select>
        </label>
        <label>
          <select v-if="!hideArea" v-model="currentArea" :disabled="disabled || areaDisabled" @change="changeArea">
            <option :value="placeholders.area">{{ placeholders.area }}</option>
            <option v-for="(item, index) in areas" :key="index" :value="item">
              {{ item }}
            </option>
          </select>
        </label>
      </template>
    </template>
    <template v-else>
      <div :class="addressHeader">
        <ul>
          <li :class="{ active: tab === 1 }" @click="resetProvince">
            {{ currentProvince && !staticPlaceholder ? currentProvince : placeholders.province }}
          </li>
          <template v-if="!onlyProvince">
            <li v-if="showCityTab" :class="{ active: tab === 2 }" @click="resetCity">
              {{ currentCity && !staticPlaceholder ? currentCity : placeholders.city }}
            </li>
            <li v-if="showAreaTab && !hideArea" :class="{ active: tab === 3 }">
              {{ currentArea && !staticPlaceholder ? currentArea : placeholders.area }}
            </li>
          </template>
        </ul>
      </div>
      <div :class="addressContainer">
        <ul v-if="tab === 1">
          <li v-for="(item, index) in provinces" :key="index" :class="{ active: item === currentProvince }" @click="chooseProvince(item)">
            {{ item }}
          </li>
        </ul>
        <template v-if="!onlyProvince">
          <ul v-if="tab === 2">
            <li v-for="(item, index) in cities" :key="index" :class="{ active: item === currentCity }" @click="chooseCity(item)">
              {{ item }}
            </li>
          </ul>
          <ul v-if="tab === 3 && !hideArea">
            <li v-for="(item, index) in areas" :key="index" :class="{ active: item === currentArea }" @click="chooseArea(item)">
              {{ item }}
            </li>
          </ul>
        </template>
      </div>
    </template>
  </div>
</template>
<script setup>
import { onBeforeMount, reactive, watch } from 'vue'
import {  isEmpty, isDistCode } from './util'
import { autoCompleteDistCode } from './transform'
import { useHandler} from './hooks'


const emitEvent = defineEmits(['selected', 'province', 'city', 'area','change-province','change-city','change-area','change'])
const props = defineProps({
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
    },
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
})


let tab = $ref(1)
let showCityTab = $ref(false)
let showAreaTab = $ref(false)
let provinces = $ref([])
let cities = $ref([])
let areas = $ref([])
let currentProvince = $ref('')
let currentCity = $ref('')
let currentArea = $ref('')



let  {  getProvinceList, getCityList, getAreaList, getProvinceVal, getAreaVal, getCityVal, getCodeValue }=useHandler(props)
  
onBeforeMount(() => {
  
   let provinceVal = props.province
  let cityVal = props.city
     if (isDistCode(props.area)) {
       let { provinceCode,cityCode} = autoCompleteDistCode(props.area, 'area')
        currentProvince =getProvinceVal(provinceCode,false)||props.placeholders.province
        provinceVal=provinceCode
        currentCity = getCityVal(cityCode, false)||props.placeholders.city
        cityVal=cityCode
    }
     let { name:areaName } = getCodeValue(props.area, 'area')
     currentArea = areaName || props.placeholders.area
  if (isEmpty(currentProvince)) { 
    let { name: provinceName } = getCodeValue(provinceVal, 'province')
      currentProvince = provinceName || props.placeholders.province
    }
  if (isEmpty(currentCity)) { 
    let { name: cityName } = getCodeValue(cityVal, 'city')
        currentCity = cityName||props.placeholders.city
    }
  if (props.type !== 'mobile') {
     provinces = getProvinceList()
     cities = getCityList(provinceVal)
     areas = getAreaList(cityVal)
  } else {
    if (props.area && !props.hideArea && !props.onlyProvince) {
      tab = 3
      showCityTab = true
      showAreaTab = true
      areas = getAreaList(cityVal)
    } else if (cityVal && props.hideArea && !props.onlyProvince) {
      tab = 2
      showCityTab = true
      cities = getCityList(provinceVal)
    } else {
      provinces = getProvinceList()
    }
  }
})

watch(
  () => currentProvince,
  (value) => {
    emitEvent('change-province', setData(value, 'province'))
    if ( props.onlyProvince) {
      emit('change')
    }
  }
)

watch(
  () => currentCity,
  (value) => {
    emitEvent('change-city', setData(value, 'city'))
    if (props.hideArea) {
      emit('change')
    }
  }
)

watch(
  () => currentArea,
  (value) => {
   emitEvent('change-area', setData(value, 'area'))
   emit('change')
  }
)

watch(
  () => props.province,
  () => {
    let val = props.province || props.placeholders.province
    let { name: provinceName, code: provinceCode } = getCodeValue(val, 'province')
      currentProvince = provinceName
      cities = getCityList(provinceCode)
  }
)

watch(
  () => props.city,
  () => {
    let city = props.city || props.placeholders.city
    let { name:cityName,code:cityCode }  = getCodeValue(city, 'city', cities)
    currentCity=cityName
    areas = getAreaList(cityCode)
  }
)

watch(
  () => props.area,
  () => {
    let area = props.area || props.placeholders.area
     changeAreaCode(area)
  }
)

function setData(value, type) { 
  let code=''
  if (!isEmpty(value)) { 
      switch (type) {
        case 'area':
        code = currentArea == props.placeholders.area ? '' : getAreaVal(value, true, areas)
        break
      case 'city':
          code =value == props.placeholders.city?'':getCityVal(value,true, cities)
        break
      case 'province':
        code = value == props.placeholders.province?'':getProvinceVal(value,true)
        break
    }
  }
  return { code, value}
}

function emit(name) {
  let data = reactive({
    province: setData(currentProvince, 'province'),
  })

  if (!props.onlyProvince) {
    data.city = setData(currentCity, 'city')
  }
  if (!props.onlyProvince &&!props.hideArea) {
    data.area = setData(currentArea, 'area')
  }
  emitEvent(name, data)
}
function changeArea() { 
    emitEvent('area', setData(currentArea, 'area'))
    emit('selected')
}
function getCities() {
  currentCity = props.placeholders.city
  currentArea = props.placeholders.area
  cities = getCityList(currentProvince)
   emitEvent('province', setData(currentProvince, 'province'))
  if (props.onlyProvince) { 
      emit('selected')
  }
  cleanList()
  if (cities.length === 0) {
    tab = 1
    showCityTab = false
  }
}
function getAreas() {
  currentArea = props.placeholders.area
  let { code: cityCode } = getCodeValue(currentCity, 'city', cities)
  areas = getAreaList(cityCode)
  emitEvent('city', setData(currentCity, 'city'))
  if(props.hideArea) {
      emit('selected')
  }
  if (areas.length === 0) {
    tab = 2
    showAreaTab = false
  }
}
function resetProvince() {
  tab = 1
  provinces = getProvinceList()
  showCityTab = false
  showAreaTab = false
}
function resetCity() {
  tab = 2
  showCityTab = true
  showAreaTab = false
  getCities()
}
function chooseProvince(name) {
  currentProvince = name
  tab = 2
  showCityTab = true
  showAreaTab = false
  getCities()
}
function chooseCity(name) {
  currentCity = name
  tab = 3
  showCityTab = true
  showAreaTab = true
  getAreas()
}
function chooseArea(name) {
  currentArea = name
  changeArea()
}
function cleanList() {
  areas = []
}

function changeAreaCode(areaCode) { 
  if (isDistCode(areaCode)) {
    let { provinceCode, cityCode } = autoCompleteDistCode(areaCode, 'area')
    currentProvince = getProvinceVal(provinceCode, false)
    currentCity = getCityVal(cityCode, false)
    cities = getCityList(provinceCode)
    areas = getAreaList(cityCode)
  }
  let { name:areaName } = getCodeValue(areaCode, 'area')
  currentArea = areaName
}
</script>

<style lang="scss">
.distpicker-address-wrapper {
  color: #9caebf;
  select {
    padding: 0.5rem 0.75rem;
    height: 40px;
    font-size: 1rem;
    line-height: 1.25;
    color: #464a4c;
    background-color: #fff;
    background-image: none;
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 0.25rem;
    -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;
    transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;
    -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
    transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
    transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;

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
.disabled-color {
  background: #f8f8f8;
}
</style>