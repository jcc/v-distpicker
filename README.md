<p align="center">
<img src="https://pigjian.com/images/v-distpicker.png" alt="Powered By Jiajian Chan" width="160">
</p>

<p align="center">A flexible, highly available district selector for picking provinces, cities and districts of China.</p>

# V - Distpicker

Here is [documents](http://distpicker.pigjian.com/)

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

- [Jiajian Chan](http://github.com/jcc)

## Thanks

- [Distpicker](https://github.com/fengyuanchen/distpicker)

## License

The plugin is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).
