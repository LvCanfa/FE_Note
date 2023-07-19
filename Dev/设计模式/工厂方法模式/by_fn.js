
/**
 * @desc 结合策略模式，根据传入的动物类型返回该动物的实例。。。。
 * @param {*} type 哪种动物
 * @param  {...any} args 动物参数
 * @returns 动物的实例
 */
function AnimalFactory(type, ...args) {
    const AnimalType = {
        CAT: 'cat',
        DOG: 'dog',
        FOX: 'fox'
    }
    const AnimalCreate = {
        [AnimalType.CAT]: () => { return new Cat(...args) },
        [AnimalType.FOX]: () => { return new Fox(...args) },
        [AnimalType.DOG]: () => { return new Dog(...args) },
    }
    return AnimalCreate[type] ? AnimalCreate[type]() : ('cannt find')
}
/**
 * @param {*} me 
 */
function Animal(me) {
    this.animal = 'Animal Father'
    this.me = `who am i ? is ${me}`
}
// 叫声
Animal.prototype.speak = function () {
    console.log('Animal! speak');
    console.log(this.animal);
    console.log(this.me);
}
// 猫构造函数
function Cat(animal) {
    this.animal = animal
    this.me = 'who am i ? is Cat King'
}
// 狗构造函数
function Dog(animal, me) {
    // 将动物构造函数在此执行，继承动物的基础属性
    Animal.call(this, me)
    this.animal = animal
}
// 狐狸构造函数
function Fox(animal, me) {
    Animal.call(this, me)
    this.animal = animal
}
// 绑定原型链，继承动物工厂的方法
fnExtends(Animal, Fox, Cat, Dog);

Cat.prototype.speak = function () {
    console.log('Cat speak');
    console.log(this.animal);
    console.log(this.me);
}
Dog.prototype.speak = function () {
    console.log('Dog speak');
    console.log(this.animal);
    console.log(this.me);
}

function fnExtends(Animal, ...Animals) {
    console.log(Animals);
    for (let i = 0; i < Animals.length; i++) {
        const changeProto = creatProto(Animal)
        changeProto.constructor = Animals[i]
        Animals[i].prototype = changeProto
    }
}
function creatProto(SuperType) {
    const Fn = function () { }
    Fn.prototype = SuperType.prototype
    return new Fn();
}

const cat = new Cat('cat', 'King cat');
const dog = new Dog('dog', 'Miss.dog');
const fox = new Fox('fox', 'Mrs.fox');
cat.speak();
dog.speak();
fox.speak();

console.log('--------------');
console.log('--------------');
const animalFactory = new AnimalFactory('dog','wu wu~', 'kitti Dog');
console.log(animalFactory.speak());