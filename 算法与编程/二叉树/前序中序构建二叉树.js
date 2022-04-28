var buildTree = function(preorder, inorder) {
    if(!preorder.length || !inorder.length) {
        return null
    }
    const root = new TreeNode(preorder[0])
    const len = preorder.length
    for(let i = 0; i < len;i++) {
        if(preorder[0] === inorder[i]) {
            root.left = buildTree(preorder.slice(1, i+1), inorder.slice(0, i))
            root.right = buildTree(preorder.slice(i+1, len), inorder.slice(i+1, len))
            break
        }
        
    }
    return root
};