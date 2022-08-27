const DISTCODE_LENGTH = 6

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
 *  判断 省市区 code
 *  区级code,自动推导省市
 */
function isDistCode(str) {
  if (isEmpty(str)) return false
  if (isChn(str)) return false
  if (str.toString().length != DISTCODE_LENGTH) return false
  if (isNaN(parseInt(str))) return false
  return true
}

/**
 * 是否包含为中文
 * @param {*} str
 * @returns
 */
function isChn(str) {
  return /[\u4E00-\u9FA5]/.test(str)
}

const ua = navigator.userAgent.toLowerCase()
const isMobile = /ios|iphone|ipod|ipad|android/.test(ua)

const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

export { toString, isChn, isEmpty, isDistCode, clamp, isMobile }
