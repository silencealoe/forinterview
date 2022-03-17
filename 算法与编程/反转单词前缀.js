const reversePrefix = (word, ch) => {
    // let index = 0;
    // let resStr = '';
    // for (let i = 1; i < word.length; i++) {
    //     if (word[i] === ch && !index) {
    //         index = i;
    //         while (index >= 0) {
    //             resStr += word[index];
    //             index--;
    //         }
    //     } else if (i > index && index < 0) {
    //         resStr +=word[i];
    //     }
    // }
    // if (!index) {
    //     resStr = word
    // }
    // return resStr;

    // let index = word.indexOf(ch);
    // if (index > -1) {
    //     let end = word.substr(index+1);
    //     let reveStr = '';
    //     while(index >= 0) {
    //         reveStr += word[index];
    //         index --;
    //     }
    //     return reveStr + end;
    // } else {
    //     return word
    // }

    let res = '';
    let prev = '';
    for (let s of word) {
        console.log(s);
        if(ch === '') {
            res += s
        } else if (ch === s) {
            ch = ''
            res = s + prev
        } else {
            prev = s + prev
        }
    } 
    return ch === '' ? res : word
}
const res = reversePrefix('abcdefd', 'd');
console.log(res)