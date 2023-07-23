import cloneFn from './forClone.js'
let obj3 = {
  a: {
    a_leval1: 1,
    a_leval2: 2,
    a_leval3: [
      'a_leval4'
    ],
    a_leval5: {
      a_leval6: 6,
      a_leval7: "obj2"
    }
  },
  b: {
    c: "obj1",
  },
};
let obj2 = {
  a: 2,
  [Symbol("b")]: "2b",
  c: obj3,
};
let obj1 = {
  a: 1,
  b: "1b",
  get c() {
    return "1c";
  },
  d: obj2,
};
obj3.b.c = obj1;
obj3.a.a_leval5.a_leval7 = obj2;

const cloneObj = cloneFn(obj3);

console.log(obj3);
console.log(cloneObj.a.a_leval5);