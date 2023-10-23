import { Expand, FoodList } from '../types'

interface Info {
  size: number
  kj: number
  unit: string
  unit_str: string
}

/**
 * 食物
 */
class Foods {
  foodList
  // constructor(foodList: FoodList[]) {
  constructor(foodList: Expand<FoodList>[]) {
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
      const food_func = this.#foods[name]
      if (food_func) {
        let { num, kj, size, unit, unit_str } = food_func(intake)
        info.kj.num += num
        info.list.push({ ...food, kj: num, r: `${kj}kj/${size}${unit}`, unit, unit_str })
      }
    }
    // 1 千焦（kJ） = 0.239 千卡（kcal）
    // 1 千卡（kcal）= 4.184 千焦（kJ）
    info.kcal.num = Math.ceil(info.kj.num * 0.239)
    return info
  }

  /**
   * 获取某个摄入食物的总热量
   * @param intake 当前食物的量
   * @param info 当前食物信息、占比 如 269kj/100g 、269/100ml
   * @returns 热量kj
   */
  #get_QH(intake = 0, info: Info) {
    const { size, kj } = info
    let num = (intake / size) * kj
    num = Math.ceil(num)
    return num
  }
  // 支持计算的食物列表
  #foods = {
    /**
     * 牛奶
     * @param intake 摄入量 默认一盒250ml
     * @returns 总热量
     */
    牛奶: (intake = 250) => {
      const info = { size: 100, kj: 269, unit: 'ml', unit_str: '毫升' }
      const num = this.#get_QH(intake, info)
      return { ...info, num }
    },
    /**
     * 鸡蛋
     * @param intake 摄入量 默认一颗50g
     * @returns 总热量
     */
    鸡蛋: (intake = 50) => {
      const info = { size: 50, kj: 77, unit: 'g', unit_str: '克' }
      const num = this.#get_QH(intake, info)
      return { ...info, num }
    },
    /**
     * 全麦面包
     * @param intake 摄入量  默认两片（一袋6片）
     * @returns 总热量
     */
    全麦面包: (intake = 123) => {
      const info = { size: 370, kj: 1070, unit: 'g', unit_str: '克' }
      const num = this.#get_QH(intake, info)
      return { ...info, num }
    }
  }
}

export const slimming = { Foods }
