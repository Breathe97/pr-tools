import * as prTools from '../../src/index'

const getData = async () => {
  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;', `------->Breathe:开始请求`)
  await new Promise((resolve) => setTimeout(() => resolve(true), 2000))
  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;', `------->Breathe:完成请求`)
  return 123
}

const func = async () => {
  let res = await getData()
  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;', `------->Breathe:res`)
}

const aa = async () => {
  await prTools.exeDelayed(func, 500)
  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;', `------->Breathe:2222`)
}
aa()
