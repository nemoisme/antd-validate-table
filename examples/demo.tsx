import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form, Select, Radio, Checkbox } from 'antd';
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
            return {
              component: Input,
              rules: [{
                required: true,
                message: '不能为空'
              }]
            }
          }
        },
        {
          title: 'age',
          dataIndex: 'age',
          config: (index) => ({
            component: Select,
            options: [
              {
                label: '下拉1',
                value: '32'
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
          config: index => ({
            component: Radio,
            options: [
              {
                label: '单选1',
                value: 1
              },
              {
                label: '单选2',
                value: 2
              }
            ]
          })
        },
        {
          title: "mutil",
          dataIndex: 'mutil',
          children: [
            {
              title: 'mutilA',
              dataIndex: 'mutilA',
              config: index => ({
                component: Checkbox.Group,
                options: [
                  {
                    label: '多选1',
                    value: 1,
                  },
                  {
                    label: '多选2',
                    value: 2
                  }
                ],
                rules: [
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      debugger
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject('The two passwords that you entered do not match!');
                    },
                    trigger: 'change'
                  })
                ]
              })
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
          mutilA: [1, 2]
        },
        {
          key: '1',
          name: 'Edward King 1',
          age: '32',
          address: 'London, Park Lane no. 1',
          mutilA: [1]
        },
      ],
      count: 2,
    }
  }
  render() {
    const { dataSource, columns } = this.state
    return <AntdValidateTable dataSource={dataSource} columns={columns} />
  }
}