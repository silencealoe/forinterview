function versionCompare(version1, version2) {
    var a = version1.toString().split('.');
    var b = version2.toString().split('.');
    var len = Math.max(a.length, b.length);
    for (var i = 0; i < len; i++) {
        if ((a[i] && !b[i] && parseInt(a[i], 10) > 0) || (parseInt(a[i], 10) > parseInt(b[i], 10))) {
            return 1 /* bigger */;
        }
        else if ((b[i] && !a[i] && parseInt(b[i], 10) > 0) || (parseInt(a[i], 10) < parseInt(b[i], 10))) {
            return -1 /* smaller */;
        }
    }
    return 0 /* equl */;
}

/**
 *  ios 特定机型会将&变成？
 *  从url search上获取指定的参数
 * @param name
 */
 function getUrlString(name) {
    const reg = new RegExp('(^|&)' + name + '=([^&\\?]*)(&|\\?|$)');
    const r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    }
    return '';
}

/**
 * 判断字符串长度 （汉字算两个字符，字母数字算一个）
 * @param str
 * @returns number 字符串长度
 */
 function getByteLen(str) {
    let len = 0;
    for (let i = 0; i < str.length; i++) {
        const a = str.charAt(i);
        if (a.match(/[^\x00-\xff]/ig) != null) {
            len += 2;
        } else {
            len += 1;
        }
    }
    return len;
}

/**
 * 截断字符串
 *  字符串超过固定长度, 以...结尾
 * @param str
 * @param length 汉字算两个, 其他算一个
 * @returns number 字符串长度
 */
export function cutString(str, length) {
    try {
        const strLength = getByteLen(str);
        if (strLength > length) {
            return `${str.slice(0, -2)}...`;
        }
    } catch (e) {}
    return str;
}

/**
 * 将 title 中的关键词标红
 * @param keyword 关键词, 多个关键词以空格区分
 * @param title 需要标红的字符串
 * @returns string 带 span 标签的字符串
 */
 export function replaceKeyword(keyword = '', title= '') {
    try {
        if (!keyword) {
            return title;
        }
        const keywords = keyword.split(' ');
        const outer = [];
        keywords.map(kw => {
            // 输入'i++'之类的会导致正则出错
            const fixkw = kw.replace(/(\+|\-|\*|\/|\(|\)|\.|\'|\"|\:|\[|\])/gi, '');
            fixkw && outer.push(fixkw);
        });
        const regexp = new RegExp('(' + outer.join('|') + ')', 'ig');
        return title.replace(regexp, '<span>$1</span>');
    } catch (e) {
        return title;
    }
}

/**
 * 将秒数转化为 分钟数:秒数 的形式
 * @param number 秒数 [必传]
 * @return string 分数:秒数
 */
export function convertNumberToVideoString(duration) {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.ceil(duration % 60);
    return `${minutes > 9 ? minutes : `0${minutes}`}:${seconds > 9 ? seconds : `0${seconds}`}`;
}

// &.show-sticky {
//     width: 699px;
//     position: sticky;
//     top: -360px;
//     margin-top: -120px;
//     transform: translateY(106vh);
// }

