class MyPromise {
  constructor(executor) {
    this.status = 'pending';
    this.value = 'undefined';
    this.reason = 'undefined';
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = value => {
      if(this.status === 'pending') {
        this.status = 'fulfilled';
        this.value = value;
        this.onFulfilledCallbacks.forEach(callback => callback(value));
      }
    }

    const reject = reason => {
      if(this.status === 'pending') {
        this.status = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach(callback => callback(reason));
      }
    }

    try {
      executor(resolve, reject);
    } catch (reason) {
      reject(reason);
    }
  }
}