const promiseRace = (promises) => {
  return new Promise((resolve, reject) => {
    promises.forEach(promise => {
      promise.then(resolve, reject);
    });
  });
};

const p1 = Promise.resolve(1);
const p2 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(2);
  }, 2000);
});

promiseRace([p2, p1]).then((results) => {
  console.log(results); // [1, 2, response]
}).catch((err) => {
  console.log(err); // 处理错误
});