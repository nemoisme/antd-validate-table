import React, { Component, useState, useEffect } from 'react';
import { Table, Form } from 'antd';

import { EditableColumn, EleParmas, optionItem, ComponentProps, renderOps } from './type'

const RENDER_MAP = {
  Select: 'Option',
  Radio: 'Group'
}

// const renderOptions(options: Array<optionItem>) => {

// }

const RenderEle = ({ text, rowIndex, col, record }: EleParmas) => {
  const [val, setVal] = useState(text)
  // debugger
  const { component, options } = typeof col.config == 'function' && col.config(rowIndex, record)
  const { constructor: { name } } = typeof component == 'function' && component.prototype
  return component ? React.createElement(
    name == 'Radio' ? component[RENDER_MAP[name]] : component,
    {
      options,
      value: val,
      onChange: e => {
        const real: any = (name == 'CheckboxGroup' ? e : e.target.value)
        setVal(real)
      },
    }, options && name !== 'CheckboxGroup' && Array.isArray(options) && options.map(op =>
      React.createElement(  // 有待拆解
        name == 'Radio' ? component : component[RENDER_MAP[name]],
        { ...op, key: op.value },
        op.label
      )
    )) : val
}


const renderCell = (text, record, rowIndex, col): React.ReactNode => {
  const { rules } = typeof col.config == 'function' && col.config(rowIndex, record)
  return (
    col.render ? col.render :
      <Form.Item
        style={{ margin: 0 }}
        name={col.rowIndex}
        rules={rules}
      >
        {RenderEle({ text, rowIndex, col, record })}
      </Form.Item>)
}


const multilColumns = (columns: Array<EditableColumn>): Array<EditableColumn> => {
  return columns.map((col) => ({
    ...col,
    render: (text, record, rowIndex) => renderCell(text, record, rowIndex, col),
    children: col.children && multilColumns(col.children)
  }));
}

class AntdValidateTable extends Component<ComponentProps, any> {
  constructor(props: ComponentProps) {
    super(props);
  }
  render() {
    const { dataSource, columns } = this.props;
    return (
      <Form>
        <Table
          bordered
          dataSource={dataSource}
          columns={multilColumns(columns)}
        />
      </Form>
    );
  }
}

export default AntdValidateTable
