const DISTCODE_LENGTH = 6;

function toString(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}

function isEmpty(value) {
  if (value == null) {
    return true;
  }
  if (toString(value) == "string") {
    value = value.replace(/\s+/g, "");
    if (value.length == 0) {
      return true;
    }
  }
  return false;
}

/**
 *
 * 简单的判断是否是 省市区 code
 * 如何是 区级code,自动推导省市
 * 如何是 市级code,自动推导省
 */
function isDistCode(str) {
  if (isEmpty(str)) return false;
  if (isChn(str)) return false;
  if (str.toString().length != DISTCODE_LENGTH) return false;
  if (isNaN(parseInt(str))) return false;
  return true;
}

/**
 * 是否包含为中文
 * @param {*} str
 * @returns
 */
function isChn(str) {
  return /[\u4E00-\u9FA5]/.test(str);
}
export { toString, isChn, isEmpty, isDistCode };
