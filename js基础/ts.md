## ts与js区别
ts是js的超集 支持静态类型 
ts可以在编译的时候发现并纠正错误?
## any、never、unknown、null & undefined 和 void 有什么区别?
* any 动态变量类型 （失去类型检查作用）
* never 永远不存在的值的类型 never 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型。
* unknown 任何类型的值都可以赋给 unknown 类型，但是 unknown 类型的值只能赋给 unknown 本身和 any 类型。即写代码的时候还不知道具体会是怎样的数据类型
*  void: 没有任何类型。例如：一个函数如果没有返回值，那么返回值可以定义为void。
申明为 void 类型的变量，只能赋予 undefined 和 null

## 元组类型 
不确定数组中有哪些类型
```javascript
let arr:[number, string] = [18, 'hello']
```
## 函数重载
之后可以使用泛型来处理参数问题
两个函数名称一样 但是参数个数或者类型不同 
优点： 不需要把 相似功能的函数拆分成多个函数名称不同的函数
```javascript
function add(x: number[]): number
function add(x: string[]): string
function add(x: any[]): any {
  if (typeof x[0] === 'string') {
    return x.join()
  }
  if (typeof x[0] === 'number') {
      return x.reduce((acc, cur) => acc + cur)
  }
}
```
## interface
```javascript
interface Person {
    name: string,
    readonly age: number // readonly 表示只读属性 属性不可改变
    sex?:string // ? 表示可选属性
    (x:sting,y:number):string  // 描述函数类型
    [propsName: string]: boolean // 自定义属性
}

interface likeArray {
    [propName: number]: string  // 类型是数字就是类数组
}
let arr:likeArray = ['i', 'am']

```

## 类
封装 继承 多态
* private 私有 只有类本身能够访问 实例和子类都无法访问
* protect 保护  类本身和子类可以访问 实例无法访问
* public 公有 都能访问
* 抽象类 只能被继承 不能被实例化
抽象类有两个特点：
抽象类不允许被实例化
抽象类中的抽象方法必须被子类实现
用法： 定义一个基类 声明共有属性和方法 用于子类继承 不能被实例化 
优点： 提取共用方法 便于代码复用 
```javascript
abstract class Animal {
    constructor(name:string) {
        this.name = name
    }
    public name: string
    public abstract sayHi():void
}

class Dog extends Animal {
    constructor(name:string) {
        super(name)
    }
    public sayHi() {
        console.log('wang')
    }
}
```
多态： 父类定义一个抽象方法，在多个子类中有不同的实现，运行的时候不同的子类就对应不同的操作

## interface 约束 class
需要用到 implements 关键字
```javascript
interface MusicInterface{
    playmusic(x: number, ):
}
class Cellphone implements MusicInterface {
    playMusic() {}
}
```
## 枚举
定义常量
```javascript
enum Direction {
    Up, // 0  Up = 1 从1开始递增   UP='hello'  手动赋值
    Down, // 1
    Left, // 2
    Right // 3
}
```
枚举内容会数字递增, 反向映射
```javascript
console.log(Direction.Up)        // 0
console.log(Direction.Down)      // 1
console.log(Direction.Left)      // 2
console.log(Direction.Right)     // 3
```
```javascript
console.log(Direction[0])      // Up
console.log(Direction[1])      // Down
console.log(Direction[2])      // Left
console.log(Direction[3])      // Right
```

## 联合类型
一个变量支持多种类型
```javascript
let a: number | string

但当 TS 不确定一个联合类型的变量到底是哪个类型的时候，只能访问他们共有的属性和方法。
```
## 交叉类型
如果要对对象形状进行扩展，可以使用交叉类型 &
```javascript
interface Person {
    name: string
    age: number
}

type Student = Person & { grade: number }
```
联合类型 | 是指可以取几种类型中的任意一种，而交叉类型 & 是指把几种类型合并起来。

交叉类型和 interface 的 extends 非常类似，都是为了实现对象形状的组合和扩展。
## 类型别名
给类型取个别名
type 用法：

```javascript
type Name = string                              // 基本类型

type arrItem = number | string                  // 联合类型

const arr: arrItem[] = [1,'2', 3]

type Person = { 
  name: Name 
}

type Student = Person & { grade: number  }       // 交叉类型

type Teacher = Person & { major: string  } 

type StudentAndTeacherList = [Student, Teacher]  // 元组类型

const list:StudentAndTeacherList = [
  { name: 'lin', grade: 100 }, 
  { name: 'liu', major: 'Chinese' }
]
```

## type 和 interface区别
相同点：
* 都可以定义对象和函数
```javascript
type addType = (num1:number,num2:number) => number

interface addType {
    (num1:number,num2:number):number
}
// 这两种写法都可以定义函数类型

const add:addType = (num1, num2) => {
    return num1 + num2
}
```
* 都允许继承
interface 通过 extend 继承  type 通过 交叉类型 & 继承
```javascript
// interface 继承 interface
interface Person { 
  name: string 
}
interface Student extends Person { 
  grade: number 
}

const person:Student = {
  name: 'lin',
  grade: 100
}

// type 继承 type
type Person = { 
  name: string 
}
type Student = Person & { grade: number  }   // 用交叉类型

// interface 继承 type
type Person = { 
  name: string 
}

interface Student extends Person { 
  grade: number 
}

// type 继承 interface
interface Person { 
  name: string 
}

type Student = Person & { grade: number  }   // 用交叉类型

```
不同点：
* interface 是定义对象类型的，对对象的形状进行描述
* type 是类型别名 用于给各种类型 定义别名 
```javascript
type Number = number
let num: Number = 1
```
* type 可以声明基本类型、联合类型、交叉类型、元组，interface 不行
* interface 合并重复声明 type不行

## 类型保护
typeof
使用 typeof 关键字判断变量的类型
```javascript
function getLength(arg: number | string): number {
    if(typeof arg === 'string') {
        return arg.length
    } else {
        return arg.toString().length
    }
}
```
## 类型断言
值 as 类型
```javascript
function getLength(arg: number | string): number {
    const str = arg as string
    if(str.length) {
        return arg.length
    } else {
        const num = arg as number
        return num.toString().length
    }
}
```

## 泛型
* 函数或者类 解决统一输入输出的问题
* 宽泛的类型 将类型当作参数传递
* 在函数调用时确定参数类型 （类型注解： 是在函数定义的时候确定参数类型）

```javascript
一个参数
const arrFunc<T>(arr: T[]) {}
arrFunc<string>(['1'])

多个参数
const arrFunc<s,n>(a:s, b:n){}
arrFunc<string, number>('a', 12)

用于接口interface
interface Person<s,n> {
  name: s;
  age: n
}

let p:Person<string, number> {
  name: '小明',
  age: 12
}
```

