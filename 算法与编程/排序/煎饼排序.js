/**
 * @param {number[]} arr
 * @return {number[]}
 */
 var pancakeSort = function(arr) {
     // 找出最大
    // let max = arr[0];
    // let maxIndex = 0;
    // for (let i = 1;i<arr.length;i++) {
    //     if(arr[i]>max) {
    //         max = arr[i]
    //         maxIndex = i;
    //     }
    // }
    // // 将第一个数与最大数交换
    // [arr[0], arr[maxIndex]] = [arr[maxIndex], arr[0]];
    // let j = 0;
    // let k = arr.length - 1;
    // while(j<k) {
    //     [arr[j], arr[k]] = [arr[k], arr[j]];
    //     j++;
    //     k--;
    // }
    // return [...pancakeSort(arr.slice(0, arr.length - 1)), max];
    let n = arr.length;
    let res = []
    while(n > 1) {
        let max = Math.max(...arr.slice(0, n));
        console.log(max)
        let maxIndex = arr.indexOf(max);
        res.push(maxIndex + 1);
        arr = arr.slice(0, maxIndex + 1).reverse().concat(arr.slice(maxIndex+1));
        res.push(n);
        arr = arr.slice(0, n).reverse().concat(arr.slice(n));
        n--;
    }
    console.log(arr);
    return res;
};
const res = pancakeSort([3,2,5,1]);
console.log(res);