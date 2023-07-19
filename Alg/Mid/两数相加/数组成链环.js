
var addTwoNumbers = function (l1, l2) {

  let full = 0, index = 0;
  let resArr = [];
  while (l1 || l2 || full) {
    resArr[index] = new ListNode();

    let thisVal = ((!!l1 ? l1.val : 0) + (!!l2 ? l2.val : 0) + full) % 10
    resArr[index].val = thisVal

    if ((!!l1 ? l1.val : 0) + (!!l2 ? l2.val : 0) + full >= 10) {
      full = 1;
    } else {
      full = 0;
    }

    if (resArr[index - 1]) {
      resArr[index - 1].next = resArr[index]
    }
    index++;
    l1 = l1?.next || null;
    l2 = l2?.next || null;
  }
  return resArr[0]
};