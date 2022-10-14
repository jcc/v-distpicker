import { isChn, isEmpty } from './util'



import DEFAULT_DATA from './districts'

export const useHandler = (props) => {

  let provinceData = props.provinceSource || DEFAULT_DATA.province_list
  let cityData = props.citySource || DEFAULT_DATA.city_list
  let areaData = props.areaSource || DEFAULT_DATA.area_list



  /**
   * 根据名称 或 编码 ,返回下拉框选项
   * 名称转换为编码查找
   *@param codeOrName 名称 或 编码
   *
   */
  const getProvinceList = () => {
    return provinceData
  }

  const getCityList = (codeOrName) => {
    let code = isChn(codeOrName) ? getProvinceVal(codeOrName, true) : codeOrName
    return cityData[code] || []
  }

  const getAreaList = (codeOrName) => {
    let code = isChn(codeOrName) ? getCityVal(codeOrName, true) : codeOrName
    return areaData[code] || []
  }
  /**
   * 传入code 比较name
   * 传入name 比较code
   * @param {*} val
   * @param {*} itemCode
   * @param {*} data
   * @param {*} isName
   * @returns
   */
  const getTransformData = (val, itemCode, data, isName) => {
    if (isName) {
      if (data[itemCode] == val) return itemCode
    } else {
      if (itemCode == val) return data[itemCode]
    }
    return null
  }

  /**
   * 查找
   * @param provinceVal 值
   * @param data 数据源,默认从所有数据查找
   * @param isName false 传入编码 返回 名称，true 传入名称 返回 编码
   */
  const getCityVal = (cityVal, isName = false, data) => {
    if (data) {
      for (let itemCode in data) {
        let val = getTransformData(cityVal, itemCode, data, isName)
        if (val) return val
      }
    } else {
      let cityArr = Object.values(cityData)
      for (let item of cityArr) {
        for (let itemCode in item) {
          let val = getTransformData(cityVal, itemCode, item, isName)
          if (val) return val
        }
      }
    }
    return cityVal
  }

  const getProvinceVal = (provinceVal, isName = false) => {
    for (let itemCode in provinceData) {
      let val = getTransformData(provinceVal, itemCode, provinceData, isName)
      if (val) return val
    }
    return provinceVal
  }

  const getAreaVal = (areaVal, isName = false, data) => {
    if (data) {
      for (let itemCode in data) {
        let val = getTransformData(areaVal, itemCode, data, isName)
        if (val) return val
      }
    } else {
      let areaArr = Object.values(areaData)
      for (let item of areaArr) {
        for (let itemCode in item) {
          let val = getTransformData(areaVal, itemCode, item, isName)
          if (val) return val
        }
      }
    }
    return areaVal
  }

  /**
   * 查找
   */
  const getCodeValue = (codeOrName, type, data) => {
    if (isEmpty(codeOrName)) return { name: '', value: '' }
    let value = ''
    switch (type) {
      case 'area':
        value = getAreaVal(codeOrName, isChn(codeOrName), data)
        break
      case 'city':
        value = getCityVal(codeOrName, isChn(codeOrName), data)
        break
      case 'province':
        value = getProvinceVal(codeOrName, isChn(codeOrName))
        break
    }
    return isChn(codeOrName) ? { name: codeOrName, code: value } : { name: value, code: codeOrName }
  }

  return {
    getProvinceList,
    getCityList,
    getAreaList,
    getProvinceVal,
    getAreaVal,
    getCityVal,
    getCodeValue,
  }
}
