// ListNode 类型定义
function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}

// 根据数组生成对应的 TreeNode
function getTreeNode(arr) {
  const result = new ListNode(arr[0])
  arr[0] = result;
  const resLen = arr.length
  for (let i = 1; i < resLen; i++) {
    let obj = new ListNode(arr[i])
    arr[i] = obj;
    arr[i - 1].next = arr[i]
  }
  return arr[0]
}