import * as prTools from '../../src/index.js'
import { uuid, random, randomName, md5, timeFormat, timeFrom, arrFromEnum } from '../../src/index.js'

// import { uuid, md5, regTest, timeFormat, timeFrom } from '../../dist/index.js'
// import * as prTools from '../../dist/index.js'

// import { uuid, md5, regTest, timeFormat, timeFrom } from 'pr-tools'
// import * as prTools from 'pr-tools'

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
// filterKeys
{
  const obj = { name: 'a', age: 10, phone: 22, 1: 3, '2': 44 }
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

// arrFromEnum
{
  const enum_template = {
    lable_1: 'value_1',
    lable_2: 'value_2',
    lable_3: 'value_3',
    lable_4: 'value_4'
  } as const

  const res = arrFromEnum(enum_template, 'key')
  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:res`, res)

  // 另外可能会用到的定义
  type O = typeof enum_template
  type K = keyof O // "lable_1" | "lable_2" | "lable_3" | "lable_4"
  type V = O[K] // "value_1" | "value_2" | "value_3" | "value_4"
}

// md5
{
  let str = md5('123456')
  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:test:md5`, str)
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
