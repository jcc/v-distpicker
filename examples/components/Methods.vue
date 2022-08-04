<template>
  <div class="row">
    <div class="blocks">
      <h3 class="text-center mt-5">Methods</h3>
      <div class="block">
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
              <td><strong>手动选择省份</strong></td>
              <td>返回省份的值</td>
            </tr>
            <tr>
              <td><strong>city</strong></td>
              <td><strong>手动选择城市</strong></td>
              <td>返回城市的值</td>
            </tr>
            <tr>
              <td><strong>area</strong></td>
              <td><strong>手动选择地区</strong></td>
              <td>返回地区的值</td>
            </tr>
            <tr>
              <td><strong>selected</strong></td>
              <td><strong>手动选择最后一项时触发,返回省市区的值</strong></td>
              <td>{ province:{code,value},city:{code,value},,area:{code,value} }</td>
            </tr>
            <tr>
              <td><strong>change-province</strong></td>
              <td><strong>省份值发生变化</strong></td>
              <td>{code,value}</td>
            </tr>
             <tr>
              <td><strong>change-city</strong></td>
              <td><strong>城市值发生变化</strong></td>
              <td>{code,value}</td>
            </tr>
            <tr>
              <td><strong>change-area</strong></td>
              <td><strong>区域值发生变化</strong></td>
              <td>{code,value}</td>
            </tr>
            <tr>
              <td><strong>change</strong></td>
              <td><strong>变化最后一项时触发,返回省市区的值</strong></td>
              <td>{ province:{code,value},city:{code,value},,area:{code,value} }</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
