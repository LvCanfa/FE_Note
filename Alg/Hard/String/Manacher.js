// // 找出字符串中的最长回文串

// /**
//  *
//  * @param {*} s 传入的寻找回文字符串
//  * @returns 将传入的字符串插入 # 来形成奇数
//  */
function setStr(s) {
  let start = '^';
  for (let i = 0; i < s.length; i++) {
    start += `${s[i]}#`
  }
  return start
}

function getStr(s) {
  // 获取奇数字符串
  const newStr = setStr('sadvbnggnbvabcc');
  const n = newStr.length;
  // 用于存储奇数字符串每一个位置的回文长度
  const returnNum = new Array(n);

  let current = 0, right = 0;

  for(let i = 0; i < n; i++) {
    let i_mirror = 2 * current - i;
    if(right > i ) {
      returnNum[i] = Math.min(right - i, returnNum[i_mirror]);
    }else {
      returnNum[i] = 0;
    }

    // 中心扩展法，回文长度
    while(newStr[i + 1 + returnNum[i]] === newStr[i - 1 - returnNum[i]]) {
      returnNum[i]++;
    }

    // i的回文超过右边界，重新定义current位置
    if(i + returnNum[i] > right) {
      current = i;
      right = i + returnNum[i];

    }
  }

  let maxLen = 0;
  let currentIndex = 0;
  for (let i = 0; i < returnNum.length; i++) {
    if(returnNum[i] > maxLen) {
      maxLen = returnNum[i];
      currentIndex = i;
    }
  }
  const returnNumStart = (currentIndex - maxLen) / 2;
  return s.substring(returnNumStart, returnNumStart +maxLen);
}
console.log(getStr('sadvbngagnbvabcc'));

// 马拉车简化版

// function getStr(s) {
//   const newStr = setStr(s);
//   const arr = new Array(newStr.length).fill(0);
//   for (let i = 0; i < newStr.length; i++) {
//     while(
//       newStr[i - 1 - arr[i]] &&
//       newStr[i + 1 + arr[i]] &&
//       newStr[i - 1 - arr[i]] === newStr[i + 1 + arr[i]]
//     )
//       {
//         arr[i]++
//       }
//   }
//   let maxLen = 0, currentIndex = 0;
//   arr.map((item, i) => {
//     if(item > maxLen) {
//       maxLen = item;
//       currentIndex = i;
//     }
//   })
//   console.log(currentIndex +''+ maxLen);
//   const returnNumStart = (currentIndex - maxLen) / 2;
//   return s.substring(returnNumStart, returnNumStart +maxLen);
// }
