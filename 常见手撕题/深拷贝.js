function searchNum(nums, target) { 
    let left = 0;
    let right = nums.length - 1;
    while(left <= right) {
        let mid = Math.floor((left+right) / 2) ;
        if(nums[mid] === target) {
            return true;
        }
        // 如果左半边有序
        if(nums[left] < nums[mid]) {
            if(target >= nums[left] && target < nums[mid]) {
                right = mid - 1;
            }else {
                left = mid + 1;
            }
        }
        // 如果右半边有序
        else if(nums[left] > nums[mid]) {
            if(target > nums[mid] && target <=nums[right]) {
                left = mid + 1;
            }else {
                right = mid - 1;
            }
        }
        else {
            left++
        }
    }
    return false
}
let nums = [6,7,9,0,0,1,4,6]
console.log(searchNum(nums,2))