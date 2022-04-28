## 迭代器和for循环区别?
迭代器只能线性挨个访问 
for循环可以自由访问
## 解决js精度问题？
js的number数据类型是双精度浮点类型 采用IEEE754标准
小数转二进制 乘2取整数部分 会出现循环
* Number.toFixed()
* 第三方库 math
## promise可以解决哪些问题？
* 利用promise.all并发多个请求
* 利用promise.all 验证多个请求是否满足条件
* promise.race 请求超时设置  axios timeout一致
* 也可以在多次then中分类处理数据
* 加载图片 
```javascript
img.onload = resolve
img.onerror = reject
```

## js内存泄漏的方法有哪些？
* 全局变量
* 闭包 （函数退出前 将活动变量赋值为null）
* 定时器
* 事件监听
* dom 对象对 变量的引用
* vue中通过$on添加绑定 需要使用$off解绑
## CI/CD 
持续集成（continuous integration） 持续交付(continuous delivery)
## forEach 不能推出循环原因？
forEach 中使用return 相当于 continue 跳出本次循环 继续下次循环
解决： throw出一个错误
## target和currentTarget区别？
都是事件对象中的属性
* target指的是获取事件的目标 点击到的目标元素
* currenttarget是事件处理程序当前正在处理事件的那个元素 事件绑定的元素
* 当事件绑定的元素 和 点击的元素是同一个元素时 两个属性值相等
## window和document区别？
一、指代不同
1、document对象：代表给定浏览器窗口中的HTML文档，document是window的一个对象属bai性。
2、window对象：表示浏览器中打开的窗口。

二、作用不同
1、document对象：使用document对象可以对HTML文档进行检查、修改或添加内容，并处理该文档内部的事件。
2、window对象：浏览器会为HTML文档创建一个window对象，并未每个框架创建一个额外的window对象。

三、使用方式不同：
1、document对象：在Web页面上，document对象可通过window对象的document属性引用，或者直接引用。
2、window对象：没有应用于window对象的公开标准，不过所有浏览器都支持该对象。
