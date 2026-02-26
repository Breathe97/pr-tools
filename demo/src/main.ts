import * as prTools from '../../src/index.js'
import { uuid, random, randomName, md5, timeFormat, timeFrom, arrFromEnum, h_timestamp } from '../../src/index.js'

// import { uuid, md5, regTest, timeFormat, timeFrom } from '../../dist/index.js'
// import * as prTools from '../../dist/index.js'

// import { uuid, md5, regTest, timeFormat, timeFrom } from 'pr-tools'
// import * as prTools from 'pr-tools'

{
  const video = document.createElement('video')
  video.style.width = '200px'
  video.style.height = '200px'
  const stream = prTools.createFakeVideoStream({ width: 40, height: 40, opacity: 1 })
  if (stream) {
    video.srcObject = stream
    video.play()
  }
  document.querySelector('#app')?.appendChild(video)
}

// uuid
{
  let str = uuid(32, 16)
  console.log('\x1b[38;2;0;151;255m%c%s', 'color:#0097ff', `------->Breathe: test:uuid`, str)
}
{
  // random
  let str = random(100000, 999999) // 6位数字
  console.log('\x1b[38;2;0;151;255m%c%s', 'color:#0097ff', `------->Breathe: test:random`, str)
}
{
  // randomName
  let str = randomName(2, 4) // 2-4位昵称
  console.log('\x1b[38;2;0;151;255m%c%s', 'color:#0097ff', `------->Breathe: test:randomName`, str)
}
// filterKeys
{
  const obj = { name: 'a', age: 10, phone: 22, 1: 3, '2': 44 }
  let res = prTools.filterKeys(obj, ['phone', 'age', 1])
  console.log('\x1b[38;2;0;151;255m%c%s', 'color:#0097ff', `------->Breathe: res`, res)
}

// arrFilterDup
{
  const arr = [
    { name: 'a', age: 10, phone: 123 },
    { name: 'b', age: 12, phone: 456 },
    { name: 'c', age: 10, phone: 789 }
  ]
  let res = prTools.arrFilterDup(arr, ['age'], true)
  console.log('\x1b[38;2;0;151;255m%c%s', 'color:#0097ff', `------->Breathe: res`, res)
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
  console.log('\x1b[38;2;0;151;255m%c%s', 'color:#0097ff', `------->Breathe: res`, res)

  // 另外可能会用到的定义
  type O = typeof enum_template
  type K = keyof O // "lable_1" | "lable_2" | "lable_3" | "lable_4"
  type V = O[K] // "value_1" | "value_2" | "value_3" | "value_4"
}

// md5
{
  let str = md5('123456')
  console.log('\x1b[38;2;0;151;255m%c%s', 'color:#0097ff', `------->Breathe: test:md5`, str)
}

// timeFormat
{
  let str = timeFormat('2025/12/30 23:00:00', '当前时间为：YYYY-MM-DD hh:mm:ss 星期WW 今年的第d天 第w周')
  console.log('\x1b[38;2;0;151;255m%c%s', 'color:#0097ff', `------->Breathe: test:timeFormat`, str)
}

{
  // 生成本月的每一天 分割当天 偏移到后一天
  let str = prTools.timeRange(new Date(), { range: 'month', split: true, offset_d: 1 })
  console.log('\x1b[38;2;0;151;255m%c%s', 'color:#0097ff', `------->Breathe: test.timeRange`, str)
}
{
  // 生成本周的每一天 不分隔当天 不偏移
  let str = prTools.timeRange(new Date(), { range: 'week', split: false, offset_d: 0 })
  console.log('\x1b[38;2;0;151;255m%c%s', 'color:#0097ff', `------->Breathe: test:timeRange`, str)
}
// timeDimension
{
  const now = new Date().getTime()
  let res = prTools.timeDimension(now, now, 'H')
  console.log('\x1b[38;2;0;151;255m%c%s', 'color:#0097ff', `------->Breathe: timeDimension`, res)
}
{
  // 生成今天开始的后面7天 分割当天 偏移到前一天
  let str = prTools.timeRange(new Date(), { range: 7, split: true, offset_d: -1 })
  console.log('\x1b[38;2;0;151;255m%c%s', 'color:#0097ff', `------->Breathe: test:timeRange`, str)
}

// timeFrom
{
  let str = timeFrom(new Date().getTime() - h_timestamp)
  console.log('\x1b[38;2;0;151;255m%c%s', 'color:#0097ff', `------->Breathe: test:timeFrom`, str)
}
// line2hump
{
  let str = prTools.line2hump('asd-daa')
  console.log('\x1b[38;2;0;151;255m%c%s', 'color:#0097ff', `------->Breathe: test:line2hump`, str)
}
// hump2line
{
  let str = prTools.hump2line('AddaDdd')
  console.log('\x1b[38;2;0;151;255m%c%s', 'color:#0097ff', `------->Breathe: test:hump2line`, str)
}
// bytesFormat
{
  // let res = prTools.bytesFormat(random(10000000, 100000000) * random(10000000, 100000000))
  let res = prTools.bytesFormat('-89016')
  console.log('\x1b[38;2;0;151;255m%c%s', 'color:#0097ff', `------->Breathe: bytesFormat`, res)
}

{
  const arr = [
    { name: '123', age: 14, sex: 0 },
    { name: '456', age: 14, sex: 0 },
    { name: '789', age: 12, sex: 1 }
  ]
  let res = prTools.groupBy(arr, (item) => `${item.age}-${item.sex}`)
  console.log('\x1b[38;2;0;151;255m%c%s', 'color:#0097ff', `------->Breathe: groupBy`, res)
}

// exeStep
{
  let res = await prTools.exeStep(80, 10, async (_index, _cuonts) => {
    await new Promise((resolve) => setTimeout(() => resolve(true), 1000))
    console.log('\x1b[38;2;0;151;255m%c%s', 'color:#0097ff;', `------->Breathe: _index, _cuonts`, _index, _cuonts)
  })
  console.log('\x1b[38;2;0;151;255m%c%s', 'color:#0097ff', `------->Breathe: res`, res)
}
