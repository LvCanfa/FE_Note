
class EventEmitter {
  constructor() {
    this.bus = [];
  }
  on(key, func) {
    if (!this.bus[key]) this.bus[key] = []
    this.bus[key].push(func)
  }
  off(key, func) {
    if (!this.bus[key]) return
    let funcIndex = this.bus[key].indexOf(func);
    if (funcIndex > -1) {
      this.bus[key].splice(funcIndex, 1)
    }
  }
  emit(key, ...args) {
    if (!this.bus[key]) return
    this.bus[key].forEach((event) => {
      event(...args);
    })
  }
}
const emitter = new EventEmitter();

const callback1 = (...args) => {
  console.log('callback1', ...args);
};

const callback2 = (...args) => {
  console.log('callback2', ...args);
};

emitter.on('test', callback1);
emitter.on('test', callback2);

emitter.emit('test', 'value1', 'value2');

emitter.off('test', callback1);

emitter.emit('test', 'value3', 'value4');