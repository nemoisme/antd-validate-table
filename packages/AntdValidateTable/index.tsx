import React, { Component, useState } from 'react';
import { Table, Form } from 'antd';

import {EditableColumn,EleParmas,optionItem } from './type'

const RENDER_MAP = {
  Select: 'Option'
}

// const renderOptions(options: Array<optionItem>) => {

// }

const RenderEle = ({ text, dataIndex, col, record }: EleParmas) => {
  const [val, setVal] = useState(text)
  const { component, options } = typeof col.config == 'function' && col.config(dataIndex, record)
  const { constructor: { name } } = typeof component == 'function' && component.prototype

  return component ? React.createElement(component, {
    value: val, onChange: e => {
      setVal(e.target.value)
    }
  }, options && Array.isArray(options) && options.map(op => React.createElement(component[RENDER_MAP[name]], { ...op },op.label))) : val
}


const renderCell = (text, record, dataIndex, col): React.ReactNode => {
  const { rules } = typeof col.config == 'function' && col.config(dataIndex, record)
  return <Form.Item style={{margin:0}} name={col.dataIndex}  rules={rules} >
    {RenderEle({ text, dataIndex, col, record })}
  </Form.Item>
}


const multilColumns = (columns: Array<EditableColumn>): Array<EditableColumn> => {
  return columns.map((col) => {
    return {
      ...col,
      render: (text, record, dataIndex) => renderCell(text, record, dataIndex, col),
      children: col.children && multilColumns(col.children)
    };
  });
}


class AntdValidateTable extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }
  render() {
    const { dataSource, columns } = this.props;
    return (
      <Form>
        <Table
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={multilColumns(columns)}
        />
      </Form>
    );
  }
}

export default AntdValidateTable
