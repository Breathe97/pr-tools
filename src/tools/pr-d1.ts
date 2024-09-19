type ReturnDBInfo = {
  query: string
  values: unknown[]
}

export class PrEasyD1<T> {
  constructor() {}
  /**
   * 增加
   * @param table 表名
   * @param data 数据
   * @example post('Users',[{ name:'breathe' }])
   * @returns { query, values }
   */
  post = (table: T, datas: object[]): ReturnDBInfo => {
    let values = []
    // `INSERT INTO table_name (field1, field2) VALUES (?, ?), (?, ?)`
    let query = `INSERT INTO ${table}`
    // 生成第一段
    {
      const strArr = Object.keys(datas[0])
      let str = strArr.join(', ') // field1, field2
      query = `${query} (${str})`
    }

    // 生成第二段
    {
      let strArr = []
      for (const data of datas) {
        let vals = Object.values(data)
        let str = Array(vals.length).fill('?').join(', ')
        str = `(${str})`
        strArr.push(str)
        values.push(...vals)
      }
      let str = strArr.join(', ') // (?, ?), (?, ?)
      query = `${query} VALUES ${str}`
    }

    return { query, values }
  }

  /**
   * 查询
   * @param table 表名
   * @param data 数据
   * @example get('Users',{ username:'breathe' })
   * @returns { query, values }
   */
  get = (table: T, data: object): ReturnDBInfo => {
    try {
      // SELECT * FROM Users WHERE mobile = ? username = ?
      let query = ` SELECT * FROM ${table}`
      const values = Object.values(data)
      if (values.length === 0) return { query, values }

      {
        const keys = Object.keys(data)
        const splitStr = ' = ?' // 分隔符
        let strArr = Array.from(keys, (key) => `${key}${splitStr}`)
        let str = strArr.join(' AND ') // mobile = ? username = ?
        query = `${query} WHERE ${str}`
      }
      return { query, values }
    } catch (error) {
      console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:error`, error)
      return { query: '', values: [] }
    }
  }

  /**
   * 修改
   * @param table 表名
   * @param data 数据
   * @example put('Users',{ username:'breathe' },{id: '123'})
   * @returns { query, values }
   */
  put = (table: T, datas: object, whereData: object): ReturnDBInfo => {
    try {
      // UPDATE Users SET mobile = ? username = ? WHERE id = ? AND username = ?
      let query = ` UPDATE ${table}`
      const values = [...Object.values(data), ...Object.values(whereData)]

      {
        const keys = Object.keys(data)
        const splitStr = ' = ?' // 分隔符
        let strArr = Array.from(keys, (key) => `${key}${splitStr}`)
        let str = strArr.join('') // mobile = ? username = ?
        query = `${query} SET ${str}`
      }

      {
        const keys = Object.keys(whereData)
        const splitStr = ' = ?' // 分隔符
        let strArr = Array.from(keys, (key) => `${key}${splitStr}`)
        let str = strArr.join(' AND ') // id = ? AND username = ?
        query = `${query} WHERE ${str}`
      }
      return { query, values }
    } catch (error) {
      console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:error`, error)
      return { query: '', values: [] }
    }
  }

  /**
   *
   * @param table 表名
   * @param data 删除的数据
   * @example delete('Users',[{ id:'breathe' },{ username:'breathe' }])
   */
  delete = (table: T, datas: object[] = []) => {}
}
