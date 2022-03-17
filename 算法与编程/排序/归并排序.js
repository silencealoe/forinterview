/**
 * 归并排序：分治思想 
 * 将数组分为两部分分别排序后 合并
 * 
 * 稳定 非原地 时间复杂度 O(nlogn) 空间复杂度 O(n)
 */
const mergeSort = (arr) => {
    const mergeSplit = (arr) => {
        if (arr.length < 2) {
            return arr;
        }
        const mid = Math.floor(arr.length / 2);
        const leftArr = arr.slice(0, mid);
        const rightArr = arr.slice(mid);
        return merge(mergeSplit(leftArr), mergeSplit(rightArr));
    }
    const merge = (leftArr, rightArr) => {
        let i = 0;
        let j = 0;
        let result = [];
        while (i < leftArr.length && j < rightArr.length) {
            if (leftArr[i] < rightArr[j]) {
                result.push(leftArr[i]);
                i++;
            } else {
                result.push(rightArr[j]);
                j++;
            }
        }
        if (i < leftArr.length) {
            result.push(...leftArr.slice(i))
        }
        if (j < rightArr.length) {
            result.push(...rightArr.slice(j))
        }
        return result
    }
    return mergeSplit(arr);
}
const res = mergeSort([10,3,5,7,4,1]);
console.log(res);
