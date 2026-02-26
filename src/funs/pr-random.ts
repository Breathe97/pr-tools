/**
 * 随机生成区间数字
 * @param _min 最小数字（大于等于0）
 * @param _max 最大数字（大于等于1）
 * @example random(100000, 999999)
 * @returns 随机区间数字
 */
export const random = (_min = 0, _max = 1) => {
  const safeMin = Math.max(0, _min)
  const safeMax = Math.max(1, _max)
  const min = Math.min(safeMin, safeMax)
  const max = Math.max(safeMin, safeMax)
  const num = Math.random() * (max - min + 1) + min
  return parseInt(`${num}`, 10)
}

/**
 * 随机生成uuid
 * @param _len 长度
 * @param _radix 进制 为了保证唯一性 进制过低时会 按照最低长度返回
 * @example uuid(32, 16)
 * @returns 随机uuid
 */
export const uuid = (_len: number = 16, _radix: number = 16) => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  const radix = Math.min(chars.length, _radix) // 最大进制
  const now = Date.now() // 13位时间戳

  const str = now.toString(radix)
  const uuid: string[] = str.split('')

  // 最少的长度
  const len = Math.max(4, _len - str.length)

  // 根据所需进制对uuid进行补位
  for (let i = 0; i < len; i++) {
    const randomIndex = random(0, radix - 1)
    const v = chars[randomIndex]
    uuid.push(v)
  }

  return uuid.join('').toUpperCase()
}

/**
 * 随机生成昵称
 * @param _min 最小名称长度(最小1)
 * @param _max 最大名称长度(大于等于1)
 * @example randomName(2, 4)
 * @returns 随机昵称
 */
const mameStr = '徒靡绪风颢阳曜灵越扶应图町歧蜀魄漠泊穆皇星霜云今在兮译文欲行予墨青来上卿思贤望古子吟知有易寒非梦居然念唐致远听贤约书何夕北歌清川明庭之恒景行景湛清如问渠凌洲鸣珂彬蔚溯光广思南风到源至诚天诚归远知许沅芷澹雅池雨相宜漪涵遥清易安灵均梦西若云何君远山鹤扬亦河柳新雨晴盛晨惊鸿亦安阑梦如初一心亦行与谐凤兮夕照梧秋思悠得安清秋悠然钟秀冉竹如是喻新弦思月人青时望舒心素桑瑜暄和婉晚芊眠素晚穆沐霜秋'
export const randomName = (_min = 1, _max = 1) => {
  const min = Math.max(1, _min)
  const max = Math.max(1, _max)
  const startIndex = random(1, mameStr.length - (max - min))
  const endIndex = startIndex + random(min, max)
  const str = mameStr.slice(startIndex, endIndex)
  return str
}
