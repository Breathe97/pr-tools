import * as prTools from '../../src/index.js'

let arr = [
  { lable: 'a', value: '1' },
  { lable: 'b', value: '2' },
  { lable: 'c', value: '3' },
  { lable: 'd', value: '4', aa: 2 },
  { lable: 'e', value: '5' },
  { lable: 'f', value: 'aaa', 1: 22 }
] as const

const arrValMap = (_arr = [], _keys = ['lable', 'value']) => {
  const [_key, _val] = _keys
  const obj: { [key: keyof typeof _key] } = {}
  for (const _obj of _arr) {
    const key = _obj[_key]
    const val = _obj[_val]
    obj[key] = val
  }
  return obj
}

const enum_names = { name: '' } as const
type O = typeof enum_names
type K = keyof O
type V = O[K]
let res = prTools.arrFromEnum(enum_names, 'key', 'val')
// res[0].

console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:res`, res)
