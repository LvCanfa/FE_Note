/**
 * 1. 在 constructor 中执行一次 cb 函数，将 onSuccessBind 和 onFailBind 绑定到 this，
 *    作为参数传递给 cb
 *      1.1 onSuccessBind、onFailBind 修改 this.#state ，执行对应的 cbs , 存储执行结果 #value
 *      1.2 #runCallbacks 对应取出全部 cb 执行后清零 cbs
 *      1.2 then: 返回一个 MyPromise 实例，执行 resolve(thenCb(result))
 */
const STATE = {
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected',
    PENDING: 'pending'
}
class MyPromise {
    #thenCbs = [];
    #catchCbs = [];
    #state = STATE.PENDING
    #value
    onSuccessBind = this.onSuccess.bind(this);
    onFailBind = this.onFail.bind(this);
    constructor(cb) {
        try {
            cb(this.onSuccessBind, this.onFailBind);
        } catch (error) {
            this.onFail(error)
        }
    } 

    /**
     * 
     * @desc 存储resolve、reject的值，并改变Promise状态
     */
    onSuccess(value) {
        queueMicrotask(() => {
            if (this.#state !== STATE.PENDING) return

            /**
             * @desc 处理情况：
             *      promise.then(()=>{
             *          return new Promise();
             *      })
             */
            if (value instanceof MyPromise) {
                value.then(this.onSuccessBind, this.onFailBind)
                return
            }

            this.#value = value
            this.#state = STATE.FULFILLED
            this.#runCallbacks()
        })
    }
    onFail(value) {
        queueMicrotask(() => {
            if (this.#state !== STATE.PENDING) return

            if (value instanceof MyPromise) {
                value.then(this.onSuccessBind, this.onFailBind)
                return
            }

            this.#value = value
            this.#state = STATE.REJECTED
            this.#runCallbacks()
        })
    }

    /**
     * @desc 运行回调函数并清空
     */
    #runCallbacks() {
        if (this.#state === STATE.FULFILLED) {
            this.#thenCbs.forEach(callback => {
                callback(this.#value)
            })
            this.#thenCbs = []
        }
        if (this.#state === STATE.REJECTED) {
            this.#catchCbs.forEach(callback => {
                callback(this.#value)
            })
            this.#catchCbs = []
        }
    }
    then(thenCb, catchCb) {
        return new MyPromise((resolve, reject) => {
            this.#thenCbs.push(result => {
                if (thenCb == null) {
                    resolve(result)
                    return
                }
                try {
                    resolve(thenCb(result))
                } catch (error) {
                    reject(error)
                }
            })
            // 这里的result是否可以去掉
            this.#catchCbs.push(result => {
                if (catchCb == null) {
                    reject(result)
                    return
                }
                try {
                    resolve(catchCb(result))
                } catch (error) {
                    reject(error)
                }
            })
            this.#runCallbacks();
        })
    }
    catch(cb) {
        return this.then(undefined, cb)
    }
    finally(cb) {
        return this.then(result => {
            cb()
            return result
        }, result => {
            cb()
            throw result
        })
    }
    static resolve(value) {
        return new MyPromise((resolve) => {
            resolve(value)
        })
    }
    static reject(value) {
        return new MyPromise((resolve, reject) => {
            reject(value)
        })
    }
    static all(promises) {
        const results = []
        let completePromises = 0
        return new MyPromise((resolve, reject) => {
            for (let i = 0; i < promises.length; i++) {
                const promise = promises[i]
                promise.then(value => {
                    completePromises++
                    results[i] = value
                    if (completePromises === promises.length) {
                        resolve(results)
                    }
                }).catch(reject)
            }
        })
    }
    static allSettled(promises) {
        const results = []
        let completePromises = 0
        return new MyPromise((resolve, reject) => {
            for (let i = 0; i < promises.length; i++) {
                const promise = promises[i]
                promise.then(value => {
                    results[i] = {
                        status: STATE.FULFILLED,
                        value
                    }
                })
                    .catch(value => {
                        results[i] = {
                            status: STATE.REJECTED,
                            value
                        }
                    })
                    .finally(() => {
                        completePromises++
                        if (completePromises === promises.length) {
                            resolve(results)
                        }
                    })
            }
        })
    }
    static race(promises) {
        return new MyPromise((resolve, reject) => {
            promises.forEach(promise => {
                promise.then(resolve).catch(reject)
            })
        })
    }
    static any(promises) {
        const errors = []
        let rejectPromises = 0
        return new MyPromise((resolve, reject) => {
            for (let i = 0; i < promises.length; i++) {
                const promise = promises[i]
                promise
                    .then(resolve)
                    .catch(value => {
                        rejectPromises++
                        errors[i] = value
                        if (rejectPromises === promises.length) {
                            reject('All promises were rejected')
                        }
                    })
            }
        })
    }
}

module.exports = MyPromise

const myP = new MyPromise((res, rej) => {
    console.log(1);
    res(2);
    rej(33);
})
myP
    .then((res) => {
        console.log(res, 'then1');
        return 'success 2'
    })
    .then((res) => {
        console.log(res, 'then2');
        throw Error()
    })
    .catch((err) => {
        console.log('err');
        console.log(err);
    })