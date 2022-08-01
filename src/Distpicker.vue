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
          <select v-if="!hideArea" v-model="currentArea" :disabled="disabled || areaDisabled">
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
import { isChn,isEmpty } from './util'
import DEFAULT_PROVINCE from './province'
import DEFAULT_CITY from './city'
import DEFAULT_AREA from './area'

const emitEvent = defineEmits(['selected', 'province', 'city', 'area'])
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
let provinceData = reactive({})
let cityData = reactive({})
let areaData = reactive({})
 

  provinceData = props.provinceSource || DEFAULT_PROVINCE
  cityData = props.citySource || DEFAULT_CITY
  areaData = props.areaSource || DEFAULT_AREA
  
onBeforeMount(() => {
   currentProvince = getCodeValue(props.province, 'province')
  currentCity = getCodeValue(props.city, 'city')
  currentArea = getCodeValue(props.area, 'area')
  
  if (props.type !== 'mobile') {
     provinces = getProvinceList()
     cities = getCityList(props.province)
     areas = getAreaList(props.city)
  } else {
    if (props.area && !props.hideArea && !props.onlyProvince) {
      tab = 3
      showCityTab = true
      showAreaTab = true
      areas = getAreaList(props.city)
    } else if (props.city && props.hideArea && !props.onlyProvince) {
      tab = 2
      showCityTab = true
      cities = getCityList(props.province)
    } else {
      provinces = getProvinceList()
    }
  }
})



watch(
  () => currentProvince,
  (value) => {
    let isPlaceholder = value == props.placeholders.province
    emitEvent('province', setData(isPlaceholder?'':value, 'province'))
    if (!isPlaceholder && props.onlyProvince) {
      emit('selected')
    }
  }
)
watch(
  () => currentCity,
  (value) => {
   let isPlaceholder = value == props.placeholders.city
    emitEvent('city', setData(isPlaceholder?'':value, 'city'))
    if (!isPlaceholder && props.hideArea) {
      emit('selected')
    }
  }
)
watch(
  () => currentArea,
  (value) => {
   let isPlaceholder = value == props.placeholders.area
    emitEvent('area', setData(isPlaceholder?'':value, 'area'))
    if (!isPlaceholder) {
      emit('selected')
    }
  }
)

watch(
  () => props.province,
  () => {
      let val =props.province || props.placeholders.province
      currentProvince =getCodeValue(val,'province')
      cities = getCityList(currentProvince)
  }
)

watch(
  () => props.city,
  () => {
    let city  = props.city || props.placeholders.city
     currentCity = getCodeValue(city, 'city')
      areas = getAreaList(city)
  }
)
watch(
  () => props.area,
  () => {
    let area = props.area || props.placeholders.area
    currentArea = getCodeValue(area, 'area')

  }
)

function setData(value, type,) { 
  let code
  if (!isEmpty(value)) { 
      switch (type) {
      case 'area':
        code = getAreaVal(value,true,areas)
        break
      case 'city':
        code =getCityVal(value,true, cities)
        break
      case 'province':
        code = getProvinceVal(value,true)
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
  if (!props.onlyProvince || props.hideArea) {
    data.area = setData(currentArea, 'area')
  }
  emitEvent(name, data)
}
function getCities() {
  currentCity = props.placeholders.city
  currentArea = props.placeholders.area
  cities =getCityList(currentProvince)
  cleanList()
  if (cities.length === 0) {
    emit('selected')
    tab = 1
    showCityTab = false
  }
}
function getAreas() {
  currentArea = props.placeholders.area
  areas =  getAreaList(currentCity)
  if (areas.length === 0) {
    emit('selected')
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
  if (props.onlyProvince) return
  tab = 2
  showCityTab = true
  showAreaTab = false
  getCities()
}
function chooseCity(name) {
  currentCity = name
  if (props.hideArea) return
  tab = 3
  showCityTab = true
  showAreaTab = true
  getAreas()
}
function chooseArea(name) {
  currentArea = name
}

function cleanList() {
  areas = []
}


/**
 * 根据名称 或 编码 ,返回下拉框选项
 * 名称转换为编码查找
 *@param codeOrName 名称 或 编码 
 * 
 */
function getCityList(codeOrName) {
   let code  = isChn(codeOrName)?getProvinceVal(codeOrName,true):codeOrName
   return  cityData[code] || []
}

function getAreaList(codeOrName) { 
  let code = isChn(codeOrName) ? getCityVal(codeOrName,true) : codeOrName
  return areaData[code]||[]
}

function getProvinceList() { 
  return provinceData
}

function getTransformData(val,itemCode,data,isName) { 
  if (isName) {
        if (data[itemCode] == val)  return itemCode
      } else { 
        if (itemCode == val) return data[itemCode]
  }
  return null
}
 

/**
 * 查找
 * @param proviceVal 值
 * @param data 数据源,默认从所有数据查找
 * @param isName false 传入编码 返回 名称，true 传入名称 返回 编码
 */
function getCityVal(cityVal,isName=false, data=null,) { 
    if (data) {
      for (let itemCode in data) {
        let val = getTransformData(cityVal, itemCode, data,isName)
        if(val) return val
      }
    } else { 
      for (let item of Object.values(cityData)) { 
        for (let itemCode in item) {
          let val = getTransformData(cityVal, itemCode, item,isName)
          if (val) return val
        }
      }
    }
    return cityVal
}

function getProvinceVal(proviceVal,isName=false) {
    for (let itemCode in provinceData) {
      let val = getTransformData(proviceVal, itemCode, provinceData,isName)
       if(val) return val
    }
    return proviceVal
}

function getAreaVal(areaVal,isName=false,data=null,) { 
    if (data) {
      for (let itemCode in data) {
        let val = getTransformData(areaVal, itemCode, data,isName)
        if (val) return val
      }
    } else { 
      for (let item of Object.values(areaData)) { 
        for (let itemCode in item) {
          let val = getTransformData(areaVal, itemCode, item,isName)
          if (val) return val
          }
        }
    }
  return areaVal
}

/**
 * 根据 编码，返回 名称
 */
function getCodeValue(codeOrName, type, isName = false) {
  if (isEmpty(codeOrName)) return ''
   let name = codeOrName
  if (codeOrName && !isChn(codeOrName)) {
    switch (type) {
      case 'area':
        name = getAreaVal(codeOrName, isName)
        break
      case 'city':
        name = getCityVal(codeOrName, isName)
        break
      case 'province':
        name = getProvinceVal(codeOrName, isName)
        break
    }
    return name
  }
  return name
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
