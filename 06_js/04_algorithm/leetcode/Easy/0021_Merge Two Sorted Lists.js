/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

const mergeTwoLists = (l1, l2) => {
  const checkRecursiveNode = (n1, n2, n3) => {
    if (!n1 && !n2) {
      return n3;
    }

    if (n1 && n2) {
      if (n1.val <= n2.val) {
        n3.next = new ListNode(n1.val);
        return checkRecursiveNode(n1.next, n2, n3.next);
      }
      if (n1.val > n2.val) {
        n3.next = new ListNode(n2.val);
        return checkRecursiveNode(n1, n2.next, n3.next);
      }
    } else if (n1 && !n2) {
      n3.next = new ListNode(n1.val);
      return checkRecursiveNode(n1.next, null, n3.next);
    } else if (!n1 && n2) {
      n3.next = new ListNode(n2.val);
      return checkRecursiveNode(null, n2.next, n3.next);
    }
    return null;
  };

  const l3 = new ListNode(null);
  checkRecursiveNode(l1, l2, l3);
  return l3.next;
};
