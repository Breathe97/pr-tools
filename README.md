# 一些常用的 js 方法。

## 立即开始

#### 安装

```bash
npm i pr-tools
```

#### 引入

```js
// 按需引入
import { uuid, random, randomName, md5, regExps, timeFormat, timeFrom, line2hump, hump2line } from 'pr-tools'
// 或全量引入
import * as prTools from 'pr-tools'
```

#### 常用函数

```js
// uuid
{
  let str = uuid(32, 16)
  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:test:uuid`, str)
}

{
  // random
  let str = random(100000, 999999) // 6位数字
  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:test:random`, str)
}

{
  // randomName
  let str = randomName(2, 4) // 2-4位昵称
  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:test:randomName`, str)
}

// md5
{
  let str = md5('123456')
  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:test:md5`, str)
}

// filterKeys
{
  const obj = { name: 'a', age: 10, phone: 22, 1: 3, 2: 44 }
  let res = prTools.filterKeys(obj, ['phone', 'age', 1])
  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:res`, res)
}

// arrFilterDup
{
  const arr = [
    { name: 'a', age: 10, phone: 123 },
    { name: 'b', age: 12, phone: 456 },
    { name: 'c', age: 10, phone: 789 }
  ]
  let res = prTools.arrFilterDup(arr, ['age'], true)
  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:res`, res)
}
```

#### md5 加密

```js
{
  let str = md5('123456')
  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:test:md5`, str)
}
```

#### regExps 正则表达式

```js
{
  let str = regExps.mobile.test('222')
  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:test:regExps`, str)
}

// 其他正则
export const regExps = {
  /**
   * 验证电子邮箱格式
   */
  email: new RegExp(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/),

  /**
   * 验证手机格式
   */
  mobile: new RegExp(/^1[3-9]\d{9}$/),

  /**
   * 验证URL格式
   */
  url: new RegExp(/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/),

  /**
   * 验证ISO类型的日期格式
   */
  dateISO: new RegExp(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/),

  /**
   * 验证十进制数字
   */
  number: new RegExp(/^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/),

  /**
   * 验证整数
   */
  digits: new RegExp(/^\d+$/),

  /**
   * 验证身份证号码
   */
  idCard: new RegExp(/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/),

  /**
   * 是否车牌号
   */
  carNo: new RegExp(/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/),

  /**
   * 是否新能源车牌号
   */
  carNoXNY: new RegExp(/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/),

  /**
   * 是否为2位小数的金额
   */
  amount: new RegExp(/^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/),

  /**
   * 是否为中文汉字
   */
  chinese: new RegExp(/^[\u4e00-\u9fa5]+$/),

  /**
   * 是否为字母
   */
  letter: new RegExp(/^[a-zA-Z]*$/),

  /**
   * 是否为字母或者数字
   */
  enOrNum: new RegExp(/^[0-9a-zA-Z]*$/),

  /**
   * 是否为固定电话
   */
  landline: new RegExp(/^\d{3,4}-\d{7,8}(-\d{3,4})?$/)
}
```

#### transfer 转换

```js
// timeStamp
{
  // let str = timeStamp('2024/09/24 04:06:06', 480) // 获取中国时间
  let str = timeStamp('2024/09/24 04:06:06', 0) // 获取目标时间的 utc 时间戳
  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:test:timeStamp`, str)
}

// timeFormat
{
  let str = timeFormat('2024/09/24 04:06:06', 'YYYY-MM-DD hh:mm:ss')
  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:test:timeFormat`, str)
}

// timeFrom
{
  let str = timeFrom(new Date().getTime() - 5600000)
  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:test:timeFrom`, str)
}

// line2hump
{
  let str = prTools.line2hump('asd-daa')
  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:test:line2hump`, str)
}

// hump2line
{
  let str = prTools.hump2line('AddaDdd')
  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:test:hump2line`, str)
}

// bytesFormat
{
  let res = prTools.bytesFormat(22222)
  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:res`, res)
}
```

## 代码仓库

[github](https://github.com/breathe97/pr-tools)

## 贡献

breathe
