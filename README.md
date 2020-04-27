## AntdValidateTable介绍
  > 1.基于antd封装的table单元格校验ui插件                                   
  > 2.ts+hooks实现

```sh
yarn add antd-validate-table or npm i antd-validate-table
```

### 已经完成的
  1.基本类型定义                              
  2.动态渲染实现方式                            
  3.配置项驱动渲染                                                           
  4.支持Input,Radio,Check表单单元格渲染和校验     
  5.单元格渲染元胞状态隔离                               


### 待换成
  1.组件HOC化                                
  2.基于el-validate-table功能迁移及改造 
  3.打包体积优化【2M->1M->904kb】 target:200kb左右                              
  4.表单数据联动（ps:包括初始化数据）                            

### CODE栗子

```tsx
import React, { Component} from 'react';
import { Table, Input, Button, Popconfirm, Form, Select, Radio,Checkbox } from 'antd';
import AntdValidateTable from '../packages/index'
export default class Demo extends Component<any, any> {
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
            options: [
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
              config:index=>({
                component:Checkbox.Group,
                options:[
                  {
                    label:'多选1',
                    value:1,
                  },
                  {
                    label:'多选2',
                    value:2
                  }
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
    return <AntdValidateTable dataSource={dataSource} columns={columns} />
  }
}


```



### END
  I want to play ts and hooks in react


