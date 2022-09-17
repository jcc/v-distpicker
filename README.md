<p align="center">
<img src="https://pigjian.com/images/v-distpicker.png" alt="Powered By Jiajian Chan" width="160">
</p>

<p align="center">A flexible, highly available district selector for picking provinces, cities and districts of China. </p>

# V - Distpicker


![github-stars](https://img.shields.io/github/stars/jcc/v-distpicker.svg) ![github-stars](http://img.shields.io/npm/v/v-distpicker.svg?style=flat-square) ![download-image](https://img.shields.io/npm/dm/v-distpicker.svg?style=flat-square)



[Documents and  Demo ](https://jcc.github.io/v-distpicker/)

 [English] | [简体中文](./README.zh_CN.md)

 [CHANGELOG](./CHANGELOG.zh-CN.md)





## Installation

Vue 2

```shell
npm install v-distpicker@^1.3.3 --save
```

Vue 3

```shell
npm install v-distpicker@^2.1.0 --save
```
 

## Usage

**Register component**

Registe global component:

```javascript
import VDistpicker from 'v-distpicker'
const app = createApp(App)
app.component('v-distpicker', VDistpicker)
```

Use setup-api:

```javascript
<script setup>
import VDistpicker from 'v-distpicker'
</script>
```

Registe component:

```javascript
import {defineComponent} from 'vue';
import VDistpicker from 'v-distpicker'

export default defineComponent({
  components: { VDistpicker }
})
```

**How to use**

Basic:

```javascript
<v-distpicker></v-distpicker>
```

Default Value:

```javascript
<v-distpicker province="广东省" city="广州市" area="海珠区"></v-distpicker>
```



Mobile:

```javascript
<v-distpicker type="mobile"></v-distpicker>
```

Demo:

```vue
<template>

  <v-distpicker 
  :province="select.province" 
  :city="select.city" 
  :area="select.area" 
  @selected="onSelect" 
  @change="onChange" 
  @province="selectProvince" 
  @city="selectCity" 
  @area="selectArea"
  ></v-distpicker>

</template>

<script setup>

import VDistpicker from 'v-distpicker'
let select = reactive({ province: '', city: '', area: '' })
function onSelect(data) {
  console.log(data)
}
function onChange(data){
   console.log(data)
}
function selectProvince({code,value}) {
  select.province = value
  console.log({code, value})
}
function selectCity({code,value}) {
  select.city = value
  console.log({code, value})
}
function selectArea({ code, value }) {
  select.area = value
  console.log({code, value})
}
</script>
```


## Props
| Name | Type | Description | Default | Sample |
| --- | --- | --- | --- | --- |
| province | String/Number | 省级编码或名称| |'广东省'/440000/'440000' |
| city | String/Number | 市级编码或名称|  |'广州市'/440100/'440100' |
| area | String/Number | 区级编码或名称|  |'海珠区'/440105/'440105' | 
| placeholder | Object | 默认显示的值|  |{province:'省',city:'市',area:'区'}|
| type | String | 区分pc和mobile,默认pc |  ||
| only-province | Boolean | 只显示省级选择器| false ||
| hide-area | Boolean | 隐藏区级 | false ||
| disabled | Boolean | 禁用 | false ||
| province-disabled | Boolean | 禁用省 | false ||
| city-disabled | Boolean | 禁用市 | false ||
| area-disabled | Boolean | 禁用区 | false ||
| province-source | Object | 省数据源 |  |examples/components/data|
| city-source | Object |市级数据源 |   ||
| address-source | Object | 区级数据源 |   ||
| wrapper | String |  className | 'distpicker-address-wrapper' ||
| address-header | String | className(mobile)  | 'address-header' ||
| address-container | String | className(mobile) | 'address-container' ||

   



## Event
| Name | Type | Description | Return |
| --- | --- | --- | --- |
| province | Function | 选择省时触发 |{code,value} |
| city | Function | 选择市时触发 |{code,value} |
| area | Function | 选择区时触发 |{code,value} |
| select | Function | 选择最后一项时触发 |{province:{code,value},city:{code,value},area:{code,value} } |
| change-province | Function | 省级改变时触发 |{code,value} |
| change-city | Function | 市级改变时触发 |{code,value} |
| change-area | Function | 区级改变时触发 |{code,value} |
| change | Function | 省市区改变时触发 |{province:{code,value},city:{code,value},area:{code,value} } |


## Contributors


<table>
  <tr>
    <td align="center"><a href="https://github.com/jcc"><img src="https://avatars.githubusercontent.com/u//12684082?v=4?s=100" width="100px;" alt=""/><br /><sub><b>jcc</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/lyh2668"><img src="https://avatars.githubusercontent.com/u/8433634?v=4?s=100" width="100px;" alt=""/><br /><sub><b>lyh2668</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/wwhwwhwwh"><img src="https://avatars.githubusercontent.com/u/17873876?v=4?s=100" width="100px;" alt=""/><br /><sub><b>wwhwwhwwh</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/kent666a"><img src="https://avatars.githubusercontent.com/u/8786136?v=4?s=100" width="100px;" alt=""/><br /><sub><b>kent666a</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/Milogenius"><img src="https://avatars.githubusercontent.com/u/28343096?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Milogenius</b></sub></a><br /></td>
  </tr>
    <tr>
    <td align="center"><a href="https://github.com/xu8117"><img src="https://avatars.githubusercontent.com/u//39123862?v=4?s=100" width="100px;" alt=""/><br /><sub><b>xu8117</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/tcsiye"><img src="https://avatars.githubusercontent.com/u/26521834?v=4?s=100" width="100px;" alt=""/><br /><sub><b>tcsiye</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/iyangsheng"><img src="https://avatars.githubusercontent.com/u/39045336?v=4?s=100" width="100px;" alt=""/><br /><sub><b>iyangsheng</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/liushuai05"><img src="https://avatars.githubusercontent.com/u/26994692?v=4?s=100" width="100px;" alt=""/><br /><sub><b>liushuai05</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/Aufree"><img src="https://avatars.githubusercontent.com/u/5310542?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Aufree</b></sub></a><br /></td>
  </tr>
</table>



## Thanks

- [Distpicker](https://github.com/fengyuanchen/distpicker)

## License

The plugin is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).