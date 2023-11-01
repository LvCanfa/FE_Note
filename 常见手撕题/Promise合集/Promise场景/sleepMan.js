function sleepMan(fn, timeout, ...arg) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            fn(...arg);
            res();
        }, timeout)
    })
}
function fn(arg) {
    console.log(arg);
}
sleepMan(fn, 1000, '1')
    .then(() => sleepMan(fn, 1000, '2'))
    .then(() => sleepMan(fn, 1000, '3'))
    .then(() => { sleepMan(fn, 1000, '4') }) // 无返回值
    .then(() => sleepMan(fn, 1000, '4'))
    .then(() => { sleepMan(fn, 1000, '5') })        // 无返回值
    .then(() => { return sleepMan(fn, 1000, '5') }) // 有返回值
    .then(() => sleepMan(fn, 1000, '6'))