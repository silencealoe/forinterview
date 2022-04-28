## react 如何优先渲染某个组件
设置一个延时组件 将需要延时渲染的组件包裹起来 
当优先渲染的组件 渲染完成时 返回一个参数 然后显示延时渲染组件
```javascript
import React from 'react';
import PropTypes from 'prop-types';
class Delayed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hidden : true};
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({hidden: false});
        }, this.props.waitBeforeShow);
    }
    render() {
        return this.state.hidden ? '' : this.props.children;
    }
}
Delayed.propTypes = {
  waitBeforeShow: PropTypes.number.isRequired
};
export default Delayed;


使用：
import Delayed from '../Time/Delayed';
import React from 'react';

const myComp = props => (
  <Delayed waitBeforeShow={500}>
     <div>Some child</div>
  </Delayed>
)

```

## setState之后发生了什么？
setState 在同步种使用是异步更新， 在异步中使用或者原生dom中使用 是同步更新
* 将状态放入更新队列中 获取多个更新 批量进行更新
* 重新执行render函数 产生新的虚拟dom
* 新旧虚拟dom进行diff算法比较，按照新的虚拟dom更新旧的虚拟dom
* 将更新后的虚拟dom 更新到真实的虚拟dom
diff:
* 同级比较 不跨越层级比较 
* 元素类型不一样 直接连同其子组件全部删除 重新创建新的节点
* 元素类型一样 属性不一样 复用dom节点 仅更新有变化的属性
* 在遍历数据进行渲染时， 需要添加key值 
* 根据key进行对比 可以有效增加dom的复用 减少dom的重新创建和删除

react 子组件状态修改 会导致整颗树根据diff计算重新生成 可以使用react.memo 或者 shouldcomponentupdate 使某个组件 跳过diff计算这个过程

vue在编译时 做了处理
react无法在编译时处理

性能优化原理：
* eagerState: 两次执行状态一致 不进行更新
* bailout: shouldcomponentupdate pureComponent React.memo useMemo

## 受控组件和非受控组件
跟表单组件相关
* 受控组件
 - 输入框 状态由state 维护  通过onchange和setState更新state  （状态由开发者和用户控制）
 - 组件内部状态由传入的props控制，没有自己的内部状态
* 非受控组件
表单元素的状态不受react状态影响 表单元素的值存储于dom元素中 通过ref获取dom元素的值
input输入框 通过ref操作获取dom 进而获取到数据
初始值设置为defaultValue 
- 如果组件状态完全由自身控制 没有传入的props 也是非受控组件
## react组件通信
* 父传子：props
* 子传父： 自定义事件回调
* 跨级组件： 
- context 数据共享
用于当前树形嵌套组件（局部） 的数据共享
```javascript
// index.js
export const Mycontext = React.createContext({
    name: 'xiaoming',
    age: 22
})

<Mycontext.Provider value={data} />

// child.js
import { Mycontext } from '../xx'
const data = useContext(Mycontext)
```
状态改变会触发其他组件的更新

* 非嵌套组件：订阅发布 eventBus （on emit off）
* 状态管理  

## npm run eject 将项目配置文件暴露出来

## 纯函数 
函数的输出依赖输入 没有其他状态
## 纯组件 React.pureComponent
基于浅比较模式来确定组件是否更新 自带shouldComponentUpdate功能
实现了浅层对比props和state， 数据结构过于复杂 可能无法检测到深层的变化
* props和state较为简单时才使用React.PureComponent，
* 每次更新都使用新的对象，或者在深层数据结构发生变化时调用forceUpdate()来确保组件被正确地更新
* 考虑使用immutable对象加速嵌套数据的比较。
此外React.PureComponent中的shouldComponentUpdate()将跳过所有子组件树的prop更新，因此需要确保所有子组件也都是纯组件。
优点：
* 自动show diff
* 隔离父组件和子组件的状态变化

## immutable
组件传递数据时 进一步提升组件性能
js 对象赋值是 引用赋值 这样做可以节约内存 当应用复杂时 这就造成了隐患 一般做法时深拷贝和浅拷贝避免对象内容的修改 但是这样造成了cpu和内存的浪费
* immutable 数据结构共享 immutable对象的修改 删除 添加都会返回一个新的对象 使用旧数据创建新数据时 保证旧数据同时可用且不变 避免了深拷贝把每个属性都复制一遍带来的性能消耗 
如果对象树中一个节点发生变化 只修改这个节点和受其影响的父节点 其他节点就共享

## suspence
* pending 的时候 渲染一个加载样式 
* fulfilled 组件完成状态

offScreen: vue keep-alive 组件离屏
坑： 切换tab 会调用卸载组件的生命周期

## react注水
react 18 更新可中断 任务并发 
ssr 首屏渲染完成之前 点击页面的按钮是没有反应的  react 18 ssr 会将点击的按钮最先渲染完成并触发一次click事件 响应点击
并行： 多个任务同时进行
并发： 多个任务交替执行

## react 升级策略
16 -> 17  并发模式
18： 并发特性 使用了并发特性的api 才是并发更新
批处理

## 函数副作用
纯函数无副作用
* 函数中与外界有交互
* 调用了I/O
* 从函数之外检索值
* 函数内包含随机数
* 抛出异常

## react 性能优化
变与不变分离
* props 父子组件传值
* state
* context  祖孙组件传值
## props 比较
组件上不传递props props是{} 组件每次修改后都是 {}  引用地址不一致会造成重复渲染

react.memo 采用浅比较 对比props中的key和value 浅比较消耗性能小于render?

根组件APP的props: 都是从react.createRoot 得到 所以是相等的


c端: 用户量大 用户体验 用户行为 性能监控 报错监控







