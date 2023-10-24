import { Expand } from '../types'

export type T_Food = {
  name: '牛奶' | '鸡蛋' | '全麦面包' | '茄皇方便面' | '迷你酸牛奶'
  intake?: number // 摄入量(默认)
}

type T_ratio = {
  r_size: number // 量
  r_kj: number // 千焦
  r_unit: string // 单位
  r_unit_str: string // 单位字符串
}

interface T_foods extends T_Food {
  ratio: T_ratio
}

const foods: Expand<T_foods[]> = [
  { name: '迷你酸牛奶', intake: 100, ratio: { r_size: 100, r_kj: 353, r_unit: 'ml', r_unit_str: '毫升' } },
  { name: '牛奶', intake: 250, ratio: { r_size: 100, r_kj: 269, r_unit: 'ml', r_unit_str: '毫升' } },
  { name: '鸡蛋', intake: 50, ratio: { r_size: 50, r_kj: 77, r_unit: 'g', r_unit_str: '克' } },
  { name: '全麦面包', intake: 123, ratio: { r_size: 100, r_kj: 1070, r_unit: 'g', r_unit_str: '克' } },
  { name: '茄皇方便面', intake: 128, ratio: { r_size: 100, r_kj: 1747, r_unit: 'g', r_unit_str: '克' } }
]

class Foods {
  foodList
  // constructor(foodList: FoodList[]) {
  constructor(foodList: Expand<T_Food>[]) {
    this.foodList = foodList
  }
  /**
   * 获取当前所有食物的总热量
   * @returns 热量kj
   */
  get_all_info() {
    let info: any = {
      kj: { num: 0, unit: 'kj', unitStr: '千焦' }, // 千焦
      kcal: { num: 0, unit: 'kcal', unitStr: '千卡' }, // 千卡
      list: [] // 详细列表
    }
    for (const food of this.foodList) {
      const { name, intake } = food
      const food_info = foods.find((iten) => iten.name === name)
      if (food_info) {
        let { ratio, intake: def_intake } = food_info
        let { r_size, r_kj, r_unit, r_unit_str } = ratio
        const kj = this.#get_QH(intake || def_intake, ratio)
        const kcal = Math.ceil(kj * 0.239) //   1 千焦（kJ） = 0.239 千卡（kcal）
        info.kj.num += kj
        info.kcal.num += kcal
        info.list.push({ ...food, kj, kcal, ratio: `${r_kj}kj/${r_size}${r_unit}(${r_unit_str})` })
      }
    }

    return info
  }

  /**
   * 获取某个摄入食物的总热量
   * @param intake 当前食物的量
   * @param info 当前食物信息、占比 如 269kj/100g 、269/100ml
   * @returns 热量kj
   */
  #get_QH(intake = 0, food_ratio: T_ratio) {
    const { r_kj, r_size } = food_ratio
    let num = (intake / r_size) * r_kj
    num = Math.ceil(num)
    return num
  }
}

export const slimming = { Foods }
