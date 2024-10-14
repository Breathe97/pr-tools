import * as prTools from '../../src/index.js'
import { uuid, random, randomName, md5, regExps, timeStamp, timeFormat, timeFrom } from '../../src/index.js'

// import { uuid, md5, regTest, timeFormat, timeFrom } from '../../dist/index.js'
// import * as prTools from '../../dist/index.js'

// import { uuid, md5, regTest, timeFormat, timeFrom } from 'pr-tools'
// import * as prTools from 'pr-tools'

// uuid
{
  let str = timeStamp('2024-10-08T06:00:00Z') // 1728396000000 1728367200000
  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:str`, str)
  // str = timeFormat(str, 'YYYY-MM-DD hh:mm:ss')
  str = timeFormat('2024-10-08 06:00:00', 'YYYY-MM-DD hh:mm:ss')
  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:test:timeStamp`, str)
}
