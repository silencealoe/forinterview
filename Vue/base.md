### vue和react有什么区别
* 模板： vue 是单文件组件 template + options api  html css js可以写在一个文件中
         react jsx语法 css需要单独写在一个文件
* css  vue 中的class 可以使用string/object/array 

共同点： 
* 数据驱动视图
* 虚拟dom + diff
vue template -> render -> 生成vnode -> 新旧虚拟dom对比 -> 更新真实dom
react jsx  -> render -> 生成vnode -> 新旧虚拟dom对比 -> 更新真实dom
* 组件化 都有父子组件传值
不同点：
* diff算法不同 : 都是同级比较 通过key来对比
* 响应式原理不同
* vue 有许多好用的api  react需要手动实现

### v-for和v-if为啥要避免同时使用？
* v-for的渲染优先级高于v-if,先执行渲染, v-if则会进行多次渲染，影响性能
* 解决： 使用computed 进行数组的过滤操作，将隐藏的元素过滤掉
### 虚拟dom
新的虚拟dom进行频繁修改，然后与旧的虚拟dom进行对比，更新的旧的dom， 将更新后的dom进行dom重新渲染
### vue diff
* 新（newchildren）旧(oldChildren)节点各有两个指针 startIndex endIndex 两个变量之间互相比较 有四种比较方式
* 新旧节点的两边向中间循环
- 新前 与 旧前比较 如果相同 直接进入更新  细致对比阶段 patchVnode 
- 新后 与 旧后比较 如果相同 -----
- 新后 与 旧前 如果相同  将旧前节点移动到所有未处理节点之后
- 新前 与 旧后 如果相同 将旧后节点移动到所有未处理节点之前