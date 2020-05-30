export const RENDER_MAP: object = {
  Select: 'Option',
  Radio: 'Group'
}

export const formateInit = (data: any[]) => {
  return data.reduce((cur, next, index) => {
    const rowItem = Object.keys(next).reduce((row, key) => {
      row[`${index}.${key}`] = next[key]
      return row
    }, {})
    cur = { ...cur, ...rowItem }
    return cur
  }, {})
}


export const multilColumns = (columns: Array<any>, renderFunc: any): Array<any> => {
  return columns.map((col) => ({
    ...col,
    render: (val, record, rowIndex) => renderFunc({ val, record, rowIndex, col }),
    children: col.children && multilColumns(col.children, renderFunc)
  }))
}


