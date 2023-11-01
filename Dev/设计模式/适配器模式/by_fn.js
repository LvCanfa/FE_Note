// 目标接口
function Target() {
    this.request = function () {
        console.log('Target: 请求已被调用');
    }
    this.name = 'Target'
}

// 需要适配的类
function Adaptee() {
    this.specificRequest = () => {
        console.log('Adaptee 方法已被访问');
    }
    this.name = 'Adaptee'
}
function object(obj) {
    function F() { };
    F.prototype = obj.prototype;
    return new F();
}

function Adapter(Target, Adaptee) {
    constructor(adaptee) {
        super();
        this.adaptee = new Adaptee();
      }
    // this.adaptee = new Adaptee();
}
// 使用适配器将客户端与 Adaptee 解耦
const client = new Adapter(Target, Adaptee);
console.log(client.superType.adaptee.specificRequest())