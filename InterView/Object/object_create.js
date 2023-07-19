const person = {
  name: 'a',
  age: 13
}
const p = Object.create(person, {
  food: {
    value: 'banana'
  }
});
  console.log(p);
  p.name = 'b';
  p.study = 'no'
  delete p.name;
  delete p.study;
  console.log(p);
  console.log(p.name, p.age, p.study, p.food);