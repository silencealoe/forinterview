function getNumbers(arr) {
    // const obj = {}
    // obj[arr[0]] = 1
    // let maxNum = arr[0];
    // let maxIndex = 1;
    // for(let i = 1; i < arr.length;i++) {
    //     if(obj[arr[i]]) {
    //         obj[arr[i]]++
    //         if(obj[arr[i]] > maxIndex) {
    //             maxIndex = obj[arr[i]]
    //             maxNum = arr[i]
    //         }
    //     } else {
    //         obj[arr[i]] = 1
    //     }
    // }
    // return [maxNum, maxIndex]

    // 排序
    arr.sort((a,b) => a - b)
    let resNum =  arr[0]
    let resIndex = 1
    let index = 1;
    for(let i = 1; i< arr.length;i++) {
        if(arr[i] === arr[i - 1]) {
            index++
            if(index > resIndex) {
                resIndex = index
                resNum = arr[i]
            } 
        } else {
            index = 1
        }
    }
    return [resNum, resIndex]
}
const res = getNumbers([1,2,5,3,2,6,3,7,7,7,7,3,7,3])
// 1,2,2,3,4
console.log(res)