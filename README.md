<p align="center">
<img src="https://pigjian.com/images/v-distpicker.png" alt="Powered By Jiajian Chan" width="160">
</p>

<p align="center">A flexible, highly available district selector for picking provinces, cities and districts of China.</p>

# V - Distpicker

 [Documents and  Demo ](https://jcc.github.io/v-distpicker/)

 [English] | [简体中文](./README.zh_CN.md)

 [CHANGELOG](./CHANGELOG.zh-CN.md)

## Installation

```javascript
npm install v-distpicker --save
```

Or

```javascript
yarn add v-distpicker --save
```

## Usage

**Register component**

Registe global component:

```javascript
import Distpicker from 'v-distpicker'

Vue.component('v-distpicker', Distpicker)
```

Registe component:

```javascript
import VDistpicker from 'v-distpicker'

export default {
  components: { VDistpicker }
}
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
