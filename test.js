
let ProxySingleton = function (Singleton, ...args) {
    let instance;

    return function () {
        //   if (!instance) {
        //     instance =;
        //   }
        return instance || (instance = new Singleton(...args));
    };
};

function MySingleton(name) {
    this.name = name;
}

const createSingleton = ProxySingleton(MySingleton, 'Alice');
const instance1 = createSingleton();
const instance2 = createSingleton();

console.log(instance1 === instance2); // 输出: true

console.log(instance1.name); // 输出: Alice

console.log(instance2.name); // 输出: Alice

console.log(instance1);
console.log(instance2);
