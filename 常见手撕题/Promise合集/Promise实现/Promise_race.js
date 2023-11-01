/**
 * 
 * @param {*} argument 
 * @returns 第一个结果 fullfiled / rejected
 * @desc    同Promise.all 返回一个 Promise，循环参数，传入Promise.resolve()
 *          将第一个有结果的 return 
 */
function myPromise_race(argument) {
    return new Promise((resolve, reject) => {
        argument.forEach(element => {
            Promise.resolve(element)
                .then((res) => {
                    return resolve(res)
                })
                .catch((e) => {
                    return reject(e)
                })
        });
    })
}

const Promise1 = new Promise((resolve, reject) => {
    console.log(1);
    setTimeout(() => {
        reject('promise 1')
    }, 2000);
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
myPromise_race([Promise1, Promise2, Promise3])
    .then((res) => {
        console.log(res);
    })
    .catch((e) => {
        console.log(e);
    })