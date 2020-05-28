import React, { Component, useState, useRef } from 'react'
import AntdValidateTable from './../packages/index'
import { Input, Checkbox, Button, Form } from 'antd'


const CustomInputWithCheck = (props: any) => {
  const { value, onChange } = props
  const [checkVal, setCheckVal] = useState(value || '')
  return <>
    <Checkbox checked={checkVal} onChange={e => {
      setCheckVal(e.target.checked)
      onChange(e.target.checked)
    }} style={{ marginLeft: 10 }}>需要跟读</Checkbox>
  </>
}


// export default class Demo extends Component<any, any> {
//   validateTable = React.createRef()
//   form:any
//   constructor(props: any) {
//     super(props)
//     this.form = null
//     this.state = {
//       dataSource: [{ a: 1, b: 2, c: 3 ,cus:true},{ a: 2, b: 3, c: 4 ,cus:false}],
//       columns: [
//         {
//           dataIndex: 'a',
//           title: '字段a',
//           config: () => ({
//             component: Input,
//             rules: [
//               {
//                 required: true,
//                 message: '不能为空'
//               },

//             ]
//           })
//         },
//         {
//           title:'自定义组件',
//           dataIndex:'cus',
//           config:()=>({
//             component:CustomInputWithCheck,
//             rules:[
//               {
//                 validator: (rules, value, callback) => {
//                    if(!value){
//                      callback('请选择')
//                    }
//                    callback()
//                 }
//               }
//             ]
//           })
//         },
//         {
//           title: '字段b',
//           dataIndex: 'b'
//         }
//       ]
//     }
//   }

//   getForm = async()=>{
//     // const {validateFields,getFieldsValue} = this.form
//     // const form = getFieldsValue()
//     // const res = await validateFields()
//     // if(!res) return 
//     // debugger
//     const test = this.validateTable
//     debugger
//   }

//   validate = ()=>{

//   }

//   render() {
//     const { dataSource, columns } = this.state
//     return <div>
//       <h3>-test</h3>
//       <AntdValidateTable ref={this.validateTable} onFinish={this.getForm}  dataSource={dataSource} columns={columns}></AntdValidateTable>
//       <Button type="primary" onClick={()=>this.getForm()} >获取表单值</Button>
//     </div>
//   }
// }


const Demo = (props: any) => {
  const dataSource = [{ a: 1, b: 2, c: 3, cus: true }, { a: 2, b: 3, c: 4, cus: false }]
  const columns = [
    {
      dataIndex: 'a',
      title: '字段a',
      config: () => ({
        component: Input,
        rules: [
          {
            required: true,
            message: '不能为空'
          },

        ]
      })
    },
    {
      title: '自定义组件',
      dataIndex: 'cus',
      config: () => ({
        component: CustomInputWithCheck,
        rules: [
          {
            validator: (rules, value, callback) => {
              if (!value) {
                callback('请选择')
              }
              callback()
            }
          }
        ]
      })
    },
    {
      title: '字段b',
      dataIndex: 'b',
      render:(t:any,r:any,rIndex:number)=><span>customrender</span>
    }
  ]
  const vaidateRefs = useRef({})


  const [data,setData] = useState(dataSource)

  const getForm = () => {
    const { current: { getFieldValue, getTableVal, formValue } }: any = vaidateRefs
    const value = formValue()
    debugger
  }

  const handAdd  = ()=>{
    setData(data.concat({a:1,b:2,c:3,cus:true}))
  }

  return <>
    <h2>dmeo</h2>
    <AntdValidateTable ref={vaidateRefs} dataSource={data} columns={columns} />
    <Button onClick={() => getForm()}>获取表单</Button>
    <Button onClick={() => handAdd()}>增加一行</Button>
  </>

}

export default Demo