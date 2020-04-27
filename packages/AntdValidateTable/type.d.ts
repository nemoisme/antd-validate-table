import { ColumnProps } from 'antd/lib/table';
import React from 'react'


export interface EditableColumn<T = any> extends ColumnProps<T> {
  type?: string;
  rule?: object[];
  component?: any,
  config?: any,
  render?:any,
  children:Array<EditableColumn>
}

export interface EleParmas {
  text: string,
  col?: EditableColumn,
  dataIndex: string,
  record?: any
}

export interface optionItem {
  label: string,
  value?: string | number
}


export interface ComponentProps {
  dataSource:Array<object>,
  columns:Array<EditableColumn>
}

export interface renderOps {
  compontent
}