/**
 * @desc 使用闭包保存 instance
 * @param {*} Singleton 构造函数 -- 用于获取它的单例
 * @param  {...any} argumentsProxy 实例化传入的参数
 * @returns 返回的函数内返回已有实例或新实例化后返回
 */
let ProxySingleton = function (Singleton, ...argumentsProxy) {
    let instance;
    return function () {
        return instance || (instance = new Singleton(...argumentsProxy))
    };
}

function SingletonFn(name) {
    this.name = name;
}

let createSingleton = new ProxySingleton(SingletonFn, 'first singleton');
const instance1 = createSingleton();
instance1.src = 'baidu'
const instance2 = createSingleton();

console.log(instance1 === instance2); // 输出: true
console.log(instance2); // SingletonFn { name: 'first singleton', src: 'baidu' }