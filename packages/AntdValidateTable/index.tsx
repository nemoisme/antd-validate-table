import React, { Component, useState, FC, useImperativeHandle, useCallback, forwardRef } from 'react';
import { Table, Form } from 'antd';

import { EditableColumn, EleParmas, optionItem, IProps, renderOps } from './type'

const RENDER_MAP: object = {
  Select: 'Option',
  Radio: 'Group'
}


const VAL_TYPES: Array<string> = ['Select', 'CheckboxGroup']


const h = React.createElement


const RenderEle = ({ val, rowIndex, col, record }: EleParmas): React.ReactNode => {
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

const renderCell = ({ val, record, rowIndex, col }: EleParmas): React.ReactNode => {
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


const AntdValidateTable = (props: IProps, ref) => {
  const { dataSource, columns } = props
  const [form] = Form.useForm()

  // const  getTableList = useCallback(()=>{
  //   console.log(dataSource,'dataSource')
  // },[props])

  useImperativeHandle(ref, () => ({
    ...form,
    // getTableList
  }), [form])

  const formInit = dataSource.reduce((cur, next, index) => {
    const rowItem = Object.keys(next).reduce((row, key) => {
      row[`${index}.${key}`] = next[key]
      return row
    }, {})
    cur = { ...cur, ...rowItem }
    return cur
  }, {})

  return (
    <Form
      form={form}
      initialValues={formInit}>
      <Table
        dataSource={dataSource}
        columns={multilColumns(columns)}
      />
    </Form>
  );
}

export default forwardRef(AntdValidateTable) 
