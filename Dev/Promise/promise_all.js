// 通过forEach将多个promise压入数组
function all(options) {
  const resultArr = []
  return new Promise((resolve, reject) => {
    options.forEach(option =>{
      Promise.resolve(option)
      .then((res)=>{
        resultArr.push(res)
        if(resultArr.length === options.length) return resolve(resultArr);
      })
      .catch(
        (err) => {
          resultArr.push(err)
          return reject(err);
        }
      )
    })
  })
}
const promise1 = Promise.resolve(1);
const promise2 = Promise.reject(2);
const promise3 = Promise.resolve(3);
all([promise1,promise2,promise3])
.then(o=>console.log(o))
.catch(o=>console.log(o))