/**
 * Promise输出
 * .then中 return 的 其实是一个Promise.resolve()
 * 1. 当我们return 一个常量的时候，执行完同步操作后就会注册下一个.then
 * 2. 当 return 一个带有 then 的对象，则执行完同步之后不会立即执行下一个 .then ，
 *    而是会注册 return 的对象中的 then，当其执行完后的下一步才会注册下一个 .then,相对于等待两次 then
 * 3. 当return 的是一个 Promise.reslove()时，就执行完之后返回的是Promise.reslove(Promise.reslove()),
 *    需要执行两次才会进入下一个.then 的注册  
 */
Promise.resolve()
    .then((res) => {
        console.log(0);
        return Promise.resolve().then(() => {
            // return 4
            return {
                then: function (resolve) {
                    resolve(Promise.resolve(4))
                }
            }
        })
    })
    .then((res) => {
        console.log(res);
    })
// 01
Promise.resolve(-1)
    .then((res) => {
        console.log(1);
    })
    .then((res) => {
        console.log(2);
    })
    .then((res) => {
        console.log(3);
    })
    .then(() => {
        console.log(5);
    })
    .then(() => {
        console.log(6);
    })
    .then(() => {
        console.log(7);
    })
    .then(() => {
        console.log(8);
    })

