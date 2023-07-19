/**
 * call 和 apply 都是为了解决改变 this 的指向 。只是传参的方式不同。除了第一个参数外，
 * call 可以接收一个参数列表， apply 只接受一个参数数组
 * bind 返回一个函数，该函数的 this 为指定的 this ，接收参数形式 === call
 */

/**
 * 实现bind、call、apply的区别：
 * call：在新的this指向：target 上新增调用call的函数，将参数传入该函数后执行，将结果存储后返回，同时删除 target 上的该函数
 * apply：同call，仅仅对参数处理为数组
 * bind：暂存调用函数，通过闭包保持对它的引用，返回一个新的函数 innerFn，innerFn的 this 通过apply（或者myArrply），仍然是指定的上下文
 */

let a = { value: 1, name: 'name', age: 'age', mess: 'mess' }
function getValue(name, age,_) {
    console.log('name: ', name);
    console.log('age: ', age);
    console.log('_: ', _);
    console.log('this.value: ', this.value);
    return { name, age };
}
// console.log(getValue.bind(a, 'a', '24')());
// getValue.apply(a, [ 'aaa', '678']);

/**
 * @desc 1. 接收一个新的对象 target 以及多个参数 args，
 *       2. 在target 上新增一个 fn 为 this，将args 传给 fn
 *       3. 若无 target 则赋值为 window，若this 不是函数则返回 error 返回它的返回值
 * @param {*} target 新的this
 * @this _ 调用 myCall 的函数
 * @returns 
 */
Function.prototype.myCall = function (target) {

    if(typeof this != 'function') {
        return new Error('error!, no function')
    }
    const args = [...arguments].slice(1); // 参数

    target = target || window // 为传入则为window
    target.fn = this;    // 本例在 getValue 中调用，故this为：[Function: getValue]

    const result = target.fn(...args);
    delete target.fn;

    console.log(target); // { value: 1, name: 'name', age: 'age', mess: 'mess' }
    console.log(result); // { name: 'myCall', age: 'myCall124' }

    return result
}
Function.prototype.myBind = function (target,...args) {
    const fn = this; // 存储this
    return function innerFn(...innnerArgs){
        return fn.apply(target,[...args,...innnerArgs]);
    }
}
console.log(getValue.myBind(a, 'myCall', 'myCall124')('_______'));