function func(num) {
    const result = []
    let index = 0
    function inner(num) {
        let i = 2
        if(num === 1 || num === 2 || num === 3) {
            result[index++] = num
            return result
        }
        for (;i <= parseInt(num/2);i++) {
            if(num%i === 0) {
                result[index++] = i
                inner(parseInt(num / i))
                break
            }
        }
        if(i > num / 2) {
            result[index++] = num
        }
        return result
    }
    return inner(num)
}
console.log(func(12))