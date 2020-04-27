import React, { Component, useState } from 'react';
import { Table, Form } from 'antd';

import { EditableColumn, EleParmas, optionItem, ComponentProps, renderOps } from './type'

const RENDER_MAP = {
  Select: 'Option',
  Radio: 'Group'
}

// const renderOptions(options: Array<optionItem>) => {

// }

const RenderEle = ({ text, dataIndex, col, record }: EleParmas) => {
  const [val, setVal] = useState(text)
  // debugger
  const { component, options } = typeof col.config == 'function' && col.config(dataIndex, record)
  const { constructor: { name } } = typeof component == 'function' && component.prototype
  return component ? React.createElement(
    name == 'Radio' ? component[RENDER_MAP[name]] : component,
    {
      options,
      value: val,
      onChange: e => {
        setVal(e.target.value)
      },
    }, options && name !== 'CheckboxGroup' && Array.isArray(options) && options.map(op =>
      React.createElement(  // 有待拆解
        name == 'Radio' ? component : component[RENDER_MAP[name]],
        { ...op, key: op.value },
        op.label
      )
    )) : val
}


const renderCell = (text, record, dataIndex, col): React.ReactNode => {
  const { rules } = typeof col.config == 'function' && col.config(dataIndex, record)
  return (
    col.render ? col.render :
      <Form.Item
        style={{ margin: 0 }}
        name={col.dataIndex}
        rules={rules}
      >
        {RenderEle({ text, dataIndex, col, record })}
      </Form.Item>)
}


const multilColumns = (columns: Array<EditableColumn>): Array<EditableColumn> => {
  return columns.map((col) => ({
    ...col,
    render: (text, record, dataIndex) => renderCell(text, record, dataIndex, col),
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
