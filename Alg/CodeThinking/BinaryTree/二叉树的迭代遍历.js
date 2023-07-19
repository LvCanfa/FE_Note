/**
 * 1. 前序遍历：中左右：
 *        每次先处理的是中间节点，那么先将根节点放入栈中，然后将右孩子加入栈，再加入佐孩子
 * 2. 入栈： 中 -> 右 -> 左
 * 3. 出栈： 中 -> 左 ->右
 */
let arrayTree = Array(2**4-1).fill(0).map((item, index) => {
  return index + '-' + index
});
// 前序遍历 ---- 中左右
var preorderTraversal = function(root, res = []) {
  if(arrayTree[root]===undefined) return res;
  const stack = [];
  // 中
  stack.push({
    key: arrayTree[root],
    index: root
  });
  let cur = null;
  while(stack.length) {
    let nowMess = stack.pop()
    res.push(nowMess.key);
    cur = nowMess.index;
    // 右
    arrayTree[cur*2 + 2] &&
      stack.push({
        key: arrayTree[cur*2 + 2],
        index: cur*2 + 2
      });
      // 左
    arrayTree[cur*2 + 1] &&
      stack.push({
        key: arrayTree[cur*2 + 1],
        index: cur*2 + 1
      });
  }
  return res;
}

/**
 * 1. 后序遍历：左右中 -》中右左的反转
 *        每次先处理的是中间节点，那么先将根节点放入栈中，然后将左孩子加入栈，再加入右孩子
 * 2. 入栈： 中 -> 左 -> 右
 * 3. 出栈： 中 -> 右 ->左  结果反转
 */
var postorderTraversal = function(root, res = []) {
  if(arrayTree[root]===undefined) return res;
  const stack = [];
  // 中
  stack.push({
    key: arrayTree[root],
    index: root
  });
  let cur = null;
  while (stack.length) {
    let nowMess = stack.pop()
    res.push(nowMess.key);
    cur = nowMess.index;
    // 左
    arrayTree[cur*2 + 1] &&
      stack.push({
        key: arrayTree[cur*2 + 1],
        index: cur*2 + 1
      });
    // 右
    arrayTree[cur*2 + 2] &&
      stack.push({
        key: arrayTree[cur*2 + 2],
        index: cur*2 + 2
      });
  }
  return res.reverse();
}

/**
 * 1. 中序遍历：左右中 -》中右左的反转
 *        每次先处理的是中间节点，那么先将根节点放入栈中，然后将左孩子加入栈，再加入右孩子
 * 2. 入栈： 中 -> 左 -> 右
 * 3. 出栈： 左 -> 中 -> 右
 */
var inorderTraversal = function (root, res = []) {
  const stack = [];
  // 中
  stack.push({
    key: arrayTree[root],
    index: root
  });
  let cur = root;
  while (stack.length) {
    let left = cur*2 + 1;
    if (arrayTree[left]!== undefined) {
      // 左
      stack.push({
        key: arrayTree[left],
        index: left
      });
      cur = left;
    } else {
      let nowMess = stack.pop();
      cur = nowMess.index;
      res.push(nowMess.key);
      // 右
      arrayTree[cur*2 + 2] && stack.push({
        key: arrayTree[cur*2 + 2],
        index: cur*2 + 2
      });
      cur = cur*2 + 2;
    }
  };
  return res;
}
console.log(preorderTraversal(0));
console.log(postorderTraversal(0));
console.log(inorderTraversal(0));