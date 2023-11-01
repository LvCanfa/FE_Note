const treeVal = []
let arrayTree = Array(2 ** 4 - 1).fill(0).map((item, index) => {
  treeVal.push(index)
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
let preorderTraversal = function (root, res = []) {
  console.log(root);
  const stack = []
  if (root) {
    stack.push(...preorderTraversal(root.left));
    stack.push(...preorderTraversal(root.right));
    stack.push(root.val)
  }
  return stack
}
console.log(preorderTraversal(tree));
console.log(treeVal,'treeVal');
/**
 * 
    前序：0-1-3-7-8-4-9-10-2-5-11-12-6-13-14
    中序：7-3-8-1-9-4-10-0-11-5-12-2-13-6-14
    后序：7-8-3-9-10-4-1-11-12-5-13-14-6-2-0
-----------------------------------------------------
      [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]
                    0
              1           2
            3    4  |  5      6
          7  8 9  10 11  12 13  14

 */