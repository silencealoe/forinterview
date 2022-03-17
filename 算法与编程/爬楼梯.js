/**
 * 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

 *每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
 * 
*/

var climbStairs = function(n) {
    // if (n === 1 || n=== 2) {
    //     return n
    // }
    // return climbStairs(n - 1) + climbStairs(n -2);
    // 运行超时溢
    if (n === 1 || n === 2) {
        return n
    }
    let res = [1, 2];
    for (let i = 2; i < n; i++) {
        res[i] = res[i - 1] + res[i - 2];
    }
    return res[res.length - 1];
};
const res = climbStairs(100);
console.log(res);
// 1 2 3 5  