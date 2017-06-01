<template>
  <div class="row">
    <div class="blocks">
      <h3 class="text-center mt-5">Attributes</h3>
      <div class="block">
        <table class="table table-responsive d-table">
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
              <td><strong>static-placeholder</strong></td>
              <td><strong>是否将占位符显示为已经选择的项（仅 type='mobile' 时有效）</strong></td>
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
      </div>
    </div>
  </div>
</template>
