/**
 * 
 * @param {*} fn 延迟执行函数
 * @param {*} time 延迟时间
 * @param  {...any} arg fn 接收的参数
 * @returns 返回一个 promise ，在同步任务中添加一个定时器，reslove fn
 */
function sleepMan(fn, time, ...arg) {
  return new Promise((resolve, reject) => {
      setTimeout(() => resolve(fn(arg)), time)
  })
}
function fn(arg) {
  console.log(arg);
}
sleepMan(fn, 1000, 1, 1)
  .then((res) => {
      sleepMan(fn, 1000, 2, 2)
  })
  .then((res) => {
      sleepMan(fn, 1000, 2, 2)
          .then((res) => {
              sleepMan(fn, 1000, 3, 3)
          })
  })
// 第一秒
// [ 1, 1 ]
// 第二秒
// [ 2, 2 ]
// [ 2, 2 ]
// 第三秒
// [ 3, 3 ]