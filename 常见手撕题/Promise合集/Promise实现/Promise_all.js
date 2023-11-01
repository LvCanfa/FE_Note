/**
 * @desc    1. 构建一个存储返回结果的数组或者对象
 *          2. 返回一个Promise，当遇到 reject 或者 全部 resolve 之后调用外层的Promise 的 resolev
 *          3. 在返回的Promise 内部循环 数组参数，依次传入Promise.resolve(element)
 * 
 * @param {*} argument 传入的Promise数组
 * @returns 按传入数组顺序返回的执行结果数组
 */
function myPromise_all(argument) {
    const result = {};
    return new Promise((resolve, reject) => {
        argument.forEach((element, index) => {
            Promise.resolve(element)
                .then((res) => {
                    result[index] = res;
                    if (Object.keys(result).length === argument.length) {
                        return resolve(Object.values(result));
                    }
                })
                .catch((err) => {
                    return reject(err);
                })
        });
    })
}


const Promise1 = new Promise((resolve, reject) => {
    console.log(1);
    setTimeout(() => {
        reject('promise 1')
    }, 10);
})
const Promise2 = new Promise((resolve, reject) => {
    console.log(2);
    setTimeout(() => {
        resolve('promise 2')
    }, 500);
})
const Promise3 = new Promise((resolve, reject) => {
    console.log(3);
    setTimeout(() => {
        resolve('promise 3')
    }, 200);
})
myPromise_all([Promise1, Promise2, Promise3])
    .then((res) => {
        console.log(res);
    })
    .catch((e) => {
        console.log(e);
    })