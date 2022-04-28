## observable
给数据添加可观察
* 数组类型
```javascript
import { observable,isObservableArray } from 'mobx'
const arr = observable([1,2,3])
console.log(arr[0],Array.isArray(arr),isObservableArray(arr))
```
* 对象类型
```javascript
import { observable,isObservableObject,extendObservable } from 'mobx'

const obj = observable({username:'zs'})
extendObservable(obj,{age:18}) //给obj添加可观察属性age
console.log(obj['username'],isObservableObject(obj),obj['age'])
```
* 基本类型
```javascript
import { observable } from 'mobx'

let number = observable.box(5)
let str = observable.box('hello')
let flag = observable.box(true)

number.set(10)
console.log(number.get())

```
* 声明管理仓库
```javascript
import { observable } from 'mobx'

class Store{
    @observable username='zs'
    @observable information={message:'hello'}
}
console.log(new Store())
```