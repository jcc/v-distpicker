function toString(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}

function isEmpty(value) {
  if (value == null) {
    return true
  }
  if (toString(value) == 'string') {
    value = value.replace(/\s+/g, '')
    if (value.length == 0) {
      return true
    }
  }
  return false
}

/**
 * 是否包含为中文
 * @param {*} str
 * @returns
 */
function isChn(str) {
  return /[\u4E00-\u9FA5]/.test(str)
}
export { toString, isChn, isEmpty }
