/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
 var getIntersectionNode = function(headA, headB) {
    let h1 = headA;
    let h2 = headB;
    while(h1 && h2) {
        if(h1.val === h2.val) {
            return h1.val
        }
        h1 = h1.next;
        h2 = h2.next;
    }
    return null;
};
const res = getIntersectionNode()