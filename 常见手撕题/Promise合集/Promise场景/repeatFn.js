/**
 * @desc 使用回调执行重复调用
 * @param {*} fn 
 * @param {*} times 
 * @param {*} timeout 
 * @returns 
 */
function repeat1(fn, times, timeout) {
    return function cb(...argument) {
        setTimeout(async () => {
            fn(...argument);
            times--;
            if (times) cb(...argument)
        }, timeout);
    }
}
/**
 * @desc 使用 async await 延迟重复调用
 * @param {*} fn 
 * @param {*} times 
 * @param {*} timeout 
 * @returns 
 */
function repeat(fn, times, timeout){
    return async function cb(...arg){
        for(let i = 0; i< times; i++) {
            await repeatOne(fn, timeout, ...arg);
        }
    }
}
function repeatOne(fn, timeout, arg){
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            fn(arg);
            resolve();
        }, timeout);
    })
}

const repeatLog = repeat(console.log, 5, 1000)('hi await');
const repeatLog1 = repeat1(console.log, 5, 1000)('hi cb');