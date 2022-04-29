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
import { onBeforeMount, onMounted, reactive, watch } from 'vue'

import DISTRICTS from './districts'
const DEFAULT_CODE = 100000

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
  districts: {
    type: [Array, Object],
    default() {
      return DISTRICTS
    },
  },
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
onBeforeMount(() => {
  currentProvince = determineType(props.province)
  currentCity = determineType(props.city)
  currentArea = determineType(props.area)
  if (props.type !== 'mobile') {
    provinces = getDistricts()
    cities = props.province ? getDistricts(getAreaCode(determineType(props.province))) : []
    let directCity = isDirectCity(props.province, props.city)
    areas = props.city
      ? getDistricts(getAreaCode(determineType(props.city), directCity ? determineType(props.city) : props.area, 'city'))
      : []
  } else {
    if (props.area && !props.hideArea && !props.onlyProvince) {
      tab = 3
      showCityTab = true
      showAreaTab = true
      let directCity = isDirectCity(props.province, props.city)
      areas = getDistricts(getAreaCode(determineType(props.city), directCity ? determineType(props.city) : props.area, 'city'))
    } else if (props.city && props.hideArea && !props.onlyProvince) {
      tab = 2
      showCityTab = true
      cities = getDistricts(getAreaCode(determineType(props.province)))
    } else {
      provinces = getDistricts()
    }
  }
})
onMounted(() => {})

watch(
  () => currentProvince,
  (value) => {
    emitEvent('province', setData(value, 'province'))
    if (props.onlyProvince) {
      emit('selected')
    }
  }
)
watch(
  () => currentCity,
  (value) => {
    emitEvent('city', setData(value, 'city', currentCity))
    if (value != props.placeholders.city && props.hideArea) {
      emit('selected')
    }
  }
)
watch(
  () => currentArea,
  (value) => {
    emitEvent('area', setData(value, 'area', currentArea, true))
    if (value != props.placeholders.area) {
      emit('selected')
    }
  }
)
watch(
  () => props.province,
  () => {
    currentProvince = props.province || props.placeholders.province
    cities = determineValue('province', currentProvince, props.placeholders.province)
  }
)
watch(
  () => props.city,
  () => {
    cities = determineValue('province', currentProvince, props.placeholders.province)
    currentCity = props.city || props.placeholders.city
  }
)
watch(
  () => props.area,
  () => {
    areas = determineValue('city', currentCity, props.placeholders.city, currentProvince)
    currentArea = props.area || props.placeholders.area
  }
)

function setData(value, type, check = '', isArea = false) {
  let code
  if (isArea) {
    code = getCodeByArea(value)
  } else {
    code = getAreaCode(value, check, type)
  }
  return {
    code: code,
    value: value,
  }
}
function getCodeByArea(value) {
  let areas_map = {}
  let arr_keys = Object.keys(areas)
  for (let i = 0; i < arr_keys.length; i++) {
    let arr_key = arr_keys[i]
    let arr_value = areas[arr_key]
    areas_map[arr_value] = arr_key
  }
  return areas_map[value]
}
function emit(name) {
  let data = reactive({
    province: setData(currentProvince, 'province'),
  })

  if (!props.onlyProvince) {
    data.city = setData(currentCity, 'city', currentProvince)
  }
  if (!props.onlyProvince || props.hideArea) {
    data.area = setData(currentArea, 'area', currentProvince, true)
  }
  emitEvent(name, data)
}
function getCities() {
  currentCity = props.placeholders.city
  currentArea = props.placeholders.area
  cities = determineValue('province', currentProvince, props.placeholders.province)
  cleanList()
  if (cities.length === 0) {
    emit('selected')
    tab = 1
    showCityTab = false
  }
}
function getAreas() {
  currentArea = props.placeholders.area
  areas = determineValue('city', currentCity, props.placeholders.city, currentProvince)
  if (areas.length === 0) {
    emit('selected')
    tab = 2
    showAreaTab = false
  }
}
function resetProvince() {
  tab = 1
  provinces = getDistricts()
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
function getAreaCodeByPreCode(name, preCode) {
  let codes = []
  for (let x in props.districts) {
    for (let y in props.districts[x]) {
      if (name === props.districts[x][y]) {
        codes.push(y)
      }
    }
  }

  if (codes.length > 1) {
    let index
    codes.forEach((item, i) => {
      if ((preCode.length === 2 && item.slice(0, 2) === preCode) || (preCode.length === 4 && item.slice(0, 4) !== preCode)) {
        index = i
      }
    })

    return codes[index]
  } else {
    return codes[0]
  }
}
function getAreaCode(name, check = '', type = '') {
  for (let x in props.districts) {
    for (let y in props.districts[x]) {
      if (name === props.districts[x][y]) {
        if (check.length > 0) {
          let code = y

          if (check) {
            let preCode = type === 'city' ? getAreaCode(currentProvince).slice(0, 2) : y.slice(0, 2)

            code = getAreaCodeByPreCode(name, preCode)
          }

          if (!code || y.slice(0, 2) !== code.slice(0, 2)) {
            continue
          } else {
            return code
          }
        } else {
          return y
        }
      }
    }
  }
}
function getCodeValue(code) {
  for (let x in props.districts) {
    for (let y in props.districts[x]) {
      if (code === parseInt(y)) {
        return props.districts[x][y]
      }
    }
  }
}
function getDistricts(code = DEFAULT_CODE) {
  return props.districts[code] || []
}
function determineValue(type, currentValue, placeholderValue, check = '') {
  if (currentValue === placeholderValue) {
    return []
  } else {
    return getDistricts(getAreaCode(currentValue, check, type))
  }
}
function determineType(value) {
  if (typeof value === 'number') {
    return getCodeValue(value)
  }

  return value
}
function cleanList() {
  areas = []
}
function isDirectCity(province, city) {
  if (province && city) {
    return determineType(props.province) === determineType(props.city)
  }
  return false
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
