function reTry(fn, times) {
    return new Promise((resolve, reject) => {
        const reTryFn = (reTryTimes) => {
            fn()
                .then((res) => {
                    resolve(res)
                })
                .catch((error) => {
                    if (reTryTimes < times) {
                        reTryFn(reTryTimes + 1);
                    } else {
                        reject(error)
                    }
                })
        }
        reTryFn(1);
    })
}

function retry(fn, retries = 3, delay = 1000) {
    return new Promise((resolve, reject) => {
        const attempt = async () => {
            try {
                const result = await fn();
                resolve(result);
            } catch (error) {
                if (retries > 0) {
                    await new Promise(resolve => setTimeout(resolve(fn), delay));
                    retries--;
                    attempt();
                } else {
                    reject(error);
                }
            }
        };

        attempt();
    });
}

function fn() {
    return new Promise((reslove, reject) => {
        let random = Math.random();
        console.log(random, 'random ');
        if (random > 0.2) {
            reject('random error')
        }
        reslove('random success')
    })
}
reTry(fn, 5).then((res) => {
    console.log(res, 'ressssss');
})
/**
 * 1. promise.resolve().then(){}
 * 2. async function{
 *          await fn();
 *    }
 */
async function fnnnn (){
    const res = await fetch('/get');
    console.log(res);
}
const pro = new Promise((resolve,reject)=>{
    setTimeout(() => {
        resolve('请求时间过长');
    }, 1000);
});
// Promise.race([fnnnn,pro]);

fnnnn();
console.log('res');