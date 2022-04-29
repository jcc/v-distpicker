<template>
  <div class="row">
    <div class="example">
      <h5>Trigger Event</h5>
      <div class="example-box">
        <div class="box-left d-flex align-items-baseline">
          <div class="col-md-7">
            <v-distpicker @selected="onSelected" @province="selectProvince" @city="selectCity" @area="selectArea"></v-distpicker>
          </div>
          <div class="content-show col-md-5">
            <pre><code>{{ select }}</code></pre>
          </div>
        </div>
        <div v-if="showCode" class="box-right col-md-12">
          <pre
            class="language-javascript code-toolbar"
          ><code class=" language-javascript"><span class="token operator">&lt;</span>template<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>v<span class="token operator">-</span>distpicker @selected<span class="token operator">=</span><span class="token string">"onSelected"</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>v<span class="token operator">-</span>distpicker<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>template<span class="token operator">&gt;</span>

<span class="token operator">&lt;</span>script<span class="token operator">&gt;</span>
<span class="token keyword">import</span> VDistpicker <span class="token keyword">from</span> <span class="token string">'v-distpicker'</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  components<span class="token punctuation">:</span> <span class="token punctuation">{</span> VDistpicker <span class="token punctuation">}</span><span class="token punctuation">,</span>
  methods<span class="token punctuation">:</span> <span class="token punctuation">{</span>
    <span class="token function">onSelected</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">alert</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span>province <span class="token operator">+</span> <span class="token string">' | '</span> <span class="token operator">+</span> data<span class="token punctuation">.</span>city <span class="token operator">+</span> <span class="token string">' | '</span> <span class="token operator">+</span> data<span class="token punctuation">.</span>area<span class="token punctuation">)</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
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
let showCode = $ref(false)
let select = $ref({ province: '', city: '', area: '' })

function selectProvince(value) {
  select.province = value
  console.log(value)
}
function selectCity(value) {
  select.city = value
  console.log(value)
}
function selectArea(value) {
  select.area = value
  console.log(value)
}
function onSelected(data) {
  alert(data.province.value + ' | ' + data.city.value + ' | ' + data.area.value)
  console.log(data)
}
</script>
