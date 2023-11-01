Promise.prototype.myfinally = function (callback) {
    return this.then(
      async (res) => {
        await callback();
        return res; //finally本质起传递的作用,这里的res是上一个then函数的返回值
      },
      async (err) => {
        await callback();
        throw err;
      }
    );
  };
  
  Promise.resolve(123)
    .then((res) => {
      console.log(res); //123
      return Promise.reject(456);
    })
    .myfinally(() => {
      console.log("finally");
      return "finally本身不返回值";
    })
    .then(
      () => {},
      (err) => {
        console.log(err,'456'); //123
        return 789;
      }
    )
    .myfinally(() => console.log("finally"))
    .then((res) => console.log(res)); //789