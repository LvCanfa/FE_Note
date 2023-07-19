/**
 * @act lcs 算法，用于找出两端字符串中最长子串，基本思路为动态规划。
 * @desc  1. 以新旧字符串的长度 +1 构建二维数组 lcsArr，初始化为0
 *        2. 从 idx = 1 开始内外两层for 循环嵌套
 *            1. 若当前位置字符相同(strOld[i] === strNew[j])，则二维数组的当前格子数字为左上角数字加一
 *            2. 若不同，则赋值为上一排/列的较大值。
 *        3. 完成赋值后，从二维数组的末尾往开头遍历,若此位置的上侧与左侧相同，则获取此位置对应的旧字符串的字符，插入到 sameStrArr ，反之向左/上移动。
 *        4. 根据相同子串，获取新旧字符串的非最长相同子串的部分
 * @param {*} strOld 旧字符串
 * @param {*} strNew 新字符串
 * @returns strOld: 旧字符串, str2：新字符串,
 *          lcsArr：动态规划的结果数组，数字增加则为相同字符,
 *          sameStrArr：最长系统子字符拆成的数组,
 *          operateArr：对旧数组转化为新数组的操作
}
 */
export function LcsFn(strOld, strNew) {
  const n1 = strOld.length;
  const n2 = strNew.length;

  /**
   * 建立二维数组，使用动态规划存储子串长度
  */ 
  const lcsArr = new Array(n1 + 1).fill(null)
    .map((_, index) => new Array(n2 + 1).fill(0));

  /**
   * 两层for 循环嵌套，若当前位置字符相同，则二维数组的当前格子数字为左上角数字加一，若不同，则赋值为上一排/列的较大值
   */
  for (let i = 1; i < n1 + 1; i++) {
    for (let j = 1; j < n2 + 1; j++) {
      if (strOld[i - 1] === strNew[j - 1]) {
        lcsArr[i][j] = lcsArr[i - 1][j - 1] + 1
      } else {
        lcsArr[i][j] = Math.max(lcsArr[i][j - 1], lcsArr[i - 1][j])
      }
    }
  }
  /**
   * 获取最长子串数组、旧字符串变新字符串过程数组
   */
  const {sameStrArr, operateArr} = getStr(strOld, strNew, lcsArr);
  return { strOld, strNew, lcsArr, sameStrArr, operateArr}
}

/**
 * 根据二维数组输出子串具体字符
 * @param {*} strOld 旧字符串
 * @param {*} strNew 新字符串
 * @param {*} lcsArr LcsFn进行 dp对比之后的二维数组
 * @returns  最长子串数组、旧字符串变新字符串过程数组
 */
function getStr(strOld, strNew, lcsArr) {
  const sameStrArr = []
  let i = strOld.length,
    j = strNew.length

  /**
   * 从二维数组的末尾往开头遍历,若此位置的上侧与左侧相同，则获取此位置对应的旧字符串的字符，反之向左/上移动
   */
  while (i > 0 && j > 0) {
    if (strOld[i - 1] === strNew[j - 1]) {
      sameStrArr.unshift(strOld[i - 1])
      i--
      j--
    } else if (lcsArr[i][j - 1] > lcsArr[i - 1][j]) {
      j--
    } else {
      i--
    }
  }
  /**
   * 根据最长相同子串数组获取旧字符串向新字符串转变步骤
   */
  const operateArr = getStrPlace(strOld, strNew, sameStrArr);
  return {sameStrArr, operateArr};
}

/**
 * @param {strOld, strNew, sameStrArr}
 * strOld: 旧字符串
 * strNew: 新字符串
 * sameStrArr: 新旧字符串的最长子字符串
 *
 * @desc  1. 根据相同子串，获取新旧字符串的非最长相同子串的部分，
 *        2. 旧子串部分前面设置为‘ - ’，新字符部分设置为 ‘ + ’，相同部分设置为 ‘ = ’
 *        3. 可以根据‘- + =’设置不同className
*/
function getStrPlace(strOld, strNew, sameStrArr) {
  let oldSameItem = 0; // 旧字符串的上一个相同子字符节点
  let newSameItem = 0; // 新字符串的上一个相同子字符节点
  let lastOldItem = 0; // 旧字符串的上一个切割节点
  let lastNewItem = 0; // 新字符串的上一个切割节点
  const deleteOldItems = [];  // 存储对比后的删除字符段
  const addNewItems = []; // 存储对比后的新增的字符段

  // 获取旧字符串中删除的字符段
  for (let i = 0; i < strOld.length; i++) {
    if (strOld[i] === sameStrArr[oldSameItem]) {
      deleteOldItems.push(i - lastOldItem > 0 ? strOld.slice(lastOldItem, i) : '');
      lastOldItem = i + 1;
      oldSameItem++
      if (oldSameItem == sameStrArr.length) {
        deleteOldItems.push(i < strOld.length - 1 ? strOld.slice(i + 1, strOld.length) : '');
        break;
      }
    }
  }

  // 获取新字符串中新增的字符段
  for (let i = 0; i < strNew.length; i++) {
    if (strNew[i] === sameStrArr[newSameItem]) {
      addNewItems.push(i - lastNewItem > 0 ? strNew.slice(lastNewItem, i) : '');
      lastNewItem = i + 1;
      newSameItem++
      if (newSameItem == sameStrArr.length) {
        addNewItems.push(i < strNew.length - 1 ? strNew.slice(i + 1, strNew.length) : '');
        break;
      }
    }
  }

  // 依次将删除、新增、相同，标记后插入数组
  let index = 0;
  const resultArr = sameStrArr.reduce((lastValue, currentValue, currentIndex) => {
    const newArr = [];
    if (deleteOldItems[index]) {
      newArr.push('-');
      newArr.push(deleteOldItems[index]);
    }
    if (addNewItems[index]) {
      newArr.push('+');
      newArr.push(addNewItems[index]);
    }
    newArr.push('=');
    newArr.push(currentValue);
    index++;
    const returnArr = lastValue.concat(newArr);

    // 判断最末尾有无字符串增删，有则插入
    if (currentIndex === sameStrArr.length - 1) {
      const lastArr = [];
      if (deleteOldItems[index]) {
        lastArr.push('-');
        lastArr.push(deleteOldItems[index]);
      }
      if (addNewItems[index]) {
        lastArr.push('+');
        lastArr.push(addNewItems[index]);
      }
      return returnArr.concat(lastArr);
    }
    return returnArr
  }, []);
  return resultArr
}