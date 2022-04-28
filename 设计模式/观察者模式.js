/**
 * 观察者
 * 订阅发布
 * js原生事件
*/

class Observer {
    // 消息队列
    message = {}

    // 注册信息： 将订阅者注册的信息推入到消息队列中
    // @parames: 消息类型  相应的处理动作
    register(type, callback) {
        if(this.message[type] && !this.message[type].includes(callback)) {
            this.message[type].push(callback)
        } else {
            this.message[type] = [callback]
        }
    }

    // 发送信息： 当发布者 发布一条信息时，将订阅者订阅的所有信息都执行一遍
    // @params 消息类型 动作执行时需要传递的参数
    fire(type, args) {
        if(!this.message[type]) return
        let events = {
            type,
            args: args || {}

        }
        for(let i = 0; i<this.message[type].length;i++) {
            this.message[type][i].call(this, events)
        }
    }

    // 移除信息: 将订阅者注销的消息从消息队列中移除
    // @params 消息类型 执行时的回调
    remove(type, callback) {
        if(!this.message[type]) return
        const index = this.message[type].indexOf(callback)
        if (index > -1) {
            this.message[type].splice(index, 1)
        }
    }

}

var ob = new Observer()
ob.register('test', (e) => {
    console.log(e.type)
})
ob.register('test', (e) => {
    console.log('1', e.type)
})
ob.register('test1', (e) => {
    console.log(e.type)
})
ob.fire('test', {msg: 'mode'})
ob.fire('test1', {msg: 'mode'})

function addMessages() {
    let nums = 0;
    let ob = new Observer();
    ob.register('sendMessage', (msg) => {
        console.log('massage:', msg)
        nums++
        console.log(nums)
    })
    ob.fire('sendMessage', {msg: 'hello'})
}
addMessages()

// 观察者
