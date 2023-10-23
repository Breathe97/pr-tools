export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never

export interface FoodList {
  name: '牛奶' | '鸡蛋' | '全麦面包'
  intake?: number
}
