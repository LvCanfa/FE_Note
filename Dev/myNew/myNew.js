/**
 *
 * @param {*} 这种方式为组合继承，解决了原型继承的问题：原型构造函数中的所有属性变为原型属性，并且被所有实例共享
 * @param {*} 同时解决了盗用构造函数（对象伪装、经典继承）的问题: 子类构造函数可以向父类构造函数传递参数，，并且每个
 * @param {*} 实例都会拥有单独的父类构造函数的属性，不再全部共享父类构造函数的属性，但是同时因为改变this指向，子类也无法访问父类的原型

 */
function myNew(fn, ...args) {

  // 创建一个空对象，该对象的 __proto__ 属性指向构造函数的 prototype对象

  // const obj = Object.create(fn.prototype);
  const obj = {}
  obj.__proto__ = fn.prototype                              // 原型继承
  // 将构造函数中的 this 绑定到新创建的对象上
  const result = fn.apply(obj, args);                       // 盗用构造函数
  // const result = fn.call(obj, ...args);
  /**
   * @why 为什么要判断 object
   * 判断构造函数的返回值是否为对象，如果是则直接返回该对象，否则返回新对象
   * 防止构造函数 Person 中返回对象把 new 创建的对象覆盖
   */
  if (result && typeof (result) === 'object') {
    return result;
  }
  return obj;
}
function Person(name, age) {
  this.name = name;
  this.age = age;
  /**
   * @why 为什么要判断 object
   */
  // return {aaa:'aaa'}
}
const p = myNew(Person, 'Tom', 16);

console.log(p); // Person { name: 'Tom', age: 16 }