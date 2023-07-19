/* 将字符串转化为最短回文 */
/**
 * @param s     bcdeanana
 * @param rev_s ananaedcb
 * 适用于回文在两端的情况
 */
let s = 'cdananaedcb'
const shortStr = (s) => {
  let len = s.length;
  let rev_s = s.split('').reverse().join('');
  console.log(s);
  console.log(rev_s);
  let leftStart = ''
  let rightStart = ''

  console.log(rev_s.substring(len - i));

  // 原字符串往左搜索
  for(let i = len; i > 0; i--) {
    if(s.substring(0, i) == rev_s.substring(len - i)) {
      leftStart = rev_s.substring(0, len - i) + s;
      break;
    }
  }
  // 原字符串往右搜索
  for(let i = 0; i < len; i++) {
    if(s.substring(i, len) == rev_s.substring(0, len - i)) {
      rightStart = rev_s.substring(0, i) + s;
      console.log(rightStart);
      break;
    }
  }
  return leftStart.length > rightStart.length ? rightStart : leftStart
}
console.log(shortStr(s));
//[ 'ananaedcbcdeanana', 'ananbcdeanana' ] 的较短值