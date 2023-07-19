/**
 * @act 寻找数组的最长递增子序列
 * @desc  1. 构建二维数组dp，初始化为 [val].
 *        2. 循环nums：i [1->n)，内嵌循环遍历对比 j [0->i),即找出以 nums[i] 为最大值时的最长子序列
 *        3. 具体为：对比nums的 i、j值，若i大，则对比 dp[i]、dp[j] 的长度，若dp[j]大，则将 i 插入到 dp[j] 后面并赋值给 dp[i]。
 *        4. 最后找出dp中的最长元素
 *      
 * @param {*} nums 
 * @returns 最长子序列的id数组
 */
export function lis(nums) {
    const n = nums.length;
    const arrContainer = new Array(n).fill('');
    const dp = arrContainer.map((item, idx) => {
        return item = [idx]
    });

    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = dp[i].length > dp[j].length ?
                    dp[i] : [...dp[j], i]
            }
        }
    }

    let maxIdxs = [];
    for (let i = 0; i < n; i++) {
        if (dp[i].length > maxIdxs.length) {
            maxIdxs = dp[i]
        }
    }

    return maxIdxs;
}

const nums = [10, 9, 2, 5, 3, 7, 101, 18];
const lisLength = lis(nums);
console.log(lisLength);  // [2,3,5,6]
