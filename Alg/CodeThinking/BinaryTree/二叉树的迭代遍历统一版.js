let arrayTree = Array(2**4-1).fill(0).map((item, index) => {
  return {
    val: index + '-' + index
  }
});
arrayTree.forEach((item, index) => {
  item.left = arrayTree[index * 2 + 1] || null,
  item.right = arrayTree[index * 2 + 2] || null
});
const tree = arrayTree[0];
arrayTree = null;
// 前序遍历：中左右
// 压栈顺序：右左中
// var preorderTraversal = function (root, res = []) {
//   const stack = []
//   if (arrayTree[root]) {
//     stack.push({
//       arrayTree
//     })
//   }
// }

// console.log(preorderTraversal(tree));