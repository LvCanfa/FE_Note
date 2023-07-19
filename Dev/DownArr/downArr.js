function flattenArr(list) {
  const arr = list.reduce((a, b) => {
    return a.concat(Array.isArray(b) ? flattenArr(b) : b)
  },
  []);
  return arr
}
function flattenSrting(arr) {
  const splitLeft = arr.split('[');
  splitLeft.shift();
  const splitRight = splitLeft.splice(splitLeft.length - 1, 1)[0].split(']');
  const res = [...splitLeft,...splitRight].join('').trim().split(',');

  return res
}
const list = '[1,2,3,[4,5,[7,4,1,[132,4232]]]]'

/**
 * 输入为字符串
 */
// console.log(flattenSrting(list));
console.log(list.replace(/[\[|\]]/g, '').split(','));
/**
 * 输入为数组
 */
// console.log(flattenArr(list));
// console.log(list.toString().split(','))