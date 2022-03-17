## 为什么要设计hooks
* class 组件继承 还有类的实例利用的不好， 组件继承实现起来不雅观，类的实例在内的内部使用。类组件，难以复用，需要使用高阶组件，代码阅读性差
（没有利用继承特性和类的实例特性）
通过函数才能更好的去描述一个组件，最初的函数组件，没有自己的状态，生命周期
hooks 给函数组件加上了状态 生命周期 
hooks机制： 能够把一个外部的数据绑定到函数执行，当数据变化时，函数能够自动重新执行，任何会影响UI展现的外部数据，都可以通过这个机制绑定到React函数组件
（把某个目标结果勾到可能会变化的数据源或者事件源上，那么当被勾到的数据或者事件发生变化时，产生这个目标结果的代码会重新执行，生成更新后的结果）
对于函数组件，这个更新后的结果就是DOM，对于useCallback useMemo 这也与缓存相关的组件，则时依赖项发生改变时去更新缓存

*  简化逻辑复用
class 组件复用 使用高阶组件 
hooks 直接通过自定义hook 引入需要的变量
* 关注分离
同一个业务逻辑代码 尽可能聚合在一块

* hooks解决了高阶组件嵌套问题
* 引入自定义hook，逻辑复用
* 解决了class 中this的指向问题 


## usestate为什么不能放在if判断中?
react 通过单链表管理hook，每次调用useState, 链表都会执行next向后一步，如果写在条件判断中，假设条件不成立，在update时，会导致接下来所有的usestate取值出现偏移，从而导致异常发生
## react内部怎么区分多个usestate？
通过链表将各个hook连接起来，next指向下一个hook
## React是如何在每次重新渲染之后都能返回最新的状态
每个hook节点都有一个自己的queue链表（是一个循环链表）,来保存每次setDispatch更新的信息
在update阶段会依次执行update循环链表中的所有更新操作，最终拿到最新的state返回
参考： https://juejin.cn/post/6844904080758800392#heading-2
## hooks链表存放在哪？
组件构建的Hooks链表会挂载到FiberNode节点的memoizedState上面去
## hooks和class的区别
在没有hooks的时候，函数组件没有自己的状态，只能获取props数据， 也没有自己的生命周期。
hooks 中的方法不需要绑定this  
hooks 让代码逻辑更集中，在useEffect中可以直接执行创建和销毁处理
hooks 不用再写多个生命周期， 依赖改变，hook会执行
自定义hooks 使组件复用更简单

## useEffect和useLayoutEffect
useEffect 是浏览器完成渲染之后执行 （在此修改dom会出现闪烁） 异步更新
useLayoutEffect callback在dom更新之后， 浏览器真正渲染到页面之前 执行  会阻塞浏览器的渲染 （适合用于修改dom 不会出现闪烁） 同步更新

# react diff
* 只对同级元素进行比较， 如果一个dom节点在前后两次更新中，跨越了层级，那么react不会复用，直接重建
* 不同类型的的元素会生成不同的树， 元素节点类型改变，销毁旧类型节点，创建新类型节点
* 使用key来 暗示哪些子元素在不同的渲染下能保持稳定，若前后两个节点key相同，位置不同，react会复用，只需要修改顺序. 若只是修改className，react 会修改className 复用dom
若没有key 修改节点顺序，会导致节点删除重建。

diff思想：
## 第一轮遍历
* 1 新节点 遍历 newchildren数组 i = 0开始， 与旧oldFiber(单向链表)比较  i = 0 -> oldFiber  i = 1 -> oldFiber.sibling 
* 2 如果可复用，i++，继续比较newChildren[i]与oldFiber.sibling，可以复用则继续遍历
* 3 不可复用
 - key值不同 不可复用 跳出循环
 - key相同 type不用 将oldFiber 标记为删除 继续遍历
* 4 如果newChildren遍历完（即i === newChildren.length - 1）或者oldFiber遍历完（即oldFiber.sibling === null），跳出遍历，第一轮遍历结束。
## 第一轮遍历结果
* newChildren与oldFiber同时遍历完
最理想的情况：只需在第一轮遍历进行组件更新 (opens new window)。此时Diff结束
* newChildren没遍历完，oldFiber遍历完
意味着本次更新有新节点插入，我们只需要遍历剩下的newChildren为生成的workInProgress fiber依次标记Placement
* newChildren遍历完，oldFiber没遍历完
意味着本次更新比之前的节点数量少，有节点被删除了。所以需要遍历剩下的oldFiber，依次标记Deletion 删除。
* newChildren与oldFiber都没遍历完
意味着有节点在这次更新中改变了位置

## 处理移动位置的节点
为了快速的找到key对应的oldFiber，我们将所有还未处理的oldFiber存入以key为key，oldFiber为value的Map （existingChildren）中
接下来遍历剩余的newChildren，通过newChildren[i].key就能在existingChildren中找到key相同的oldFiber

## 标记节点是否移动
old: abcd => new: dabc
old: abcd => new: acbd
第一轮遍历结束得到最后一个可复用节点的在oldFiber索引 lastPlacedIndex
遍历新节点，然后通过key在旧节点中获取对应的index oldIndex
将新集合节点中的索引和旧节点索引进行比较 
oldIndex < lastPlacedIndex 旧节点 需要右移动
oldIndex >= lastPlacedIndex lastPlacedIndex = oldIndex

## 如何理解fiber?
## 如何阻止组件的重复渲染？
使用React.memo()包裹组件 对新旧props进行对比 
usecallback 函数缓存 
useMemo 值的缓存

## useContext 实现组件跨越层级传值 
使用createContext 创建数据
在子组件中使用 useContext获取值
## 触发状态更新
this.setState
useState
this.forceUpdate
React.render
useReducer

