const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

/**
 * @desc 判断是否是 Promise 对象
 * @param {any} item 
 * @returns 
 */
function isPromise(item) {
    return !!(item && typeof item === 'object' && typeof item.then === 'function')
}

/**
 * @desc 运行一个微任务队列，把函数传入微队列
 * @param {Function} callback 
 */
function runMicroTask(callback) {
    // 判断 node 环境
    if (globalThis.process && globalThis.process.nextTick) {
        process.nextTick(callback);
    }
    // 判断 window 环境
    else if (globalThis.MutationObserver) {
        const p = document.createElement("p");
        const observer = new MutationObserver(callback);
        observer.observe(p, {
            childList: true
        })
        p.innerHTML = "1"
    } else {
        setTimeout(callback, 0);
    }
}
class MyPromise {
    /**
     * 创建一个Promise
     * @param {Function} executor 任务执行器，立即执行
     */
    constructor(executor) {
        this._state = PENDING;  // 状态
        this._handlers = [];    // 处理函数形成的队列
        this._value = undefined;// 数据
        try {
            executor(this._resolve.bind(this), this._reject.bind(this));
        } catch (error) {
            this._reject(error);
            throw Error(error);
        }
    }
    then(onFulfilled, onRejected) {
        return new MyPromise((resolve, reject) => {
            this._pushHandler(onFulfilled, FULFILLED, resolve, reject);
            this._pushHandler(onRejected, REJECTED, resolve, reject);
            this._runHandles();
        })
    }
    catch(onRejected) {
        this.then(null, onRejected);
    }
    finally(onSettled) {
        return this.then(
            (data) => {
                onSettled();
                return data
            },
            (reason) => {
                onSettled();
                throw reason
            }
        )
    }
    /**
     * 标记当前任务失败
     * @param {any} reason 任务失败的相关数据
     */
    _reject(err) {
        this._changeState(REJECTED, err)
    }
    /**
     * 标记当前任务完成
     * @param {any} data 任务完成的相关数据
     */
    _resolve(res) {
        this._changeState(FULFILLED, res)
    }
    /**
     * 更改任务状态
     * @param {String} newState 新状态
     * @param {any} value 相关数据
     */
    _changeState(newState, value) {
        // 状态已改变
        if (this._state !== PENDING) {
            return
        }
        this._state = newState;
        this._value = value;
        this._runHandles();
    }

    /**
     * 向处理队列中添加一个函数
     * @param {Function} fn 添加的函数
     * @param {String} state 该函数什么状态下执行
     * @param {Function} resolve 让then函数返回的Promise成功
     * @param {Function} reject 让then函数返回的Promise失败
     */
    _pushHandler(fn, state, resolve, reject) {
        this._handlers.push({
            fn,
            state,
            resolve,
            reject
        })
    }
    /**
     * 根据实际情况，执行队列
     */
    _runHandles() {
        if (this._state === PENDING) {
            return
        }
        while (this._handlers[0]) {
            const handler = this._handlers[0]
            this._runOneHanlder(handler);
            this._handlers.shift();
        }
    }
    /**
     * 处理一个handler
     * @param {Object} handler
     */
    _runOneHanlder(handler) {
        const { fn, state, resolve, reject } = handler
        runMicroTask(() => {
            if (this._state !== state) {
                return;
            }
            if (typeof fn !== 'function') {
                this._state === FULFILLED ? resolve(this._value) : reject(this._value);
                return;
            }
            try {
                const result = fn(this._value);
                if (isPromise(result)) {
                    result.then(resolve, reject);
                } else {
                    resolve(result);
                }
            } catch (e) {
                reject(e);
                console.error(e);
            }
        })
    }
}
const myP = new MyPromise((res, rej) => {
    console.log(1);
    rej(33);
    res(2);
})
myP
    .then((res) => {
        console.log(res, 'then1');
        return 3
    })
    .then((res) => {
        console.log(res, 'then2');
        throw Error()
    })
    .catch((err) => {
        console.log('err');
        console.log(err);
    })