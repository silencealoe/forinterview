var sumOfUnique = function(nums) {
    const recordobj = {};
    let sum = 0;
    for(let i =0;i < nums.length;i++) {
        if (!recordobj[nums[i]]) {
            sum+=nums[i];
            recordobj[nums[i]] = 1;
        } else {
            if (recordobj[nums[i]] === 1) {
                sum -= nums[i];
            }
            recordobj[nums[i]] += 1;
        }
    }
    return sum;
};
const res = sumOfUnique([1,1,1,1]);
console.log(res)