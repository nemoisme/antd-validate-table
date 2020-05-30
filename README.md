
## AntdValidateTable 介绍
  基于antd实现的单元格校验的table组件


### 安装使用

```sh
  yarn add antd-validate-table or npm i antd-validate-table
```

### 如何而来
  1.由于之前中的技术栈(vue+element),封装一个 [el-validate-table](https://github.com/nemoisme/el-validate-table)  <br />                                    
  2.到新公司技术栈变成react,但是大体的业务需求还是存在的    <br />                                         
  3.由于项目比较陈旧，antd3x升级antd4x存在的一定的困难,之前基于antd3x也写过一版本实现,但是antd3x的form getFieldDecorator 这里就暂不吐槽了,所以成品也出现很多bug <br />
  4.然后就有了隔离antd版本自己发包的冲动 <br />


### 思考
  1.配置项驱动源自之前的ele版本,ele版本实现的，它都行 <br />
  2.核心代码其实很少，总共的篇幅也就100多行，所以存在无限的可扩展，个人比较看好,在此不得不说一句,hooks真相   <br />
  3.打包体积真的很难均衡，我好难！<br />


### 将要完成的（ps:先满足自己的业务场景，哈哈哈哈）
  1.antd3x和antd4x存在样式冲突，所以目前只是引入的es lib style 作为默认样式 ,所以计划是移除内置默认样式 <br />
  2.单元格渲染原子表单,目前只支持的Input,Select,RadioGroup,以及非组合表单组件,custom component,未来将兼容antd更多内置表单组件 <br />
  3.类型系统存在一定缺失，这里也是要慢慢完成的 包括组件内部类型完善，以及模块类型完善 <br />
  4.关于打包体积，啊啊啊啊 基于antd版本的样式冲突，体积已经反弹了，这里让我不禁想起我的体重来了,体积还要减减减！💪 <br />
  5.相关的api文档完善 <br />
  6.最后：即使依然存在这么多要完成的，你依然可以使用，就是这么强（膨胀600斤，哈哈哈）<br />
                        
### CODE 🌰

```tsx
import React, { useSate , useRef} from 'react';
import { Input } from 'antd';

// 定义表单组件
const CustomComponent = (props)=>{
  const {value,onChange} = props
  return <>
    <Input value={value} onChange={e=>onChange(e.target.value)}></Input>
    <span>我是自定义组件</span>
  </>
}


const Demo = (props)=>{
  const validaRef = useRef()
  const [table,setTable] = useState([{a:1,b:2}])
  const columns = [
    {
      title:'a',
      dataIndex:'b',
      config:(parmas)=>({   // 通过parmas控制每个单元格渲染
        component:Input,
        rules:[
          {
            required:true,
            message:'a不能为空'
          }
        ]
      })
    },
    {
      title:'b',
      dataIndex:'b',
      config:(parmas)=>({ 
        component:CustomComponent,
        rules:[
          {
            required:true,
            message:'b不能为空'
          }
        ]
      })
    }
  ]
  // !!!  validaRef.current  存在 forminstance 外加一个formValue  可完成一系列表单交互操作
  return <AntdValidateTable ref={validaRef} dataSource={data} columns={columns} />
  
}

```

### END
期待相关功能完善,减少crud的痛苦😖


