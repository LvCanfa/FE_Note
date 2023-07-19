async function delay(func, time, ...args) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(func(...args));
    }, time);
  })
};
delay((str) => {
  console.log(str.split(''));
}, 1000, 'hello1')
  .then((res) => {
    delay((str) => {
      console.log(str.split(''));
      // return 1
    }, 1000, 'hello2')
      .then((res) => {
        delay((str) => {
          console.log(str.split(''));
          // return 1
        }, 1000, 'hello3')
      })
  })
  .then((res) => {
    delay((str) => {
      console.log(str.split(''));
      // return 1
    }, 1000, 'hello2-2')
  })
