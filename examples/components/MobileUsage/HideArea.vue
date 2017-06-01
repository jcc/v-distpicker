<template>
  <div class="row">
    <div class="example">
      <h5>Hide Area</h5>
      <div class="example-box">
        <div class="box-left d-flex align-items-baseline">
          <div class="col-md-7">
            <v-distpicker type="mobile" wrapper="address-wrapper" @province="selectProvince" @city="selectCity" hide-area></v-distpicker>
          </div>
          <div class="content-show col-md-5">
            <pre><code>{{ select }}</code></pre>
          </div>
        </div>
        <div class="box-right col-md-12" v-if="showCode">
<pre class=" language-javascript code-toolbar"><code class=" language-javascript"><span class="token operator">&lt;</span>template<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>v<span class="token operator">-</span>distpicker type<span class="token operator">=</span><span class="token string">"mobile"</span> hide<span class="token operator">-</span>area<span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>v<span class="token operator">-</span>distpicker<span class="token operator">&gt;</span>
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

<script>
import VDistpicker from '../../../src/Distpicker'

export default {
  components: { VDistpicker },
  data() {
    return {
      showCode: false,
      select: { province: '', city: '' },
    }
  },
  methods: {
    selectProvince(value) {
      this.select.province = value
      console.log(value);
    },
    selectCity(value) {
      this.select.city = value
      console.log(value);
    },
  },
}
</script>
