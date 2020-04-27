import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form, Select, } from 'antd';
import AntdValidateTable from '../packages/index'

// import AntdValidateTable from './../lib/antd-validate-table'

export default class Demo extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      columns: [
        {
          title: 'name',
          dataIndex: 'name',
          width: '30%',
          editable: true,
          config: (index, a) => {
            return index == 0 ? {
              component: Input,
              rules: [{
                required: true,
                message: '不能为空'
              }]
            } : {}
          }
        },
        {
          title: 'age',
          dataIndex: 'age',
          config: (index) => ({
            component: Select,
            option: [
              {
                label: '下拉1',
                value: 1
              },
              {
                label: '下拉2',
                value: 2
              }
            ]
          })
        },
        {
          title: 'address',
          dataIndex: 'address',
        },
        {
          title: 'cus',
          dataIndex: 'cus',
        },
        {
          title: "mutil",
          dataIndex: 'mutil',
          children: [
            {
              title: 'mutilA',
              dataIndex: 'mutilA'
            },
            {
              title: 'mutilB',
              dataIndex: 'mutilB'
            }
          ]
        }
      ],
      dataSource: [
        {
          key: '0',
          name: 'Edward King 0',
          age: '32',
          address: 'London, Park Lane no. 0',
        },
        {
          key: '1',
          name: 'Edward King 1',
          age: '32',
          address: 'London, Park Lane no. 1',
        },
      ],
      count: 2,
    }
  }
  render() {
    const { dataSource, columns } = this.state
    return <div><AntdValidateTable dataSource={dataSource} columns={columns} /></div>
  }
}