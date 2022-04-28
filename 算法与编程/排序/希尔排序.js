/**
 * 希尔排序
 * 缩小增量排序 直接插入排序的增量版本
 * 把数组按照gap分组 每一组采用直接插入排序 
 * gap = len / 2
 * 分组处理 减小逆序对的数量 提升插入排序效率
*/
function shellShort(arr) {
    const len = arr.length;
    let gap = Math.floor(len / 2)
    while(gap >= 1) {
        for(let i = gap; i<len;i++) {
            let j, temp = arr[i]
            for(j = i - gap; j>=0 && temp < arr[j]; j = j - gap) {
                arr[j+gap] = arr[j]
            }
            arr[j+gap] = temp
        }
        gap = Math.floor(gap / 2)
    }
    return arr
}
console.log(shellShort([59,40,14,87,14,34,34,7,9,8,28]))