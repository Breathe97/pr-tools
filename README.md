# 一些常用的 js 方法。

## 立即开始

#### 安装

```bash
npm i pr-tools
```

#### 引入

```js
// 按需引入
import { uuid, random, randomName, md5, regTest, timeFormat, timeFrom, line2hump, hump2line } from 'pr-tools'
// 或全量引入
import * as prTools from 'pr-tools'
```

#### 常用函数

```js
{
  // uuid
  let str = uuid(16, 16) // 长度 进制
  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:test:uuid`, str)
}
{
  // random
  let str = random(100000, 999999) // 6位数字
  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:test:random`, str)
}
{
  // randomName
  let str = randomName(1, 4) // 1-4位昵称
  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:test:randomName`, str)
}
```

#### md5 加密

```js
{
  let str = md5('123456')
  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:test:md5`, str)
}
```

#### regTest 正则表达式验证

```js
{
  let str = regTest.mobile('22')
  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:test:regTest`, str)
}
// 全部方法，使用ts自行索引
// export const regTest = {
//   email,
//   mobile,
//   url,
//   date,
//   dateISO,
//   number,
//   digits,
//   idCard,
//   carNo,
//   amount,
//   chinese,
//   letter,
//   enOrNum,
//   landline
// }
```

#### transfer 转换

```js
// timeFormat 格式化时间
{
  let str = timeFormat(new Date().getTime(), 'yyyy-mm-dd hh:MM:ss')
  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:test:timeFormat`, str)
}
// timeFrom 格式化时间 多久之前
{
  let str = timeFrom(new Date().getTime() - 5600000)
  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:test:timeFrom`, str)
}
// line2hump 短横线转小驼峰
{
  let str = prTools.line2hump('line-hump')
  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:test:line2hump`, str)
}
// hump2line 小驼峰转短横线
{
  let str = prTools.hump2line('lineHump')
  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:test:hump2line`, str)
}
// delSpaces 去除首尾空格
{
  let str = prTools.delSpaces('  del spaces  ')
  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:test:delSpaces`, str)
}
```

## 代码仓库

[github](https://github.com/breathe97/pr-tools)

## 贡献

breathe
