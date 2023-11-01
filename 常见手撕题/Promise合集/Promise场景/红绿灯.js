/**
 * @desc Promise + async await实现
 */
async function runLight() {
    await taskAwait(3000, 'red');
    await taskAwait(1000, 'green');
    await taskAwait(2000, 'yellow');
    runLight();
}
function taskAwait(timer, light) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            lights[light] ? lights[light]() : console.error('err');
            res();
        }, timer)
    })
}

/**
 * @desc Promise.then实现
 * ()=>fn()直接将fn()的执行结果作为返回值
 * ()=>{ return fn() } 要手动将fn()执行结果返回
 */
const step = () => {
    task(3000, 'red')
        .then(() => task(1000, 'green'))
        .then(() => {
            return task(2000, 'yellow')
        })
        .then(step)
}
const task = (timer, light) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            lights[light] ? lights[light]() : console.error('err');
            resolve()
        }, timer)
    })
}



function red() {
    console.log('red');
}
function green() {
    console.log('green');
}
function yellow() {
    console.log('yellow');
}
const RED = 'red'
const GREEN = 'green'
const YELLOW = 'yellow'
const lights = {
    'red': red,
    'green': green,
    'yellow': yellow
}


runLight();
step();