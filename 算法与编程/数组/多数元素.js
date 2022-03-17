/**
 * 出现次数大于 n / 2
 * @param {number[]} nums
 * @return {number}
 */
 var majorityElement = function(nums) {
    // const resObj = {};
    // for(let i = 0; i<nums.length; i++) {
    //     if(!resObj[nums[i]]) {
    //         resObj[nums[i]] = 1;
    //     } else {
    //         resObj[nums[i]] +=1;
    //     }
    // }
    // let max = 0;
    // let maxKey = 0;
    // console.log(resObj)
    // for(let key in resObj) {
    //     if(resObj[key] > max) {
    //         max = resObj[key]
    //         maxKey = key
    //     }
    // }
    // return maxKey;
    let count = 1;
    let temp = nums[0];
    for (let i = 1; i<nums.length; i++) {
        if(nums[i] === temp) {
            count++
        } else {
            count--;
        }
        if(count === 0) {
            temp = nums[i]
            count = 1
        }
    }
    return temp
};
const res = majorityElement([3,2,3]);
console.log(res);