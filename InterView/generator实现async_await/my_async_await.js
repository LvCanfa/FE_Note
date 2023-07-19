
function myAsyncFunction() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Hello, world!');
      }, 2000);
    });
  }
  
  function myAwait(promise) {
    return promise.then(data => {
      return { value: data, done: true };
    }).catch(error => {
      throw error;
    });
  }
  
  function* myGenerator() {
    try {
      const result = yield myAwait(myAsyncFunction());
      console.log(result.value);
    } catch (error) {
      console.log('Error:', error);
    }
  }
  
  function runGenerator(generator) {
    const iterator = generator();
  
    function iterate({ value, done }) {
      if (done) {
        return;
      }
  
      try {
        const nextValue = iterator.next(value);
        iterate(nextValue);
      } catch (error) {
        iterator.throw(error);
      }
    }
  
    iterate(iterator.next());
  }
  
  runGenerator(myGenerator);
  