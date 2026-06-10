import { arrSlice } from './pr-array'

const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/**
 * ArrayBuffer 转十六进制字符串
 * @example ab2hex(new Uint8Array([255, 0, 15]).buffer) // 'FF000F'
 * @example ab2hex(new ArrayBuffer(0)) // ''
 * @example ab2hex(buffer)
 * @returns 大写十六进制字符串
 */
export const ab2hex = (_buffer: ArrayBuffer = new ArrayBuffer(0)): string => {
  if (!_buffer || _buffer.byteLength === 0) return ''
  return Array.from(new Uint8Array(_buffer), (bit) => bit.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase()
}

/**
 * 十六进制字符串转 ArrayBuffer
 * @example hex2ab('FF00') // 2 字节 buffer
 * @example hex2ab('0x48656c6c6f')
 * @example hex2ab('414243') // 'ABC'
 * @returns ArrayBuffer
 */
export const hex2ab = (_str: string = ''): ArrayBuffer => {
  const hex = _str.trim().replace(/^0x/i, '')
  if (hex.length % 2 !== 0) throw new Error('hex2ab: 十六进制长度必须为偶数')
  const buffer = new ArrayBuffer(hex.length / 2)
  const view = new DataView(buffer)
  for (let i = 0; i < hex.length; i += 2) {
    view.setUint8(i / 2, parseInt(hex.slice(i, i + 2), 16))
  }
  return buffer
}

/**
 * 十六进制转 ASCII 字符串
 * @example hex2str('48656c6c6f') // 'Hello'
 * @example hex2str('0x414243') // 'ABC'
 * @example hex2str('61') // 'a'
 * @returns ASCII 字符串，非法输入返回 ''
 */
export const hex2str = (_hexCharCodeStr: string = ''): string => {
  const trimmed = _hexCharCodeStr.trim()
  const rawStr = trimmed.slice(0, 2).toLowerCase() === '0x' ? trimmed.slice(2) : trimmed
  if (rawStr.length % 2 !== 0) return ''
  const chars: string[] = []
  for (let i = 0; i < rawStr.length; i += 2) {
    chars.push(String.fromCharCode(parseInt(rawStr.slice(i, i + 2), 16)))
  }
  return chars.join('')
}

/**
 * 短横线转驼峰
 * @example line2hump('foo-bar') // 'fooBar'
 * @example line2hump('my-component-name') // 'myComponentName'
 * @example line2hump('') // ''
 * @returns 驼峰字符串
 */
export const line2hump = (_str: string = ''): string => {
  return _str.replace(/-([a-zA-Z0-9])/g, (_, letter) => letter.toUpperCase())
}

/**
 * 驼峰转短横线
 * @example hump2line('fooBar') // 'foo-bar'
 * @example hump2line('MyComponent') // 'my-component'
 * @example hump2line('URL') // 'url' 或 '-url' 再裁切
 * @returns kebab-case 字符串
 */
export const hump2line = (_str: string = ''): string => {
  const str = _str.replace(/([A-Z])/g, '-$1').toLowerCase()
  return str.startsWith('-') ? str.slice(1) : str
}

/**
 * 去除首尾空白
 * @example delSpaces('  hello  ') // 'hello'
 * @example delSpaces('\n\t abc \n') // 'abc'
 * @example delSpaces('') // ''
 * @returns 去首尾空白后的字符串
 */
export const delSpaces = (_str: string = ''): string => _str.trim()

/**
 * 字节数格式化
 * @example bytesFormat(1536) // '1.50 KB'
 * @example bytesFormat(1048576) // '1.00 MB'
 * @example bytesFormat(1536, { splitStr: '|' }) // '1.50|KB'
 * @returns 带单位的字符串
 */
export const bytesFormat = (
  _bytes: number | string,
  _options: {
    unit?: 'B' | 'KB' | 'MB' | 'GB' | 'TB' | 'PB' | 'EB' | 'ZB' | 'YB'
    splitStr?: string
  } = {}
): string => {
  const { unit: startUnit = 'B', splitStr = ' ' } = _options
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] as const
  let bytes = Number(_bytes)
  if (Number.isNaN(bytes)) return `${_bytes}`
  const sign = bytes < 0 ? '-' : ''
  bytes = Math.abs(bytes)
  let unitIndex = units.indexOf(startUnit)
  if (unitIndex < 0) unitIndex = 0
  while (unitIndex < units.length - 1 && bytes >= 1024) {
    bytes /= 1024
    unitIndex++
  }
  return `${sign}${bytes.toFixed(2)}${splitStr}${units[unitIndex]}`
}

/**
 * 数字千分位格式化
 * @example num2split(123456789) // '123,456,789'
 * @example num2split(1234.56) // '1,234.56'
 * @example num2split('abc') // 'abc'（非数原样返回）
 * @returns 千分位字符串
 */
export const num2split = (_number: number | string): string => {
  const n = Number(_number)
  if (Number.isNaN(n)) return `${_number}`
  const [intPart, decPart] = `${_number}`.split('.')
  const formattedInt = Number(intPart).toLocaleString('en-US')
  return decPart !== undefined ? `${formattedInt}.${decPart}` : formattedInt
}

/**
 * 只保留对象中指定的 key
 * @example filterKeys({ name: 'a', age: 10, phone: 22 }, ['name', 'age']) // { name:'a', age:10 }
 * @example filterKeys({ a: 1, b: 2 }, ['b']) // { b: 2 }
 * @example filterKeys(obj, []) // {}
 * @returns 只含指定 key 的新对象
 */
export const filterKeys = <T extends Record<string | number, any>, K extends keyof T>(_obj: T, _keys: K[] = []): Pick<T, K> => {
  const result = {} as Pick<T, K>
  for (const key of _keys) {
    if (key in _obj) result[key] = _obj[key]
  }
  return result
}

/**
 * 关键词高亮 HTML（用于 v-html / dangerouslySetInnerHTML）
 * @example highlight('123456', ['3', '5'])
 * @example highlight('Hello World', ['world'])
 * @example highlight('a+b', ['+']) // 特殊字符需转义
 * @returns 带 span 的 HTML 字符串
 */
export const highlight = (_text: string, _keys: string[], _options: { flags?: 'g' | 'gi'; style?: string } = {}) => {
  const keys = _keys.filter(Boolean)
  if (keys.length === 0) return escapeHtml(_text)
  const options = {
    flags: 'gi' as const,
    style: 'text-decoration: underline;text-decoration-color: red;text-underline-offset: 0.2em;',
    ..._options
  }
  const { flags, style } = options
  const keySet = new Set(keys.map((k) => k.toLowerCase()))
  const reg = new RegExp(`(${keys.map(escapeRegExp).join('|')})`, flags)
  const safeText = escapeHtml(_text)
  return safeText
    .split(reg)
    .map((part) => (keySet.has(part.toLowerCase()) ? `<span style="${style}">${part}</span>` : part))
    .join('')
}

export const base64 = {
  /**
   * 对象 JSON 后 Base64 编码
   * @example base64.encode({ a: 1, b: '中文' })
   * @example base64.encode({ id: 100 })
   * @example base64.encode({})
   */
  encode: (_obj: Record<string, any>) => {
    return btoa(encodeURIComponent(JSON.stringify(_obj)))
  },
  /**
   * Base64 解码为对象
   * @example base64.decode(base64.encode({ a: 1 }))
   * @example base64.decode('eyJpZCI6MX0=') // 视内容而定
   * @throws 无效数据时抛错
   */
  decode: (_str: string) => {
    try {
      return JSON.parse(decodeURIComponent(atob(_str)))
    } catch {
      throw new Error('base64.decode: 无效的 Base64 或 JSON')
    }
  }
}

/**
 * 按 selector 返回值分组
 * @example groupBy(users, (u) => u.role)
 * @example groupBy(items, (item) => item.type)
 * @example groupBy([{k:'a'},{k:'b'},{k:'a'}], x => x.k) // { a: [...], b: [...] }
 * @returns 分组对象
 */
export const groupBy = <T extends Record<string | number, any>>(_arr: T[], _key_selector: (item: T, index: number) => PropertyKey) => {
  if (typeof Object.groupBy === 'function') {
    return Object.groupBy(_arr, _key_selector)
  }
  const obj: Record<string, T[]> = {}
  for (const [index, item] of _arr.entries()) {
    const groupKey = String(_key_selector(item, index))
    ;(obj[groupKey] ??= []).push(item)
  }
  return obj
}

/**
 * 扁平数组转树形结构
 * @example buildTree(flatList, { parent_key: 'parentId' })
 * @example buildTree(data, { parent_key: 'pid', children_key: 'nodes' })
 * @example buildTree(data, { parent_key: 'parentId', sort: { order: 1 } })
 * @returns 树形数组
 */
export const buildTree = <T extends { id: any } & Record<string, any>>(
  data: T[],
  options: {
    parent_key: keyof T
    sort?: { [key in keyof T]?: -1 | 1 }
    children_key?: string
  }
): (T & { children?: any[] })[] => {
  const { parent_key, sort = {}, children_key = 'children' } = options

  if (!parent_key) throw new Error('The parent_key is mandatory.')
  if (!Array.isArray(data)) throw new Error('Data must be an array.')
  if (data.length === 0) return []

  type TreeNode = T & { [key: string]: any; children?: TreeNode[] }

  const nodeMap = new Map<any, TreeNode>()
  const tree: TreeNode[] = []

  data.forEach((item) => {
    if (item.id == null) return
    nodeMap.set(item.id, { ...item, [children_key]: [] })
  })

  data.forEach((item) => {
    if (item.id == null) return
    const node = nodeMap.get(item.id)
    if (!node) return

    const parentId = item[parent_key]
    if (parentId != null && parentId !== '' && nodeMap.has(parentId)) {
      nodeMap.get(parentId)![children_key]!.push(node)
    } else {
      tree.push(node)
    }
  })

  const sortTree = (nodes: TreeNode[]): TreeNode[] => {
    if (Object.keys(sort).length === 0) return nodes

    nodes.sort((a, b) => {
      for (const key of Object.keys(sort) as (keyof T)[]) {
        const order = sort[key]!
        const aVal = a[key]
        const bVal = b[key]
        if (aVal == null && bVal == null) continue
        if (aVal == null) return order === 1 ? 1 : -1
        if (bVal == null) return order === 1 ? -1 : 1
        if (aVal !== bVal) {
          return order === 1 ? (aVal < bVal ? -1 : 1) : aVal > bVal ? -1 : 1
        }
      }
      return 0
    })

    for (const node of nodes) {
      const children = node[children_key]
      if (children?.length) sortTree(children)
    }
    return nodes
  }

  return sortTree(tree)
}
