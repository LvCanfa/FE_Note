
const arr = [5, 3, 8, 4, 2, 7, 1, 6];
//   const sortedArr = quickSort(arr);
const sortedArr = myFastSort(arr);
console.log(sortedArr); // 输出 [1, 2, 3, 4, 5, 6, 7, 8]

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