<template>
    <div class="row">
        <div class="example">
            <h5>Disabled Value</h5>
            <div class="example-box">
                <div class="box-left d-flex align-items-baseline">
                    <div class="col-md-7">
                        <v-distpicker :province="select.province" :city="select.city" :area="select.area"
                                      @province="selectProvince" @city="selectCity" @area="selectArea"
                                      :province-disabled="true" :city-disabled="true"></v-distpicker>
                    </div>
                    <div class="content-show col-md-5">
                        <pre><code>{{ select }}</code></pre>
                    </div>
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
		components: {VDistpicker},
		data() {
			return {
				showCode: false,
				select: {province: 440000, city: '广州市', area: '海珠区'},
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
