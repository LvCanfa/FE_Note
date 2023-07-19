/**
 * @param {递归要素}
 * 1. 确定递归函数的参数和返回值：
 *        确定哪些参数是递归的过程中需要处理的，那么就在递归函数里加上这个参数， 并且还要明确每次递归的返回值是什么进而确定递归函数的返回类型。
 * 2. 确定终止条件：
 *        写完了递归算法, 运行的时候，经常会遇到栈溢出的错误，就是没写终止条件或者终止条件写的不对，操作系统也是用一个栈的结构来保存每一层递归的信息，如果递归没有终止，操作系统的内存栈必然就会溢出。
 * 3. 确定单层递归的逻辑：
 *        确定每一层递归需要处理的信息。在这里也就会重复调用自己来实现递归的过程。
 */

let arrayTree = Array(2**4-1).fill(0).map((item, index) => {
    return index % 3 === 0 ? null : index
  });

/**
 * @return {前序遍历}
 */
var preorderTraversal = function(root) {
  let res = [];
  const dfs = function(root) {
    if(arrayTree[root] === undefined){
      return;
    }
    // 先序遍历所以从父节点开始
    res.push(arrayTree[root])
    // 递归左子树
    dfs(root*2 + 1);
    // 递归右子树
    dfs(root*2 + 2);
  }
  dfs(root);
  return res;
}

/**
 * @return {中序遍历}
 */
var inorderTraversal = function(root) {
  let res = [];
  const dfs = function(root) {
    if(arrayTree[root] === undefined){
      return;
    }
    dfs(root*2 + 1);
    res.push(arrayTree[root])
    dfs(root*2 + 2);
  }
  dfs(root);
  return res;
}
/**
 * @return {后序遍历}
 */
var postorderTraversal = function(root) {
  let res = [];
  const dfs = function(root) {
    if(arrayTree[root] === undefined){
      return;
    }
    dfs(root*2 + 1);
    dfs(root*2 + 2);
    res.push(arrayTree[root])
  }
  dfs(root);
  return res;
}
console.log(preorderTraversal(0));
// console.log(inorderTraversal(0));
// console.log(postorderTraversal(0));