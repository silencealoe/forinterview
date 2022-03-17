/**
 * 给你一个仅由整数组成的有序数组，其中每个元素都会出现两次，唯有一个数只会出现一次。
请你找出并返回只出现一次的那个数。
你设计的解决方案必须满足 O(log n) 时间复杂度和 O(1) 空间复杂度。
*/

var singleNonDuplicate = function(nums) { 
    let l = 0;
    let r = nums.length;
    while(l < r) {
        let mid = Math.floor(l + (r - l) / 2);
        console.log(mid)
        if(mid%2===0) {
            mid++
        }
        // mid -= 1;
        if (nums[mid] !== nums[mid + 1] && nums[mid] !== nums[mid - 1]) {
            return nums[mid];
        }
        if (nums[mid] !== nums[mid - 1]) {
            r = mid - 1;
        } else {
            l = mid + 1;
        }
    }
    return nums[l];
};
const res = singleNonDuplicate([1,1,2,2,3,3,4,5]);
console.log(res);