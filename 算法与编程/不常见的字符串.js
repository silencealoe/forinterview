// const uncommonFromSentences = (s1, s2) => {
//     const s = s1 + ' ' + s2;
//     const sArr = s.split(' ');
//     const map = {};
//     for(let i = 0; i< sArr.length;i++) {
//         if (!map[sArr[i]]) {
//             map[sArr[i]] = 1
//         } else {
//             map[sArr[i]] += 1
//         }
//     }
//     const res = []
//     for(let key in map) {
//         if(map[key]=== 1) {
//             res.push(key);
//         }
//     }
//     return res
// }
const uncommonFromSentences = (s1, s2) => {
    let ss2 = new Set(s2.split(' '));
    let ss1 = new Set(s1.split(' '));
    const res = [];
    for(let item of ss2) {
        if(!ss1.has(item)) {
            res.push(item);
        }
    }
    for(let item of ss1) {
        if(!ss2.has(item)) {
            res.push(item);
        }
    }
    return res;
}
const res = uncommonFromSentences('ax bn cd', 'ax dr');
console.log(res);