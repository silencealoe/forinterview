/**
 * 策略模式
 * 对不同的输入采用不同的策略。有需求变更时，只需要增加或者修改内部的策略就可以了。
 * 很常用的场景是用来代替重复的 if…else if…else 代码
*/
function showResultWithStrategyPattern(level) {
    const resultMap = {
      A: '10 颗星',
      B: '9 颗星',
      C: '8 颗星',
      D: '7 颗星',
      E: '6 颗星',
      default: '',
    }
    return resultMap[level] || resultMap.default;
  }