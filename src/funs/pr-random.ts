const UUID_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const nameStr = '徒靡绪风颢阳曜灵越扶应图町歧蜀魄漠泊穆皇星霜云今在兮译文欲行予墨青来上卿思贤望古子吟知有易寒非梦居然念唐致远听贤约书何夕北歌清川明庭之恒景行景湛清如问渠凌洲鸣珂彬蔚溯光广思南风到源至诚天诚归远知许沅芷澹雅池雨相宜漪涵遥清易安灵均梦西若云何君远山鹤扬亦河柳新雨晴盛晨惊鸿亦安阑梦如初一心亦行与谐凤兮夕照梧秋思悠得安清秋悠然钟秀冉竹如是喻新弦思月人青时望舒心素桑瑜暄和婉晚芊眠素晚穆沐霜秋'

/**
 * 生成 [min, max] 闭区间随机整数
 * @example random(100000, 999999) // 6 位验证码
 * @example random(0, 1) // 0 或 1
 * @example random() // 0 或 1（默认）
 * @returns 随机整数
 */
export const random = (_min = 0, _max = 1) => {
  const safeMin = Math.max(0, _min)
  const safeMax = Math.max(1, _max)
  const min = Math.min(safeMin, safeMax)
  const max = Math.max(safeMin, safeMax)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * 生成带时间前缀的随机 ID（非密码学安全）
 * @example uuid(32, 16)
 * @example uuid(16, 36)
 * @example uuid(8, 10)
 * @returns 大写随机字符串
 */
export const uuid = (_len: number = 16, _radix: number = 16) => {
  const radix = Math.min(UUID_CHARS.length, _radix)
  const nowPart = Date.now().toString(radix).toUpperCase()
  const need = Math.max(0, _len - nowPart.length)
  let suffix = ''
  for (let i = 0; i < need; i++) {
    suffix += UUID_CHARS[random(0, radix - 1)]
  }
  return (nowPart + suffix).slice(0, _len)
}

/**
 * 随机生成 min~max 个汉字的昵称
 * @example randomName(2, 4) // 2~4 个汉字
 * @example randomName(1, 1) // 1 个汉字
 * @example randomName(3, 6)
 * @returns 随机昵称
 */
export const randomName = (_min = 1, _max = 1) => {
  const min = Math.max(1, Math.min(_min, _max))
  const max = Math.max(1, Math.max(_min, _max))
  const len = random(min, max)
  const maxStart = nameStr.length - len
  if (maxStart < 0) return nameStr
  const start = random(0, maxStart)
  return nameStr.slice(start, start + len)
}
