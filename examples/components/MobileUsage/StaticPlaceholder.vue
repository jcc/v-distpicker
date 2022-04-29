<template>
  <div class="row">
    <div class="example">
      <h5>Placeholders</h5>
      <div class="example-box">
        <div class="box-left d-flex align-items-baseline">
          <div class="col-md-7">
            <v-distpicker type="mobile" static-placeholder @province="selectProvince" @city="selectCity" @area="selectArea"></v-distpicker>
          </div>
          <div class="content-show col-md-5">
            <pre><code>{{ select }}</code></pre>
          </div>
        </div>
        <div v-if="showCode" class="box-right col-md-12">
          <pre
            class="language-javascript code-toolbar"
          ><code class=" language-javascript"><span class="token operator">&lt;</span>template<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>v<span class="token operator">-</span>distpicker type<span class="token operator">=</span><span class="token string">"mobile"</span> <span class="token keyword">static</span><span class="token operator">-</span>placeholder<span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>v<span class="token operator">-</span>distpicker<span class="token operator">&gt;</span>
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
let showCode = $ref(false)
let select = $ref({ province: '', city: '', area: '' })
let placeholders = $ref({
  province: '--- 省 ----',
  city: '--- 市 ---',
  area: '--- 区 ---',
})

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
</script>
