<template>
  <div class="row">
    <div class="example">
      <h5>Default Value</h5>
      <div class="example-box">
        <div class="box-left d-flex align-items-baseline">
          <div class="col-md-7">
            <v-distpicker :province="select.province" :city="select.city" :area="select.area" @province="selectProvince" @city="selectCity" @area="selectArea"></v-distpicker>
          </div>
          <div class="content-show col-md-5">
            <pre><code>{{ select }}</code></pre>
          </div>
        </div>
        <div class="box-right col-md-12" v-if="showCode">
<pre class=" language-javascript code-toolbar"><code class=" language-javascript"><span class="token operator">&lt;</span>template<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>v<span class="token operator">-</span>distpicker <span class="token punctuation">:</span>province<span class="token operator">=</span><span class="token string">"select.province"</span> <span class="token punctuation">:</span>city<span class="token operator">=</span><span class="token string">"select.city"</span> <span class="token punctuation">:</span>area<span class="token operator">=</span><span class="token string">"select.area"</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>v<span class="token operator">-</span>distpicker<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>template<span class="token operator">&gt;</span>

<span class="token operator">&lt;</span>script<span class="token operator">&gt;</span>
<span class="token keyword">import</span> VDistpicker <span class="token keyword">from</span> <span class="token string">'v-distpicker'</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  components<span class="token punctuation">:</span> <span class="token punctuation">{</span> VDistpicker <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      select<span class="token punctuation">:</span> <span class="token punctuation">{</span> province<span class="token punctuation">:</span> <span class="token string">'广东省'</span><span class="token punctuation">,</span> city<span class="token punctuation">:</span> <span class="token string">'广州市'</span><span class="token punctuation">,</span> area<span class="token punctuation">:</span> <span class="token string">'海珠区'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
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

<script>
import VDistpicker from '../../../src/Distpicker'

export default {
  components: { VDistpicker },
  data() {
    return {
      showCode: false,
      select: { province: 440000, city: '广州市', area: '海珠区' },
    }
  },
  methods: {
    selectProvince(value) {
      this.select.province = value.value
      console.log(value);
    },
    selectCity(value) {
      this.select.city = value.value
      console.log(value);
    },
    selectArea(value) {
      this.select.area = value.value
      console.log(value);
    },
  },
}
</script>
