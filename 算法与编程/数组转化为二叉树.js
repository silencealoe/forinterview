function TreeNode(val, left, right) {
    this.val = val;
    this.left = left || null;
    this.right = right || null;
}
const sortedArrayToBST = (nums) => {
    if (!nums.length) {
        return null
    }
    if (nums.length === 1) {
        return new TreeNode(nums[0]);
    }
    const mid = Math.floor(nums.length / 2);
    const node = new TreeNode(nums[mid]);
    node.left = sortedArrayToBST(nums.slice(0, mid));
    node.right = sortedArrayToBST(nums.slice(mid + 1, nums.length));
    return node
}
const res = sortedArrayToBST([-10,-3,0,5,9]);
console.log(res)