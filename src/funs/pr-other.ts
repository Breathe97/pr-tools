import { arrSlice } from './pr-array'

/**
 * 分段执行
 * @param _cuont 一共执行多少次 最小为 0
 * @param _step 每次执行多少次 最小为 1
 * @example exeStep(98, 7, ()=>{})
 * @returns 筛选后结果 传入对象返回对象 传入数组返回数组
 */
export const exeStep = async (_cuont: number, _step: number, _cb = async (_index: number, _cuonts: number[]) => {}) => {
  const cuont = Math.max(0, _cuont)
  const step = Math.min(cuont, Math.max(1, _step))

  let arr = Array(cuont)
  arr = Array.from(arr, (_, k) => k)
  arr = arrSlice(arr, step)
  for (const [index, cuonts] of arr.entries()) {
    await _cb(index, cuonts)
  }
  return arr
}

/**
 * 延迟执行 强制将请求延长时间以模拟 loading
 * @param _func 需要执行的函数
 * @param _timeout 最小执行时间ms 默认 500ms
 * @example exeDelayed(()=>{}, 500)
 * @returns
 */
export const exeDelayed = async (_func: Function, _timeout: number = 500) => {
  const exe_timestamp = Date.now() + _timeout // 记录可执行时间
  return new Promise(async (resolve) => {
    const res = await _func()
    const offset_timestamp = Math.max(0, exe_timestamp - Date.now()) // 计算还需要等待的时间
    await new Promise((resolve) => setTimeout(() => resolve(true), offset_timestamp)) // 等待时间
    resolve(res)
  })
}
