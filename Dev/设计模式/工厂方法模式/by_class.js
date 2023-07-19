// 定义一个抽象类
class Animal {
    speak() {
        throw new Error('This method must be implemented.');
    }
}

// 实现具体的类
class Dog extends Animal {
    speak() {
        return 'Woof!';
    }
}

class Cat extends Animal {
    speak() {
        return 'Meow!';
    }
}

// 实现工厂方法
class AnimalFactory {
    createAnimal(animalType) {
        switch (animalType) {
            case 'dog':
                return new Dog();
            case 'cat':
                return new Cat();
            default:
                throw new Error(`Invalid animal type: ${animalType}`);
        }
    }
}

// 使用工厂方法创建对象
const animalFactory = new AnimalFactory();
const dog = animalFactory.createAnimal('dog');
console.log(dog.speak()); // Output: Woof!
const cat = animalFactory.createAnimal('cat');
console.log(cat.speak()); // Output: Meow!

