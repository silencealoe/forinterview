// "A man, a plan, a canal: Panama"
// 只考虑数字和字母，字母忽略大小写
const isPalindrome = (str) => {
    let thisStr = str.replace(/[^0-9a-zA-Z]/g, '');
    thisStr = thisStr.replace(/([A-Z])/g, (s1, s2) => {
        return s2.toLowerCase();
    })
    let i = 0;
    let j = thisStr.length - 1;
    while(i<j) {
        if(thisStr[i]!==thisStr[j]) {
            return false
        }
        i++;
        j--;
    }
    return true;

}
const res = isPalindrome('A man, a plan, a canal: Panama')
console.log(res)