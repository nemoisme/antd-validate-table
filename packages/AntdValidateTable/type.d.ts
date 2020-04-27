import { ColumnProps } from 'antd/lib/table';

export interface EditableColumn<T = any> extends ColumnProps<T> {
  type?: string;
  rule?: object[];
  component?: any,
  config?: any
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