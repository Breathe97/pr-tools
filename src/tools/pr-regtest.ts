/**
 * 验证电子邮箱格式
 * @param {String} value 需要校验的字符串
 * @returns {Boolean} boolean
 */
function email(value = '') {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value)
}

/**
 * 验证手机格式
 * @param {String} value 需要校验的字符串
 * @returns {Boolean} boolean
 */
function mobile(value = '') {
  return /^1[3-9]\d{9}$/.test(value)
}

/**
 * 验证URL格式
 * @param {String} value 需要校验的字符串
 * @returns {Boolean} boolean
 */
function url(value = '') {
  return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(value)
}

/**
 * 验证日期格式
 * @param {String} value 需要校验的字符串
 * @returns {Boolean} boolean
 */
function date(value = '') {
  return !/Invalid|NaN/.test(new Date(value).toString())
}

/**
 * 验证ISO类型的日期格式
 * @param {String} value 需要校验的字符串
 * @returns {Boolean} boolean
 */
function dateISO(value = '') {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value)
}

/**
 * 验证十进制数字
 * @param {String} value 需要校验的字符串
 * @returns {Boolean} boolean
 */
function number(value = '') {
  return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value)
}

/**
 * 验证整数
 * @param {String} value 需要校验的字符串
 * @returns {Boolean} boolean
 */
function digits(value = '') {
  return /^\d+$/.test(value)
}

/**
 * 验证身份证号码
 * @param {String} value 需要校验的字符串
 * @returns {Boolean} boolean
 */
function idCard(value = '') {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value)
}

/**
 * 是否车牌号
 * @param {String} value 需要校验的字符串
 * @returns {Boolean} boolean
 */
function carNo(value = '') {
  // 新能源车牌
  const xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/
  // 旧车牌
  const creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/
  if (value.length === 7) {
    return creg.test(value)
  } else if (value.length === 8) {
    return xreg.test(value)
  } else {
    return false
  }
}

/**
 * 是否为2位小数的金额
 * @param {String} value 需要校验的字符串
 * @returns {Boolean} boolean
 */
function amount(value = '') {
  //金额，只允许保留两位小数
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value)
}

/**
 * 是否为中文汉字
 * @param {String} value 需要校验的字符串
 * @returns {Boolean} boolean
 */
function chinese(value = '') {
  let reg = /^[\u4e00-\u9fa5]+$/gi
  return reg.test(value)
}

/**
 * 是否为字母
 * @param {String} value 需要校验的字符串
 * @returns {Boolean} boolean
 */
function letter(value = '') {
  return /^[a-zA-Z]*$/.test(value)
}

/**
 * 是否为字母或者数字
 * @param {String} value 需要校验的字符串
 * @returns {Boolean} boolean
 */
function enOrNum(value = '') {
  //英文或者数字
  let reg = /^[0-9a-zA-Z]*$/g
  return reg.test(value)
}

/**
 * 是否为固定电话
 * @param {String} value 需要校验的字符串
 * @returns {Boolean} boolean
 */
function landline(value = '') {
  let reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/
  return reg.test(value)
}

export const regTest = {
  email,
  mobile,
  url,
  date,
  dateISO,
  number,
  digits,
  idCard,
  carNo,
  amount,
  chinese,
  letter,
  enOrNum,
  landline
}
