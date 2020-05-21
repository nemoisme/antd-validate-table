import { ColumnProps } from 'antd/lib/table';
import React from 'react'
import { FormProps } from 'antd/lib/form'
export interface EditableColumn<T = any> extends ColumnProps<T> {
  type?: string;
  rule?: object[];
  component?: any,
  config?: any,
  render?: any,
  children: Array<EditableColumn>
}

export interface EleParmas {
  val: string,
  col?: EditableColumn,
  rowIndex: string | number,
  record?: any
}

export interface optionItem {
  label: string,
  value?: string | number
}


export interface IProps extends FormProps {
  dataSource: Array<object>,
  columns: Array<EditableColumn>,
  ref: any,
  form?:any

}

export interface renderOps {
  compontent: any
}