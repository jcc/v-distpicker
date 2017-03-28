<template>
  <div class="container">
    <div class="logo">
      <img src="https://pigjian.com/images/v-distpicker.png" width="250">
      <div class="description">
        <p>V - Distpicker 是一个简单易用的地区选择器</p>
        <small>A easy-to-use district selector component.</small>
      </div>
    </div>
    <div class="row">
      <div class="blocks">
        <h3 class="text-center">Getting Started</h3>
        <div class="block">
          <h5>Installation</h5>
          <pre><code class="javascript language-javascript">npm install v-distpicker --save</code></pre>
          <p>Or</p>
          <pre><code class="javascript language-javascript">yarn add v-distpicker --save</code></pre>
        </div>
        <div class="block">
          <h5>Register global component</h5>
          <pre><code class="javascript language-javascript">import Distpicker from 'v-distpicker'

Vue.component('v-distpicker', Distpicker)</code></pre>
        </div>
        <div class="block">
          <h5>Register component</h5>
          <pre><code class="javascript language-javascript">import VDistpicker from 'v-distpicker'

export default {
components: { VDistpicker }
}</code></pre>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="blocks">
        <h3 class="text-center mt-3">How to use</h3>
        <div class="block">
          <h5>Base:</h5>
          <pre><code class="javascript language-javascript">&lt;v-distpicker&gt;&lt;/distpicker&gt;</code></pre>
          <p>Example:</p>
          <v-distpicker @province="basicSelectProvince" @city="basicSelectCity" @area="basicSelectArea"></v-distpicker>
          <pre><code class="javascript language-json">{ province: "{{ basicSelect.province }}", city: "{{ basicSelect.city }}", area: "{{ basicSelect.area }}" }</code></pre>
        </div>
        <div class="block">
          <h5>Placeholders:</h5>
          <pre><code class="javascript language-javascript">&lt;v-distpicker :placeholders="placeholders"&gt;&lt;/v-distpicker&gt;

&lt;script&gt;
export default {
  data() {
      return {
          placeholders: {
              province: '------- 省 --------',
              city: '--- 市 ---',
              area: '--- 区 ---',
          }
      }
  }
}
&lt;/script&gt;</code></pre>
          <p>Example:</p>
          <v-distpicker :default-selected-placeholder="false" @province="placeholderSelectProvince" @city="placeholderSelectCity" @area="placeholderSelectArea" :placeholders="placeholders"></v-distpicker>
          <pre><code class="javascript language-json">{ province: "{{ placeholderSelect.province }}", city: "{{ placeholderSelect.city }}", area: "{{ placeholderSelect.area }}" }</code></pre>
        </div>
        <div class="block">
          <h5>Default Province:</h5>
          <pre><code class="javascript language-javascript">&lt;v-distpicker province="广东省"&gt;&lt;/v-distpicker&gt;</code></pre>
          <p>Example:</p>
          <v-distpicker :province="defaultProvinceSelect.province" @province="defaultProvinceSelectProvince" @city="defaultProvinceSelectCity" @area="defaultProvinceSelectArea"></v-distpicker>
          <pre><code class="javascript language-json">{ province: "{{ defaultProvinceSelect.province }}", city: "{{ defaultProvinceSelect.city }}", area: "{{ defaultProvinceSelect.area }}" }</code></pre>
        </div>
        <div class="block">
          <h5>Default Province And City:</h5>
          <pre><code class="javascript language-javascript">&lt;v-distpicker province="广东省" city="广州市"&gt;&lt;/v-distpicker&gt;</code></pre>
          <p>Example:</p>
          <v-distpicker :province="defaultProvinceAndCitySelect.province" :city="defaultProvinceAndCitySelect.city" @province="defaultProvinceAndCitySelectProvince" @city="defaultProvinceAndCitySelectCity" @area="defaultProvinceAndCitySelectArea"></v-distpicker>
          <pre><code class="javascript language-json">{ province: "{{ defaultProvinceAndCitySelect.province }}", city: "{{ defaultProvinceAndCitySelect.city }}", area: "{{ defaultProvinceAndCitySelect.area }}" }</code></pre>
        </div>
        <div class="block">
          <h5>Default Value:</h5>
          <pre><code class="javascript language-javascript">&lt;v-distpicker province="广东省" city="广州市" area="海珠区"&gt;&lt;/v-distpicker&gt;</code></pre>
          <p>Example:</p>
          <v-distpicker :province="defaultValueSelect.province" :city="defaultValueSelect.city" :area="defaultValueSelect.area" @province="defaultValueSelectProvince" @city="defaultValueSelectCity" @area="defaultValueSelectArea"></v-distpicker>
          <pre><code class="javascript language-json">{ province: "{{ defaultValueSelect.province }}", city: "{{ defaultValueSelect.city }}", area: "{{ defaultValueSelect.area }}" }</code></pre>
        </div>
        <div class="block">
          <h5>Hide Area:</h5>
          <pre><code class="javascript language-javascript">&lt;v-distpicker hide-area&gt;&lt;/v-distpicker&gt;</code></pre>
          <p>Example:</p>
          <v-distpicker @province="hideAreaSelectProvince" @city="hideAreaSelectCity" hide-area></v-distpicker>
          <pre><code class="javascript language-json">{ province: "{{ hideAreaSelect.province }}", city: "{{ hideAreaSelect.city }}" }</code></pre>
        </div>
        <div class="block">
          <h5>Only Province:</h5>
          <pre><code class="javascript language-javascript">&lt;v-distpicker only-province&gt;&lt;/v-distpicker&gt;</code></pre>
          <p>Example:</p>
          <v-distpicker @province="onlyProvinceSelectProvince" only-province></v-distpicker>
          <pre><code class="javascript language-json">{ province: "{{ onlyProvinceSelect.province }}" }</code></pre>
        </div>
        <div class="block">
          <h5>Trigger Event:</h5>
          <pre><code class="javascript language-javascript">&lt;v-distpicker @selected="onSelected"&gt;&lt;/v-distpicker&gt;</code></pre>
          <p>Example:</p>
          <v-distpicker @selected="onSelected" @province="basicSelectProvince" @city="basicSelectCity" @area="basicSelectArea"></v-distpicker>
          <pre><code class="javascript language-json">{ province: "{{ basicSelect.province }}", city: "{{ basicSelect.city }}", area: "{{ basicSelect.area }}" }</code></pre>
        </div>
      </div>
      <div class="blocks mobile">
        <h4>Mobile</h4>
        <div class="block">
          <h5>Mobile Basic:</h5>
          <pre><code class="javascript language-javascript">&lt;v-distpicker type="mobile"&gt;&lt;/v-distpicker&gt;</code></pre>
          <p>Example:</p>
          <v-distpicker type="mobile" wrapper="address-wrapper" @province="basicSelectProvince" @city="basicSelectCity" @area="basicSelectArea" address-container="address-container"></v-distpicker>
          <pre><code class="javascript language-json">{ province: "{{ basicSelect.province }}", city: "{{ basicSelect.city }}", area: "{{ basicSelect.area }}" }</code></pre>
        </div>
        <div class="block mobile">
          <h5>Mobile Default Province:</h5>
          <pre><code class="javascript language-javascript">&lt;v-distpicker type="mobile" province="广东省"&gt;&lt;/v-distpicker&gt;</code></pre>
          <p>Example:</p>
          <v-distpicker type="mobile" wrapper="address-wrapper" @province="defaultProvinceSelectProvince" @city="defaultProvinceSelectCity" @area="defaultProvinceSelectArea" address-container="address-container" province="广东省"></v-distpicker>
          <pre><code class="javascript language-json">{ province: "{{ defaultProvinceSelect.province }}", city: "{{ defaultProvinceSelect.city }}", area: "{{ defaultProvinceSelect.area }}" }</code></pre>
        </div>
        <div class="block mobile">
          <h5>Mobile Default Province And City:</h5>
          <pre><code class="javascript language-javascript">&lt;v-distpicker type="mobile" province="广东省" city="广州市"&gt;&lt;/v-distpicker&gt;</code></pre>
          <p>Example:</p>
          <v-distpicker type="mobile" wrapper="address-wrapper" @province="defaultProvinceAndCitySelectProvince" @city="defaultProvinceAndCitySelectCity" @area="defaultProvinceAndCitySelectArea" address-container="address-container" province="广东省" city="广州市"></v-distpicker>
          <pre><code class="javascript language-json">{ province: "{{ defaultProvinceAndCitySelect.province }}", city: "{{ defaultProvinceAndCitySelect.city }}", area: "{{ defaultProvinceAndCitySelect.area }}" }</code></pre>
        </div>
        <div class="block mobile">
          <h5>Mobile Value:</h5>
          <pre><code class="javascript language-javascript">&lt;v-distpicker type="mobile" province="广东省" city="广州市" area="海珠区"&gt;&lt;/v-distpicker&gt;</code></pre>
          <p>Example:</p>
          <v-distpicker type="mobile" wrapper="address-wrapper" @province="defaultValueSelectProvince" @city="defaultValueSelectCity" @area="defaultValueSelectArea" address-container="address-container" :province="defaultValueSelect.province" :city="defaultValueSelect.city" :area="defaultValueSelect.area"></v-distpicker>
          <pre><code class="javascript language-json">{ province: "{{ defaultValueSelect.province }}", city: "{{ defaultValueSelect.city }}", area: "{{ defaultValueSelect.area }}" }</code></pre>
        </div>
        <div class="block mobile">
          <h5>Mobile Hide Area:</h5>
          <pre><code class="javascript language-javascript">&lt;v-distpicker type="mobile" hide-area&gt;&lt;/v-distpicker&gt;</code></pre>
          <p>Example:</p>
          <v-distpicker type="mobile" wrapper="address-wrapper" @province="hideAreaSelectProvince" @city="hideAreaSelectCity" address-container="address-container" :province="hideAreaSelect.province" :city="hideAreaSelect.city" hide-area></v-distpicker>
          <pre><code class="javascript language-json">{ province: "{{ hideAreaSelect.province }}", city: "{{ hideAreaSelect.city }}" }</code></pre>
        </div>
        <div class="block mobile">
          <h5>Mobile Only Province:</h5>
          <pre><code class="javascript language-javascript">&lt;v-distpicker type="mobile" only-province&gt;&lt;/v-distpicker&gt;</code></pre>
          <p>Example:</p>
          <v-distpicker type="mobile" wrapper="address-wrapper" @province="onlyProvinceSelectProvince" address-container="address-container" :province="onlyProvinceSelect.province" only-province></v-distpicker>
          <pre><code class="javascript language-json">{ province: "{{ onlyProvinceSelect.province }}" }</code></pre>
        </div>
        <div class="block mobile">
          <h5>Default Selected Placeholder:</h5>
          <pre><code class="javascript language-javascript">&lt;v-distpicker type="mobile" default-selected-placeholder&gt;&lt;/distpicker&gt;</code></pre>
          <p>Example:</p>
          <v-distpicker type="mobile" wrapper="address-wrapper" @province="defaultSelectedPlaceholderProvince" @city="defaultSelectedPlaceholderCity" @area="defaultSelectedPlaceholderArea" default-selected-placeholder></v-distpicker>
          <pre><code class="javascript language-json">{ province: "{{ defaultSelectedPlaceholder.province }}", city: "{{ defaultSelectedPlaceholder.city }}", area: "{{ defaultSelectedPlaceholder.area }}" }</code></pre>
        </div>
        <div class="block mobile">
          <h5>Mobile Trigger Event:</h5>
          <pre><code class="javascript language-javascript">&lt;v-distpicker type="mobile" @selected="onSelected"&gt;&lt;/v-distpicker&gt;</code></pre>
          <p>Example:</p>
          <v-distpicker type="mobile" wrapper="address-wrapper" @province="basicSelectProvince" @city="basicSelectCity" @area="basicSelectArea" address-container="address-container" @selected="onSelected"></v-distpicker>
          <pre><code class="javascript language-json">{ province: "{{ basicSelect.province }}", city: "{{ basicSelect.city }}", area: "{{ basicSelect.area }}" }</code></pre>
        </div>
      </div>
    </div>
    <div class="row">
      <h3 class="text-center my-5 w-100">Attributes</h3>
      <table class="table table-responsive">
        <thead>
          <tr>
            <th>参数</th>
            <th>说明</th>
            <th>类型</th>
            <th>可选值</th>
            <th>默认值</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>province</strong></td>
            <td><strong>省份（选填）</strong></td>
            <td>String</td>
            <td>省份名</td>
            <td>null</td>
          </tr>
          <tr>
            <td><strong>city</strong></td>
            <td><strong>城市（选填）</strong></td>
            <td>String</td>
            <td>城市名</td>
            <td>null</td>
          </tr>
          <tr>
            <td><strong>area</strong></td>
            <td><strong>地区（选填）</strong></td>
            <td>String</td>
            <td>地区名</td>
            <td>null</td>
          </tr>
          <tr>
            <td><strong>type</strong></td>
            <td><strong>类型（选填，默认 select）</strong></td>
            <td>String</td>
            <td>mobile</td>
            <td>null</td>
          </tr>
          <tr>
            <td><strong>hide-area</strong></td>
            <td><strong>隐藏地区（选填）</strong></td>
            <td>Boolean</td>
            <td>true, false</td>
            <td>false</td>
          </tr>
          <tr>
            <td><strong>onlu-province</strong></td>
            <td><strong>只显示省份（选填）</strong></td>
            <td>Boolean</td>
            <td>true, false</td>
            <td>false</td>
          </tr>
          <tr>
            <td><strong>placeholders</strong></td>
            <td><strong>占位符（选填）</strong></td>
            <td>Object</td>
            <td>province, city, area</td>
            <td>{ province: '省', city: '市', area: '区' }</td>
          </tr>
          <tr>
            <td><strong>wrapper</strong></td>
            <td><strong>外层 Class（选填）</strong></td>
            <td>String</td>
            <td>customize</td>
            <td>address</td>
          </tr>
          <tr>
            <td><strong>address-header</strong></td>
            <td><strong>address-header 样式（选填，类型必须为 mobile）</strong></td>
            <td>String</td>
            <td>customize</td>
            <td>address-header</td>
          </tr>
          <tr>
            <td><strong>address-container</strong></td>
            <td><strong>address-container 样式（选填，类型必须为 mobile）</strong></td>
            <td>String</td>
            <td>customize</td>
            <td>address-contaniner</td>
          </tr>
        </tbody>
      </table>
      <h3 class="text-center my-5 w-100">Methods</h3>
      <table class="table table-responsive d-table">
        <thead>
          <tr>
            <th>方法</th>
            <th>说明</th>
            <th>参数</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>province</strong></td>
            <td><strong>选择省份</strong></td>
            <td>返回省份的值</td>
          </tr>
          <tr>
            <td><strong>city</strong></td>
            <td><strong>选择城市</strong></td>
            <td>返回城市的值</td>
          </tr>
          <tr>
            <td><strong>city</strong></td>
            <td><strong>选择地区</strong></td>
            <td>返回地区的值</td>
          </tr>
          <tr>
            <td><strong>selected</strong></td>
            <td><strong>选择最后一项时触发</strong></td>
            <td>返回省市区的值</td>
          </tr>
        </tbody>
      </table>
    </div>
    <footer>
      <div class="container text-center">
        <p class="heart"></p>
        <nav>
          <a class="nav-link" href="https://github.com/jcc/v-distpicker">GitHub</a>
          <a class="nav-link" href="https://pigjian.com">About</a>
        </nav>
      </div>
    </footer>
  </div>
</template>

<script>
import VDistpicker from '../src/Distpicker'
import './css/styles.css'

export default {
  components: { VDistpicker },
  data() {
    return {
      placeholders: {
        province: '------- 省 --------',
        city: '--- 市 ---',
        area: '--- 区 ---',
      },
      basicSelect: { province: '', city: '', area: '' },
      placeholderSelect: { province: '', city: '', area: '' },
      defaultProvinceSelect: { province: '广东省', city: '', area: '' },
      defaultProvinceAndCitySelect: { province: '广东省', city: '广州市', area: '' },
      defaultValueSelect: { province: '广东省', city: '广州市', area: '海珠区' },
      hideAreaSelect: { province: '', city: '' },
      onlyProvinceSelect: { province: '' },
      defaultSelectedPlaceholder: { province: '', city: '', area: '' },
    }
  },
  methods: {
    onlyProvinceSelectProvince(value) {
      this.onlyProvinceSelect.province = value
      console.log(value);
    },
    hideAreaSelectProvince(value) {
      this.hideAreaSelect.province = value
      console.log(value);
    },
    hideAreaSelectCity(value) {
      this.hideAreaSelect.city = value
      console.log(value);
    },
    defaultProvinceAndCitySelectProvince(value) {
      this.defaultProvinceAndCitySelect.province = value
      console.log(value);
    },
    defaultProvinceAndCitySelectCity(value) {
      this.defaultProvinceAndCitySelect.city = value
      console.log(value);
    },
    defaultProvinceAndCitySelectArea(value) {
      this.defaultProvinceAndCitySelect.area = value
      console.log(value);
    },
    defaultValueSelectProvince(value) {
      this.defaultValueSelect.province = value
      console.log(value);
    },
    defaultValueSelectCity(value) {
      this.defaultValueSelect.city = value
      console.log(value);
    },
    defaultValueSelectArea(value) {
      this.defaultValueSelect.area = value
      console.log(value);
    },
    basicSelectProvince(value) {
      this.basicSelect.province = value
      console.log(value);
    },
    basicSelectCity(value) {
      this.basicSelect.city = value
      console.log(value);
    },
    basicSelectArea(value) {
      this.basicSelect.area = value
      console.log(value);
    },
    placeholderSelectProvince(value) {
      this.placeholderSelect.province = value
      console.log(value);
    },
    placeholderSelectCity(value) {
      this.placeholderSelect.city = value
      console.log(value);
    },
    placeholderSelectArea(value) {
      this.placeholderSelect.area = value
      console.log(value);
    },
    defaultProvinceSelectProvince(value) {
      this.defaultProvinceSelect.province = value
      console.log(value);
    },
    defaultProvinceSelectCity(value) {
      this.defaultProvinceSelect.city = value
      console.log(value);
    },
    defaultProvinceSelectArea(value) {
      this.defaultProvinceSelect.area = value
      console.log(value);
    },
    defaultSelectedPlaceholderProvince(value) {
      this.defaultSelectedPlaceholder.province = value
      console.log(value);
    },
    defaultSelectedPlaceholderCity(value) {
      this.defaultSelectedPlaceholder.city = value
      console.log(value);
    },
    defaultSelectedPlaceholderArea(value) {
      this.defaultSelectedPlaceholder.area = value
      console.log(value);
    },
    onSelected(data) {
      alert(data.province + ' | ' + data.city + ' | ' + data.area)
      console.log(data)
    },
    selectDistrict(value) {
      console.log(value)
    },
  }
}
</script>
