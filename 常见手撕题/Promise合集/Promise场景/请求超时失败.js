/**
 * @desc Promise.race
 * @param {*} promise 
 * @param {*} timeout 
 * @returns 
 */
function fnWait(promise, timeout = 5000){
    const timeOut = new Promise((resolve, reject)=>{
        setTimeout(() => {
            reject('gg');
        }, timeout);
    })
    return Promise.race([promise(),timeOut])
}


const t = () => new Promise(resolve => setTimeout(resolve, 4000))
const t2 = () => new Promise(resolve => setTimeout(resolve, 6000))
fnWait(t).then(res => {
  console.log("t1 resolve")
}).catch(err => {
  console.log("t1 timeout")
})
fnWait(t2).then(res => {
  console.log("t2 resolve")
}).catch(err => {
  console.log("t2 timeout", err)
})