<template>
  <div class="row">
    <div class="example">
      <h5>ChangeValue</h5>
      <div class="example-box">
        <div class="box-left d-flex align-items-baseline">
          <div class="col-md-7">
            <v-distpicker :province="select.province" :city="select.city" :area="select.area" @selected="onSelect" @change="onChange" @province="selectProvince" @city="selectCity" @area="selectArea"></v-distpicker>
            <button class="btn btn-primary btn-sm example-btn" @click="changeSetCode">setByCode</button>
            <button class="btn btn-primary btn-sm example-btn" @click="changeSetName">setByName</button>
          </div>
          <div class="content-show col-md-5">
            <pre><code>{{ select }}</code></pre>
          </div>
        </div>
        <div v-if="showCode" class="box-right col-md-12">
          <pre
            class="language-javascript code-toolbar"
          ><code class=" language-javascript"><span class="token operator">&lt;</span>template<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>v<span class="token operator">-</span>distpicker<span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>v<span class="token operator">-</span>distpicker<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>template<span class="token operator">&gt;</span>

<span class="token operator">&lt;</span>script<span class="token operator">&gt;</span>
<span class="token keyword">import</span> VDistpicker <span class="token keyword">from</span> <span class="token string">'v-distpicker'</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  components<span class="token punctuation">:</span> <span class="token punctuation">{</span> VDistpicker <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span></code></pre>
        </div>
        <div class="box-footer" @click="showCode = !showCode">
          {{ showCode ? 'Hide Code' : 'Show Code' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
let showCode = $ref(false)
let select = reactive({ province: '', city: '', area: '' })
function onSelect(data) {
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
function changeSetCode() {
   select.province = 810000
   select.city = '810100'
   select.area = 810104
}
function onChange({ province, city, area }) {
    select.province = province.value
    select.city = city.value
    select.area = area.value
    console.log('change',{ province, city, area })
  }
function changeSetName() { 
  select.province = '台湾省'
  select.city = '台北市'
  select.area = 710101
}

</script>
