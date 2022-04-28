/**
 * 二叉搜索树特点： 支持动态数据集合的快速插入 删除 查找操作
 * 树中任意一个结点 其左子树任意一个节点都小于这个节点 
 * 任意一个右子树节点都大于 这个节点
 * 
 * 中序遍历可直接按顺序输出
 *
 * 二叉搜索树的查找：
 * 从根节点开始比较 如果小于根节点 去左子树查找  大于根节点 去右子树查找 依次递归
 * 
*/
function searchBinaryTree(root, data) {
    let p = root
    while(p) {
        if(data < p.val) {
            p = p.left
        } else if(data > p.val) {
            p = p.right
        } else {
            return p
        }
    }
    return null
}
/**
 * 二叉搜索树的插入
 * 类似查找过程 新插入的数据一般都是在叶子结点 
 * 从根节点开始比较 如果插入的数据大于根节点 如果右子树为空 则直接插入右子树 
 * 如果不为空 则依次遍历右子树 直到插入
*/

function insertBinaryTree(root, data) {
    let p = root;
    while(p) {
        if(data > p.val) {
            if(p.right === null) {
                p.right = new Node(data)
                return
            }
            p = p.right
        } else {
            if(p.right === null) {
                p.right = new Node(data)
                return
            }
            p = p.left
        }
    }
}

/**
 * 二叉搜索树的删除操作
 * 
 *第一种情况： 被删除节点无子节点 直接将父节点指向null
 * 第二中情况： 被删除节点只有一个子节点（左子节点或者右子节点）
 * 第三种情况：被删除节点有两个子节点 从右子树中寻找最小的节点 替换 被删除节点
*/

function deleteBinaryTree(root, data) {
    let p = root
    let parentNode = null
    while(p && p.val !== data) {
        parentNode = p
        if(data > p.val) {
            p = p.right
        } else {
            p = p.left
        }
    }
    if(p === null) return root;
    if(p.left && p.right) { // 被删除节点有两个子节点
        let minp = p.right
        let minParent = p
        while(minp) {
            minParent = minp
            minp = minp.left
        }
        p.val = minp.val
        minParent.left = null
        p.right = minParent
    }
}

