/**
 *
 *  数据转换
 *
 */

import { isDistCode } from "./util";

/**
 *  https://github.com/jcc/v-distpicker/issues/78
 *
 *  如果只传入区级code,自动推导显示省市区
 *
 */
function autoCompleteDistCode(codeVal, type) {
  let provinceCode = codeVal.toString().slice(0, 2) + `0000`;
  let cityCode = "";
  if (type == "city") {
    return { provinceCode, cityCode: codeVal };
  }
  if (type == "area") {
    cityCode = codeVal.toString().slice(0, 4) + `00`;
    return { provinceCode, cityCode };
  }
}

export { autoCompleteDistCode };
