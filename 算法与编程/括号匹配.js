// 括号匹配问题：
const braceMatch = (str) => {
    const strMap = {
        '}':'{',
        ']':'[',
        ')':'('
    }
    const tempArr = [];
    for(let i = 0; i < str.length; i++) {
        if (!strMap[str[i]]) {
            // 是左括号就入栈
            tempArr.push(str[i])
        } else {
            const target = tempArr.pop();
            if (target !== strMap[str[i]]) {
                return false
            }
        }

    }
    if (!tempArr.length) {
        return true
    } else {
        return false
    }
}
console.log(braceMatch('({})[]'));