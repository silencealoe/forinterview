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
* react 状态更新 整个组件及其子组件重新更新（shouldcomponentUpdate ,react.memo这个只能保证子组件数据都是props）    vue可以追踪到每个变化的组件
* vue 有许多好用的api  react需要手动实现
* vue: template + js + css   react: all in js   (css module)
* vue state -> ui 一一对应 响应式 父组件状态更新 不会影响组件渲染
* react 需要经过调度 diff 才能知道状态改变导致哪些视图更新 父组件状态更新会影响子组件


### v-for和v-if为啥要避免同时使用？
* vue2中 v-for的优先级高于v-if  vue3中v-if高于v-for
* vue2中： v-for的渲染优先级高于v-if,先执行渲染, v-if则会进行多次渲染，影响性能
* vue3中： v-if的渲染高于v-for  v-if没有权限访问v-for中的变量
* 解决： 使用computed 进行数组的过滤操作，将隐藏的元素过滤掉
### 虚拟dom
新的虚拟dom进行频繁修改，然后与旧的虚拟dom进行对比，更新的旧的dom， 将更新后的dom进行dom重新渲染
### vue diff
* 新（newchildren）旧(oldChildren)节点各有两个指针 startIndex endIndex 两个变量之间互相比较 有四种比较方式
* 新旧节点的两边向中间循环
- 新前 与 旧前比较 如果相同 直接进入更新  细致对比阶段 patchVnode 如果不同进入下一步
- 新后 与 旧后比较 如果相同 -----  如果不同就进入下一步
- 新后 与 旧前 如果相同 更新节点 更新完成后 将节点移动到与新数组节点相同的位置 将旧前节点移动到所有未处理节点之后 如果不同接着下一步
- 新前 与 旧后 如果相同 将节点移动到与新数组节点相同的位置 将旧后节点移动到所有未处理节点之前
-如果四种情况都不匹配 就使用循环的方式挨个比较

* 如何判断结点是否相同？ 
sameVnode(a,b)
比较 key 和 tag , isComment 是否是注释节点 

### new vue()之后发生了什么？
* beforeCreate 之前都是在做初始化  初始化生命周期 合并options  events beforecreate之后 初始化state(data props method) 在created中可以获取到data等
* beforemountd 执行之前，解析模板，在内存中生成虚拟dom 但是没有挂载到真实dom上， beforemountd之后dom挂载到页面上，可以在mounted中获取到dom
* beforeupdate之前 data 中的数据是最新的，页面未和data同步
* beforeupdate之后，根据最新的data生成新的虚拟dom 渲染到页面中
* updated 数据和页面都已经更新
* beforeDestryoy 进入销毁阶段 组件的options都还可以使用
* destoryed 组件已经完全销毁

### vue-loader的作用？
解析和转换.vue文件，提取文件中的<script> <template> <style> 再把这些分别交给对应的loader处理
一个vue文件 有一个template 一个 script 多个style
### vue3的优化点
* 减少打包体积,没有使用的组件如keep-alive transition不会被打包
* 使用proxy
* patch优化:动态节点


### template中绑定多个相同data，是如何处理依赖?
被加上响应式的数据通过Observer生成一个_ob_属性
当第二次读取到同一个数据的时候，会判断这个属性上是否有_ob_ 如果有 就不用在添加响应式 直接使用 没有的话 通过Observer 添加响应式 

### vue父子组件的执行顺序？
* 挂载顺序：
父组件created→父组件beforeMounted→子组件created→子组件beforeMounted→子组件mounted→父组件mounted
父组件先初始化生成虚拟dom 然后 子组件初始化生成虚拟dom 子组件挂载完成 后父组件挂载

二、当用v-show或v-if来控制子组件显示与隐藏的时候:

1.当用v-show='show',当show的默认值为true,执行顺序同上;

2.当用v-if='show',当show的默认值为true,执行顺序依然同上;

3.当用v-show='show',当show的默认值为false,无论在父组的生命周期(created,beforeMount)将show 变为true,执行的顺序依然如上;

5.当用v-show='show',当show的默认值为false,当在父组件的(mounted)生命周期将show变为true,执行顺序将会变为:父组件created→父组件beforeMounted→子组件created→子组件beforeMounted→子组件mounted→→父组件mounted→父组件beforeUpdated→父组件updated;;

4.当用v-if='show',当show的默认值为false,当在父组件的(created,beforeMount)生命周期将show变为true,执行顺序依然如上;

5.当用v-if='show',当show的默认值为false,当在父组件的(mounted)生命周期将show变为true,执行顺序将会变为:父组件created→父组件beforeMounted→父组件mounted→父组件beforeUpdated→子组件created→子组件beforeMounted→子组件mounted→父组件updated;

综上:1.vue项目里面在mounted以前的周期内的变化是不会触发updated的,只有在mounted才可以;

　　 2.希望当触发某个条件的时候再进行子组件渲染的时候,那就采用v-if吧,这也是v-if,v-show的区别之一吧

* 销毁顺序
父组件beforeUnmount -> 子组件beforeUnmount -> 子组件unMounted -> 父组件Unmounted
## v-model实现原理
:value v-on 结合的语法糖
value数据变化的时候 通过v-on 绑定的方法去触发数据的修改
```html
<component :value="value" @input="input"> 语法糖
```
## keep-alive实现原理与缺点
* keep-alive 是一个抽象组件： 自身不会渲染成一个dom元素 也不会出现在父组件链中 使用keep-alive包裹的组件 会缓存不活动的组件 而不是销毁它们
* 是一个函数组件 内部调用render()函数
* 避免组件重复创建和渲染 有效提升性能 总结就是  保存组件状态
* 切换组件调用的生命周期是 activated 和 deactivated
* 使用示例：
```html
<keep-alive :include="whiteList" :exclude="blackList" :max="10">
     <component :is="chooseComponent"></component>
</keep-alive>
```
whiteList: 定义缓存白名单 命中的组件才会缓存状态
blackList： 缓存黑名单 命中的组件不会缓存状态 会创新渲染
max： 定义组件缓存上限 超出上限的组件 利用LRU策略置换缓存数据
* keep-alive渲染的阶段是在patch阶段（构建虚拟dom树， 并将虚拟dom生成真实dom的阶段）
* Vue在初始化生命周期的时候，为组件实例建立父子关系会根据abstract属性决定是否忽略某个组件。在keep-alive中，设置了abstract:true，那Vue就会跳过该组件实例。
* 将虚拟dom结构缓存在内存中

## 自定义指令
对普通dom进行底层操作 
el：获取dom参数  binding 获取参数
vue3 指令方法：
mounted
updated
## 指令与组件
指令只封装dom操作 
组件代表一个自给自足的独立单元 有自己的视图和逻辑
## vue 组件中的data为什么是一个函数
没生成一个新的组件 调用一次data() 开辟一个新的内存空间
如果data是对象 组件多次复用 对象指向的是同一个内存空间 会互相影响
data是函数 每次返回一个对象 生成的是不同的内存地址
## vue 在什么情况下组件会被销毁
切换路由 v-if设置为false  修改key 页面关闭
注意： vue3中使用beforeDestroy 和 destroyed生命周期钩子无效
## vue nexttick 原理是什么？
使用： 数据发生了更新 获取更新后的数据

vue在更新dom 时是异步执行的，只要监听到数据的变化 vue 将开启一个事件队列 并缓存同一事件循环中发生变化的所有数据 如果同一个watcher 被多次触发 只会被推入到队列中一次 

* 所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。
* 主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。
* 一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
主线程不断重复上面的第三步。

主线程的执行过程就是一个tick 

vue 会判断微任务 是否支持 promise  如果不支持 就使用setTimeout

调用nextick 将 传入的回调方法 push到回调回调队列callbacks数组中 

最后一次性地根据 useMacroTask 条件执行 macroTimerFunc 或者是 microTimerFunc，而它们都会在下一个 tick 执行 flushCallbacks，flushCallbacks 的逻辑非常简单，对 callbacks 遍历，然后执行相应的回调函数
## vue何时收集依赖？
由虚拟dom生成真实dom的时候
在生命周期beforeMount之后 在beforeMOunt 模板已经编译完成 虚拟Dom
调用_render()方法将虚拟DOM渲染为真实DOM，在这个方法中，触发了c方法，v方法，s方法，会访问到所依赖的数据，触发getter，然后判断Dep.target是否存在，我们在pushTarget中已经启用了依赖收集，所以这个时候就会通过判断，执行depend方法，调用Watcher的addDep方法，在addDep方法中，首先获取dep的id，然后判断newDepIds数组中是否存在这个id，防止重复收集依赖。如果不存在，将dep.id存到newDepIds数组中，并将这个Watcher实例增加到dep的subs数组中。至此依赖收集完成，接着将真实DOM挂载到页面上，触发mounted钩子函数

https://blog.csdn.net/gongye2019/article/details/119011390

## vue标签上的 data-v-df0dde22 是什么意思
这个是style 添加了scoped后生成的 样式局部作用域 属性选择器

## 虚拟dom 为什么有虚拟dom?
用js对象来描述dom节点
数据驱动视图，数据改变视图就得随着改变 频繁的修改真实dom非常消耗性能 
一个真实的dom 很庞大 上面挂载了很多属性和方法
通过js的计算性能来换取操作dom所消耗的性能
通过对比数据变化前后的状态 计算出视图哪些地方需要更新
当数据发生变化时，我们对比变化前后的虚拟DOM节点，通过DOM-Diff算法计算出需要更新的地方，然后去更新需要更新的视图

VNode 类描述一个真实的dom
描述的节点类型：
* 注释节点
* 文本节点
* 元素节点
* 组件节点： 包含元素节点的信息 组件的options 和 组件的vue实例
* 函数式组件节点： 组件的options和函数组件的vue实例
* 克隆节点： 模板编译优化时使用

## vue diff  (patch过程）
## watch可以监听到computed的变化

## vue 中 jsx 和 模板语法对比
## $attrs
包含所有传递给组件的attribute 包括 class和style




