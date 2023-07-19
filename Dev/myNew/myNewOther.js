/**
 * @param {*} 寄生式组合继承：对组合继承的扩展
 * @why 使用这个函数来拷贝 SuperType.prototype 来防止赋值是地址的引用
 */
function object(obj) {
  // 原型式继承 Object.create()是使用的这种方式，原型式继承的规范化，第一个参数为原型对象，第二个参数是新增属性
  function F() {} // 一个临时的构造函数
  F.prototype = obj.prototype; // 修改临时构造函数的原型指向
  return new F(); // 返回临时构造函数的实例，实际上是对 obj 的一次浅复制

  // 若在return 之前，对F的实例进行修改属性，则为寄生式继承
}

// 寄生式组合继承：
function inheritPropertype(Sub, SuperType) {
  let prototype = object(SuperType);  // 原型式继承
  prototype.constructor = Sub;        // 修改父类构造函数的实例，属于寄生式继承，指定constructor是为了解决重写子类原型导致的constructor丢失
  Sub.prototype = prototype;          // 赋值修改prototype
}

function SuperType(type) {
  this.type = type;
}

// 定义一个父上下文的原型方法
SuperType.prototype.sayType = function (){
  console.log(`SuperType's prototype function :${this.type}`);
}

function Sub(type, age) {
  SuperType.call(this, type);
  this.age = age;
}

inheritPropertype(Sub, SuperType);

// 修改原型后定义一个Sub上的原型方法
Sub.prototype.sayAge = function () {
  console.log(`Sub's prototype function :${this.age}`);
}
const SubT = new Sub('a', 12);
console.log(SubT);
SubT.sayAge();
SubT.sayType();
