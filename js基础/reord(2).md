## 编码
字符集
ASCII  128个 7bit. 只能表示基本的拉丁字母、阿拉伯数字和英式标点符号
EASCII  256个 8bit
ASCII 编码与字符集一一对应

中国的字符集
GB2312
GBK、
GB编码与字符集一一对应

unicode  世界各国统一字符集
编码方式：
Utf-8    根据不同的情况使用 1-4 字节 存储码点
Utf-16   变长      2或者4字节存储
Utf-32   定长，4字节存储编码。缺点是占用空间太大，因为不管都大的码点都需要四个字节来存储，非常的占空间

定长与变长： 类似于断句 计算机底层的二进制码毫无章法

utf-8编码
￼

Utf-16: 基础平面使用2字节存储，增补平面使用4字节存储
范围在 U+0000～U+FFFF 的码点被称了为 BMP（Basic Multilingual Plane，基本多语言平面）
后来拓展的范围 U+10000 ～ U+10FFFF 称为 SP（Supplementary Planes，增补平面）。



为什么使用gif来埋点？
- [ ] 防止跨域问题
- [ ] 防止阻塞页面加载
- [ ] 比png jpg体积小



## 模块化
### export
* export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。
* CommonJS 模块输出的是值的缓存，不存在动态更新
* export命令可以出现在模块的任何位置，只要处于模块顶层就可以。如果处于块级作用域内，就会报错.无法做静态优化
* 一个模块只能有一个默认输出（export default）
* export default就是输出一个叫做default的变量或方法，然后系统允许你为它取任意名字
* 因为export default命令其实只是输出一个叫做default的变量，所以它后面不能跟变量声明语句


### import
* import命令输入的变量都是只读的，如果变量是对象，修改对象中的属性是允许的，但是很难查错
* import命令具有提升效果，会提升到整个模块的头部，首先执行，import 在代码编译时执行，在代码运行之前。
* import静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构。
* 多次重复执行同一句import语句，那么只会执行一次，而不会执行多次。
* 使用 * 整体加载的对象 是可以静态分析的，不能修改属性，

#### require()
* 运行时（动态）加载、、、、
* 同步加载

### import()
* 动态加载模块
* 异步加载
* 适用场景： 按需加载， 条件加载， 动态模块路径

### <script> defer 和 async属性 异步加载
* defer： 渲染完执行，多个defer脚本，会按照它们在页面出现的顺序加载
* async： 下载完执行，多个async脚本是不能保证加载顺序的

- 浏览器对于带有type="module"的<script>，都是异步加载，不会造成堵塞浏览器，即等到整个页面渲染完，再执行模块脚本，等同于打开了<script>标签的defer属性。
- 如果网页有多个<script type="module">，它们会按照在页面出现的顺序依次执行。

### esmodule 与commonJS 区别
* esmodule 输出的是值的引用， commonjs输出的是值拷贝，值的缓存
ES6 模块不会缓存运行结果，而是动态地去被加载的模块取值，并且变量总是绑定其所在的模块   
* CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
* CommonJS 模块的require()是同步加载模块，ES6 模块的import命令是异步加载，有一个独立的模块依赖的解析阶段。
* CommonJS 模块使用require()和module.exports。ES6 模块使用import和export。
* CommonJS 模块无论加载多少次，都只会在第一次加载时运行一次，以后再加载，就返回第一次运行的结果，除非手动清除系统缓存。

### node.js中的模块加载

* es6 文件命名为 .mjs    commonjs命名为 .cjs
* .mjs文件总是以 ES6 模块加载，.cjs文件总是以 CommonJS 模块加载，.js文件的加载取决于package.json里面type字段的设置
* ES6 模块与 CommonJS 模块尽量不要混用。require命令不能加载.mjs文件，会报错，只有import命令才可以加载.mjs文件。反过来，.mjs文件里面也不能使用require命令，必须使用import。
* require()不支持 ES6 模块的一个原因是，它是同步加载，而 ES6 模块内部可以使用顶层await命令，导致无法被同步加载。


### 循环加载
#### commonJS
* CommonJS 模块的重要特性是加载时执行，即脚本代码在require的时候，就会全部执行。一旦出现某个模块被"循环加载"，就只输出已经执行的部分，还未执行的部分不会输出。
#### esmodule 
* 输出的是值的引用，只要能保证正确取到值既可


## 顶层await
借用await解决模块异步加载的问题







用var实现一个let  for循环中异步问题

### hash和history原理
https://juejin.cn/post/6993840419041706014
* hash 
地址变化时，利用window.hashchange 监听url上hash的变化，通过location.hash获取
hash发生变化的url都会被浏览器记录下来, 记录在window.history中
浏览器请求时不会携带hash ，所以页面刷新无影响，不利于seo
* history
h5新特性，支持前端修改路由不向服务器发起请求
通过pushstate 和 replacestate来实现无刷新页面跳转
pushstate： 往历史记录堆栈中添加一条记录
replacestate: 替换当前访问记录
浏览器的进后退能触发浏览器的popstate事件，获取window.location.pathname来控制页面的变化

todo: 实现一个路由 router
问题： 
- 刷新或者手动输入url时，后端匹配不到路径，容易出现404问题
* window.onpopstate
调用history.pushState()或者history.replaceState()不会触发popstate事件. popstate事件只会在浏览器某些行为下触发, 比如点击后退、前进按钮(或者在JavaScript中调用history.back()、history.forward()、history.go()方法)，此外，a 标签的锚点也会触发该事件.

### webpack loader 和 plugin

### 观擦者模式

### 订阅发布模式


### display:none的图片会加载吗？
https://blog.csdn.net/luo1914_/article/details/106280466
* 如果是元素本身的背景图或者img上的图片，会发送请求加载，但是不会计算布局
* 如果是父元素设置display:none 子元素在样式表中的背景图片既不会渲染也不会加载，但是标签上的图片会被加载不会被渲染
* 伪类背景图片只在触发伪类时候才会请求加载
* 已经请求过的图片地址，不会重复请求
* 不存在的元素，即使样式表里有写，也不会请求加载


### vue和react中的key 
* 减少元素的重新渲染
* key 在同级元素中具有唯一性
* Diff 算法借助key判断该元素是否进行修改创建

### 解决跨域
* 部署到同源
* 后端设置CORS
* jsonp
* iframe
* websocket:  HTML5一种新的协议。它实现了浏览器与服务器全双工通信，同时允许跨域通讯，是server push技术的一种很好的实现




## vue3.0 知识收集

vue router

alwaysShow: true.一直显示根路径（若子路由个数少于2个，会只展示子路径）
Hidden: true 不会在侧边栏显示

useRoute 当前路由对象
useRouter 全局路由对象

setup中通过组合api访问路由信息，模板中可以使用$route和$router

Router-view原理
函数式组件
获取当前路由嵌套的层数，去router match中拿到路由对应的组件然后执行render到页面上

Vue3
app.config.productionTip = false; 展示提示信息

setup执行处于生命周期beforecreate之前， 无法使用this

Safari 不支持正则?<=  先行断言


