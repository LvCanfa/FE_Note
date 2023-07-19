// async function * ints() {
//   for (let i = 0; i < 100; i++) {
//     yield await new Promise((resolve, reject) =>{
//       setTimeout(resolve, 100, i);
//     })
//   }
// }

// const readableStream = new ReadableStream({
//   async start(controller) {
//     for await (let chunk of ints()) {
//       controller.enqueue(chunk);
//       console.log(chunk);
//     }
//     controller.close();
//   }
// });
// console.log('asd'.split('').includes('a'));
// function get(obj, path) {
//   const pathArr = path.split('.');
//   let out = obj
//   pathArr.reduce((before,after) => {
//       if(before.length > 1 && before.split('').includes('[')) {
//           out = out[before[0]][before[2]] || undefined
//       }else {
//         console.log(out[before]);
//           out = out[before] || undefined
//         console.log(out);
//       }
//       console.log(out);
//       return after
//   }, pathArr[0])
//   return out
// }
// const object = { a: [{ b: { c: 3 } }] };
// get(object, 'a[0].b.c');
const a ='sss';
// 伏羲机器人