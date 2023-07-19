var addTwoNumbers = function (l1, l2) {

  let addNum = 0;
  let lastObj = new ListNode();
  const head = lastObj;

  while (l1 || l2 || addNum) {
    let l1Val = l1 !== null ? l1.val : 0,
      l2Val = l2 !== null ? l2.val : 0,
      sum = l1Val + l2Val + addNum;

    addNum = sum >= 10 ? 1 : 0;

    lastObj.next = new ListNode(sum % 10);
    lastObj = lastObj.next;

    // head始终指着头指针，lastObj指针逐步先后移动

    l1 = l1?.next || null;
    l2 = l2?.next || null;
  }
  return head.next
};
