// 实现一个柯里化函数
// func(1)(2)(3,4)() = 10

const getSum = (arr) => {
    return arr.reduce((pre, cur) => {
        return pre + cur;
    })
}

function func1(arg1) {
    const args = [arg1];
    // 最后一次调用传入空参数
    return function inner() {
        // console.log('aaaa', arguments.length)
        if (arguments.length === 0) {
            return getSum(args);
        } else {
            args.push(...arguments);
            return inner;
        }
    }
}

const res = func1(1)(2)(4,5)(6,7,8)();
// console.log(res)

// 实现深拷贝

function deepCopy(args, tMap = new Map()) {
    if (typeof args !== 'object' || args === null) {
        return args
    }
    let temp = Array.isArray(args) ? [] : {};
    for (let key in args) {
        if (tMap.get(key)) {
            return tMap.get(key);
        }
        tMap.set(key, args[key]);
        if (typeof args[key] === 'object' && args[key]) {
            temp[key] = { ...deepCopy(args[key], tMap)} ;
        } else {
            temp[key] = args[key];
        }
    }
    return temp;
}
let aa = {
   
}
const testOBj = {
    a: 1,
    b: {
        c: [1,2,3]
    },
    d: aa
};
aa.cc = testOBj
const newOBj = deepCopy(testOBj);
// newOBj.b.c = 2;
// console.log(newOBj)
// console.log(testOBj)

// 手写flat(n)
// Array.prototype.myFlat = function(n) {
//     if ( n <= 0) {
//         return this;
//     }
//     let result = [];
//     n--;
//     for (let i = 0; i < this.length;i++) {
//        if (Array.isArray(this[i])) {
//             if ( n <= 0 ) {
//                 result.push(...this[i]);
//             } else {
//                 result.push(...this[i].myFlat(n));
//             }
//         } else {
//             result.push(this[i]);
//        }
//     }
//     return result
// }
// console.log([1,2,[3,[6,7,[8,9]]],4,5].myFlat())

// 手写reduce
// Array.prototype.myReduce = function(callback, initVal) {
//     const index = initVal ? 0 : 1;
//     let res = initVal || this[0];
//     for (let i = index; i < this.length;i++) {
//         res = callback(res, this[i], i, this);
//     }
//     return res;
// }
// console.log([1,2,3,4].myReduce((pre,cur) => pre+cur, 1))

// 对象使用for...of遍历
// const tempObj = {
//     a: '1a',
//     b: '2'
// }
// 1
// for(let [key, value] of Object.entries(tempObj)) {
//     console.log(key, value)
// }
// 2
// tempObj[Symbol.iterator] = function *() {
//     const keys = Object.keys(this);
//     for(let i = 0; i < keys.length; i++) {
//         yield [keys[i], this[keys[i]]]
//     }
// }
// for(let [key, value] of tempObj) {
//     console.log(key, value)
// }

// 手写new
function myNew(fn, ...args) {
    const obj = {};
    obj.__proto__ = fn.prototype;
    const res = fn(...args);
    if (res && typeof res === 'object') {
        return res;
    }
    return obj;
}
function Test(name) {
    this.name = name;
    return {
        a: 'aaa'
    }
}
// const n = myNew(Test, 'xiao');
const n2 = new Test('ming');
// console.log(n.a)
// console.log(n2.name)

// 手写instanceof
// function Person () {}
// var p =new Person();
// function myInstanceOf(left, right) {
//     if (typeof right !== 'function') {
//         return false
//     }
//     let flag = false;
//     while (left.__proto__ ) {
//         if (left.__proto__ === right.prototype) {
//             flag =  true
//         }
//         left = left.__proto__
//     }
//     return flag
// }
// console.log('aaa', myInstanceOf('aaa', Array));

// Array.of()将一组值转换为数组 Array.of(1, 2, 3) = [1, 2, 3]
// /\d/ig.source 返回正则表达式  .global 是否存在g修饰符 .ignoreCase 是否存在i修饰符 
// Object.create(null)创建的对象没有原型链
// const obj11 = {a: '1'}
// const obj = Object.create(obj11)
// console.log(obj)
// object.create与new的区别是， new会调用函数

// 实现一个订阅发布 eventbus

// 实现call aplly bind
Function.prototype.myCall = function(context, ...args) {
    const thisContext = context || window;
    const fn = Symbol();
    thisContext[fn] = this;
    let res;
    if (args.length) {
        res = thisContext[fn](...args);
    } else {
        res = thisContext[fn]();
    }
    delete thisContext[fn];
    return res;
}
Function.prototype.myApply = function (context, ...args) {
    const thisContext = context || window;
    const fn = Symbol();
    thisContext[fn] = this;
    console.log(thisContext)
    let res;
    if (args[0].length) {
        res = thisContext[fn](...args[0]);
    } else {
        res = thisContext[fn]();
    }
    delete thisContext[fn];
    return res;
}
Function.prototype.myBind = function(context, ...args) {
    const thisContext = context || window;
    const fn = Symbol();
    thisContext[fn] = this;
    return function() {
        let res
        if (args[0].length) {
            res = thisContext[fn](...args[0]);
        } else {
            res = thisContext[fn]();
        }
        delete thisContext[fn];
        return res;
    }
}
const testObj = {
    name: 'xiaoming',
    fn: 'fnnnn'
}
function Func(str1, str2 = 'aaa') {
    console.log(this.name, str1, str2);
    return 'res';
}
Func.myCall(testObj, '1')
Func.myApply(testObj, ['a', '2'])
const bindd = Func.myBind(testObj, ['bindd']);
bindd();


