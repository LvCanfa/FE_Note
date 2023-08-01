
const arr = [5, 3, 8, 4, 2, 7, 1, 6];
//   const sortedArr = quickSort(arr);
const sortedArr = myFastSort(arr);
console.log(sortedArr); // 输出 [1, 2, 3, 4, 5, 6, 7, 8]

/**
 * @desc 普通快排
 * @param {*} arr 
 * @returns 
 */
function myFastSort(arr) {
    if (arr.length <= 1) {
        return arr
    }
    let left = [];
    let right = [];
    const baseItem = arr[Math.floor(arr.length / 2)];
    for (let i = 0; i < arr.length; i++) {
        if (i === Math.floor(arr.length / 2)) {
            continue;
        }
        if (arr[i] < baseItem) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    return [...myFastSort(left), baseItem, ...myFastSort(right)]
}
/**
 * @desc 空间复杂度为 1 的快排
 */

function partition(arr, low, high) {
    let pivot = arr[low]; // 选择第一个元素作为基准元素
    let i = low + 1; // 左指针
    let j = high; // 右指针
    // let arr1 = [5, 2, 9, 8, 1, 7, 6];
    while (true) {
        while (i <= j && arr[i] < pivot) {
            i++; // 左指针向右移动，直到找到大于等于基准元素的元素

        }
        while (i <= j && arr[j] > pivot) {
            j--; // 右指针向左移动，直到找到小于等于基准元素的元素
        }
        if (i >= j) {
            break; // 左指针和右指针相遇时退出循环
        }
        [arr[i], arr[j]] = [arr[j], arr[i]]; // 交换左指针和右指针所指向的元素
        i++;
        j--;
    }
    console.log(arr.join(''), i, j, low);
    [arr[low], arr[j]] = [arr[j], arr[low]]; // 将基准元素放置到正确的位置上
    console.log('+++++++',arr.join(''), i, j, low);

    return j; // 返回基准元素的索引

}

function quicksort(arr, low, high) {
    if (low < high) {
        let pivotIndex = partition(arr, low, high); // 划分数组并获取基准元素的索引

        quicksort(arr, low, pivotIndex - 1); // 对基准元素左侧的子数组进行递归排序

        quicksort(arr, pivotIndex + 1, high); // 对基准元素右侧的子数组进行递归排序

    }
}
// 示例用法

let arr1 = [5, 2, 9, 8, 1, 7, 6];

quicksort(arr1, 0, arr1.length - 1);
console.log(arr1); // 输出 [1, 2, 5, 6, 7, 9]
