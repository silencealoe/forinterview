class PlayBody {
    task = []
    constructor(name){
        this.name = name
        setTimeout(() => {
            this.next()
        },0)
    }
    start() {
        this.task.push(() => {
            console.log(`hello 我是${this.name}`)
            this.next()
        })
        return this
    }

    play(str) {
        this.task.push(() => {
            console.log(`我正在玩${str}`)
            this.next()
        })
        return this
    }
    sleep (time) {
        this.task.push(() => {
            setTimeout(() => {
                this.next()
            }, time)
        })
        return this
    }
    next () {
        let f = this.task.shift()
        f && f()
    }
}

const playBox = new PlayBody('xiaoming')
playBox.start('xiaoming').sleep(2000).play('电脑').sleep(1000).play('手机')