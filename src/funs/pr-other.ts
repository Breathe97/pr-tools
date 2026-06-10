import { arrSlice } from './pr-array'

const throttleMap = new Map<string, number>()
const debounceMap = new Map<string, ReturnType<typeof setTimeout>>()

/**
 * 为 Promise 增加超时
 * @param func 返回 Promise 的异步函数
 * @param _options 可选配置
 * @param _options.timeout 超时毫秒数，默认 5000
 * @param _options.message 超时错误信息，默认 'timeout'
 * @example await exeTimeout(() => fetch('/api'), { timeout: 3000 })
 * @example await exeTimeout(async () => slowTask(), { message: '请求超时' })
 * @example exeTimeout(() => Promise.resolve(1), { timeout: 1000 })
 * @returns 原 Promise 结果，超时则 reject
 */
export const exeTimeout = <T>(func: () => Promise<T>, _options: { timeout?: number; message?: string } = {}) => {
  const { timeout = 5000, message = 'timeout' } = _options
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(message)), timeout)
    func()
      .then((res) => {
        clearTimeout(timer)
        resolve(res)
      })
      .catch((err) => {
        clearTimeout(timer)
        reject(err)
      })
  })
}

/**
 * 将 count 次执行按 step 分批串行执行
 * @param _count 总执行次数，最小 0
 * @param _step 每批执行次数，最小 1
 * @param _cb 批次回调，参数为批次索引与当前批次的索引数组
 * @example await exeStep(98, 7, async (i, counts) => { console.log(i, counts) })
 * @example await exeStep(10, 3, cb)
 * @example await exeStep(0, 5, cb) // 不执行
 * @returns 分批后的索引二维数组
 */
export const exeStep = async (_count: number, _step: number, _cb = async (_index: number, _counts: number[]) => {}) => {
  const count = Math.max(0, _count)
  const step = Math.min(count, Math.max(1, _step))
  const indices = Array.from({ length: count }, (_, k) => k)
  const chunks = arrSlice(indices, step)
  for (const [index, counts] of chunks.entries()) {
    await _cb(index, counts)
  }
  return chunks
}

/**
 * 保证函数至少执行指定毫秒（模拟 loading）
 * @param _func 待执行的同步或异步函数
 * @param _timeout 最小执行时间（毫秒），默认 500
 * @example await exeDelayed(() => fetch('/api'), 500)
 * @example await exeDelayed(async () => { await work() }, 1000)
 * @example const data = await exeDelayed(() => getData(), 300)
 * @returns 原函数返回值
 */
export const exeDelayed = async <T>(_func: () => T | Promise<T>, _timeout = 500) => {
  const deadline = Date.now() + _timeout
  const result = await _func()
  const wait = Math.max(0, deadline - Date.now())
  if (wait > 0) await new Promise((r) => setTimeout(r, wait))
  return result
}

/**
 * 测量函数执行耗时（毫秒）
 * @param _func 待测量的同步或异步函数
 * @example const { elapsed } = await exeElapsed(async () => { await task() })
 * @example const { elapsed, result } = await exeElapsed(() => compute(1))
 * @example await exeElapsed(() => console.log('hi'))
 * @returns 包含 elapsed（耗时 ms）与 result（函数返回值）的对象
 */
export const exeElapsed = async <T>(_func: () => T | Promise<T>) => {
  const start = performance.now()
  const result = await _func()
  return { elapsed: performance.now() - start, result }
}

/**
 * 按 key 节流：delay 毫秒内最多执行一次
 * @param _key 唯一标识，相同 key 共享节流状态
 * @param _func 待节流的函数
 * @param _delay 节流间隔（毫秒）
 * @example throttle('search', () => doSearch(), 300)
 * @example throttle('resize', onResize, 200)
 * @example throttle('submit', submitForm, 1000)
 * @returns void
 */
export const throttle = (_key: string, _func: Function, _delay: number) => {
  const now = Date.now()
  const last = throttleMap.get(_key) ?? 0
  if (now - last >= _delay) {
    throttleMap.set(_key, now)
    _func()
  }
}

/**
 * 按 key 防抖：停止触发 delay 毫秒后执行
 * @param _key 唯一标识，相同 key 共享防抖 timer
 * @param _func 待防抖的函数
 * @param _delay 防抖延迟（毫秒）
 * @example debounce('search', () => doSearch(), 300)
 * @example debounce('input', saveDraft, 500)
 * @example debounce('resize', drawChart, 200)
 * @returns void
 */
export const debounce = (_key: string, _func: Function, _delay: number) => {
  const prev = debounceMap.get(_key)
  if (prev) clearTimeout(prev)
  const timer = setTimeout(() => {
    debounceMap.delete(_key)
    _func()
  }, _delay)
  debounceMap.set(_key, timer)
}
