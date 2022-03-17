/**
 * 给你一个字符串 text，你需要使用 text 中的字母来拼凑尽可能多的单词 "balloon"（气球）。

字符串 text 中的每个字母最多只能被使用一次。请你返回最多可以拼凑出多少个单词 "balloon"。

 */
var maxNumberOfBalloons = function(text) {
    const targetStr ={
        'b': 0,
        'a': 0,
        'l': 0,
        'o': 0,
        'n': 0
    }
    for(let i = 0; i<text.length;i++) {
        if (text[i] in targetStr) {
            targetStr[text[i]] += 1;
        }
    }
    let resCount = Math.min(targetStr['a'], targetStr['b'], targetStr['n']);
    let dCount = Math.min(Math.floor(targetStr['l'] / 2), Math.floor(targetStr['o'] / 2));
    if(resCount=== 0 || dCount === 0) {
        return 0
    }
    if (dCount <= resCount) {
        return dCount
    } else {
        return resCount
    }
};
const res = maxNumberOfBalloons('balllloooon');
console.log(res)