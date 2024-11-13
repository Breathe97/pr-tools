# 一些常用的 js 方法。

## 立即开始

#### 安装

```bash
npm i pr-tools
```

#### 引入

```js
// 按需引入
import { uuid, random, randomName, md5, regExps, timeFormat, timeFrom, line2hump, hump2line } from 'pr-tools'

// 或全量引入
import * as prTools from 'pr-tools'
```

#### 时间相关函数

```js
/**
 * 获取时间戳 失败返回 0
 * @param _val Date | number | string
 * @example timeStamp()
 * @example timeStamp('2024-05-23')
 * @returns 转换后的时间戳 | 0
 */

/**
 * 格式化时间
 * @param _val Date | number | string
 * @param _format 格式化模板 YYYY-MM-DD hh:mm:ss
 * @param _options _options: { offset?: number; empty_str?: string }
 * @example timeFormat('2024/09/24 04:06:06', 'YYYY-MM-DD hh:mm:ss')
 * @returns 格式化后的字符串
 */

/**
 * 多久之前时间
 * @param _val Date | number | string
 * @param format 格式化模板 YYYY-MM-DD hh:mm:ss
 * @param _options _options: { offset?: number; empty_str?: string }
 * @example timeFrom(new Date().getTime() - 5600000)
 * @returns 格式化后的字符串
 */

/**
 * 获取某个时间的范围日期
 * @param _val Date | number | string
 * @param _range 本周 | 本月 'week' | 'month' = 'month'
 * @param _options _options: { offset?: number; empty_str?: string }
 * @example timeRange(new Date().getTime())
 * @returns [] 该范围的每一天集合
 */
```

#### 数组相关函数

```js
/**
 * 把一纬数组按指定长度分割
 * @param _arr 一纬数组
 * @param _size 分割长度
 * @example arrSlice([1, 2, 3, 4, 5], 2)
 * @returns 分割后的二维数组
 */

/**
 * 在数组里面向上向下取整数的一个范围
 * @param _arr 多个数值的数组
 * @param _accuracy 间隔精度
 * @returns [min,max]
 * @notes 例如传入[-13,37,67] 返回 [-20,70] ,类似于[0,0]将会返回[0,10]
 * @notes 常在echart中使用  const [yAxisMin, yAxisMax] = arrRange([1,87], 10) // 取区间整数 [1,87] => [0,90]
 * @example arrRange([-13, 37, 67]) // [-20,70]
 * @example arrRange([0, 0], 10) // [0,10]
 */

/**
 * 数组去重
 * @param _arr 数组
 * @param _keys 根据哪些字段去重
 * @param _cover 如果有重复 是否进行覆盖 默认为 true
 * @example arrFilterDup(arr, ['name', 'age'])
 * @returns 去重后的数组
 */

/**
 * 筛选 数组对象 中指定的key
 * @param _arr 需要筛选的对象数组
 * @param _keys 需要筛选哪些字段
 * @example arrFilterKeys(arr, ['label', 'name'])
 * @returns 筛选后结果 传入对象返回对象 传入数组返回数组
 */

/**
 * 根据一个枚举对象生成 常用的键值对数组
 * @param _enum 枚举对象 { value: label }
 * @param _value_name 值名
 * @param _label_name 键名
 * @example arrFromEnum(obj, ['value', 'label'])
 * @returns 键值对数组
 */
```

#### 随机值相关函数

```js
/**
 * 随机生成区间数字
 * @param _min 最小数字（大于等于0）
 * @param _max 最大数字（大于等于1）
 * @example random(100000, 999999)
 * @returns 随机区间数字
 */

/**
 * 随机生成uuid
 * @param _len 长度
 * @param _radix 进制 为了保证唯一性 进制过低时会 按照最低长度返回
 * @example uuid(32, 16)
 * @returns 随机uuid
 */

/**
 * 随机生成昵称
 * @param _min 最小名称长度(最小1)
 * @param _max 最大名称长度(大于等于1)
 * @example randomName(2, 4)
 * @returns 随机昵称
 */
```

#### md5 加密

```js
/**
 * 对字符串进行md5加密
 * @param _string 需要加密的字符串
 * @example md5('123456')
 * @returns 加密后的字符串
 */
```

#### 转换相关函数

```js
/**
 * ArrayBuffer转十六进制
 * @param _buffer arrayBuffer
 * @returns 十六进制字符串
 */

/**
 * 十六进制转ArrayBuffer
 * @param _str 十六进制字符串
 * @returns buffer
 */

/**
 * 十六进制转ASCII码
 * @param _hexCharCodeStr 16进制字符串
 * @returns 转换后的ASCII码
 */

/**
 * 短划线转换驼峰
 * @param _str 短横线字符串
 * @returns 驼峰字符串
 */

/**
 * 驼峰转换短横线
 * @param _str 驼峰字符串
 * @returns 短横线字符串
 */

/**
 * 去除首尾空格
 * @param _str 字符串
 * @returns 结果字符串
 */

/**
 * 字节单位转换
 * @param _bytes 字节
 * @param _splitStr 值与单位的分割符 默认为一个空格
 * @returns 格式化后的字符串
 */

/**
 * 把数字分割为千分位计量的字符串
 * @param _number 数值
 * @example num2split(123456789)
 * @returns 千分位计量的字符串
 */

/**
 * 筛选 对象 中指定的key
 * @param _obj 需要筛选的 对象
 * @param _keys 需要筛选哪些字段
 * @example filterKeys(_obj, ['lable', 'name'])
 * @returns 筛选后结果 传入对象返回对象 传入数组返回数组
 */

/**
 * 生成高亮字符串的html
 * @param _text 过来的字符串
 * @param _keys 关键词数组 string[]
 * @example highlight('123456', ['3', '5'])
 * @returns 处理后的 html 字符串
 */
```

#### highlight 字符串高亮

```js
{
  let res = prTools.highlight('123456', ['3', '5'])
  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:res`, res)
}
```

#### 在 react 中使用

```jsx
<div dangerouslySetInnerHTML={{ __html: highlight('123456', ['3', '5']) }}></div>
```

#### 在 vue 中使用

```vue
<div v-html="highlight('123456', ['3', '5'])"></div>
```

## 代码仓库

[github](https://github.com/breathe97/pr-tools)

## 贡献

breathe
