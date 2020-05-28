import React, { useState, useImperativeHandle, useCallback, forwardRef } from 'react';
import {Table,Form} from 'antd'
import set from 'lodash.set'
import { EditableColumn, EleParmas, optionItem, IProps, renderOps } from './type'


const RENDER_MAP: object = {
  Select: 'Option',
  Radio: 'Group'
}

const h = React.createElement


const RenderEle = ({ val, rowIndex, col, record }: EleParmas): JSX.Element => {
  const { component, options, componentProps, componentChild } = typeof col.config == 'function' && col.config(rowIndex, record)
  const { constructor: { name } } = typeof component == 'function' && component.prototype
  return component ? h(
    name == 'Radio' ? component[RENDER_MAP[name]] : component,
    {
      ...componentProps,
      options,
      value: val,
    }, options && name !== 'CheckboxGroup' && Array.isArray(options) && options.map(op =>
      h(  // 有待拆解
        name == 'Radio' ? component : component[RENDER_MAP[name]],
        { ...op, key: op.value },
        op.label
      )
    )) : componentChild || val || null
}

const renderCell = ({ val, record, rowIndex, col }: EleParmas): JSX.Element => {
  const { rules } = typeof col.config == 'function' && col.config(rowIndex, record)
  return (
    col.render ? col.render :
      <Form.Item
        style={{ margin: 0 }}
        name={`${rowIndex}.${col.dataIndex}`}
        rules={rules || []}
      >
        {RenderEle({ val, rowIndex, col, record })}
      </Form.Item>)
}


const multilColumns = (columns: Array<any>): Array<any> => {
  return columns.map((col) => ({
    ...col,
    render: (val, record, rowIndex) => renderCell({ val, record, rowIndex, col }),
    children: col.children && multilColumns(col.children)
  }))
}


const formateInit = (data: any[]) => {
  return data.reduce((cur, next, index) => {
    const rowItem = Object.keys(next).reduce((row, key) => {
      row[`${index}.${key}`] = next[key]
      return row
    }, {})
    cur = { ...cur, ...rowItem }
    return cur
  }, {})
}


const AntdValidateTable = (props: IProps, ref): JSX.Element => {
  const { dataSource, columns,formAttrs,tableAttrs } = props
  const [form] = Form.useForm()

  const [tableList, setTableList] = useState(dataSource)

  const formValue = useCallback(() => tableList, [props])

  useImperativeHandle(ref, () => ({
    ...form,
    formValue
  }), [form])

  const formInit = formateInit(dataSource)

  const fieldChange = (field: any) => {
    const key = Object.keys(field)[0]
    const temp = [...tableList]
    set(temp, key, field[key])
    setTableList(temp)
  }

  return (
    <Form
      {...formAttrs}
      onValuesChange={fieldChange}
      form={form}
      initialValues={formInit}>
      <Table
        {...tableAttrs}
        dataSource={tableList}
        columns={multilColumns(columns)}
      />
    </Form>
  );
}

export default forwardRef(AntdValidateTable) 
