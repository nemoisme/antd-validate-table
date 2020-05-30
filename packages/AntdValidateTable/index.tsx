import React, { useState, useImperativeHandle, useCallback, forwardRef, useEffect } from 'react';
import Table from 'antd/es/table'
import Form from 'antd/es/form'
import 'antd/es/table/style/index.css'
import 'antd/es/form/style/index.css'
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
    col.render && typeof col.render == 'function' ? col.render(val, record, rowIndex) :
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
  const { dataSource, columns, formAttrs, tableAttrs } = props
  const [form] = Form.useForm()
  const [tableList, setTableList] = useState(dataSource)
  const [initForm, setInitForm] = useState(formateInit(dataSource))
  const [tableColumns, setTableColumns] = useState(multilColumns(columns))

  useEffect(() => {
    setTableList(dataSource)
  }, [dataSource])


  useEffect(() => {
    setInitForm(formateInit(tableList))
  }, [tableList])

  useEffect(()=>{
    form.setFieldsValue(initForm)
  },[initForm])


  const formValue = useCallback(() => tableList, [tableList])


  useImperativeHandle(ref, () => ({
    ...form,
    formValue
  }), [tableList])


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
      initialValues={initForm}>
      <Table
        {...tableAttrs}
        dataSource={tableList}
        columns={tableColumns}
      />
    </Form>
  );
}

export default forwardRef(AntdValidateTable) 
