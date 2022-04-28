/**
 * @param {TreeNode} root
 * @return {number[][]}
 * 利用队列实现
 */

/**
 * 二叉树的遍历： 前中后序遍历 和 层次遍历
 * 节点的高度： 从下往上 所经过的边的个数
 * 节点的深度：从上往下 所经历的边的个数
 * 节点的层数： 深度+1
*/
 var levelOrder = function(root) {
    if(!root) {
        return []
    }
    let queue = []
    queue.push(root)
    const res = []
    while(queue.length) {
        let len = queue.length
        const curArr = []
        while(len > 0) {
            const node = queue.shift()
            curArr.push(node.val)
            if(node.left) {
                queue.push(node.left)
            }
            if(node.right) {
                queue.push(node.right)
            }
            len--
        }
        res.push(curArr)
    }   
    return res
};