import { uuid, md5, regTest, timeFormat, timeFrom } from '../dist/index.js'
import * as prTools from '../dist/index.js'

// import { uuid, md5, regTest, timeFormat, timeFrom } from "../dist/index.js";
// import * as prTools from "../dist/index.js";
// uuid
{
  let str = uuid(16, 16)
  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:test:uuid`, str)
}
// md5
{
  let str = md5('123456')
  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:test:md5`, str)
}

// regTest
{
  let str = regTest.mobile('22')
  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:test:regTest`, str)
}

// timeFormat
{
  let str = timeFormat(`${new Date().getTime()}`, 'yyyy-mm-dd hh:MM:ss')
  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:test:timeFormat`, str)
}
// timeFrom
{
  let str = timeFrom(`${new Date().getTime() - 5600000}`)
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
