/**
 * @param {*} objOld 要拷贝的对象
 * @returns 拷贝后的对象
 * 适用于：obj1.a = obj2, obj2.a = obj3, obj3.a = obj1
 * 或 obj1.x.x.x.x = obj1
 *
 * @desc 1. for...in循环,非对象直接赋值（暂未考虑func 和 symbol），是对象则递归调用函数 cp ，
 *       2. 将此对象（key值）、新建空对象、 key 作为参数传递
 *       3. 将此 key 分别 push 进objArr 和 objKey
 *       4. 判断 传入的对象.key 是否已经存在在 objArr （表示此obj的某一个子值为该子值的某一个父级）,若是，则先设为 objArr.indexOf(key 值)
 *
 *       5. 通过cp函数，我们可以获取到要复制的对象中包含的每一个obj，并且能够获取到该子值的链式调用路径
 *       6. 再根据此链式路径去修改复制后的对象的该子值为其对应的父值即可
 * 
 * @JSON  JSON.parse(JSON.stringfy(obj))的缺陷：
 *        1. 会忽略 undefined 
 *        2. 会忽略 symbol 
 *        3. 不能序列化函数 
 *        4. 不能解决循环引用的对象
 * 
 */
export default function cloneFn(objOld) {
  const objNew = cp(objOld, objKey);
  findCircle(objKey);
  objKeyPath.forEach(item => upDateCircleVal(item, objNew))
  return objNew
};

let objArr = [];
let objKey = {};    // 对象的key树
let objKeyPath = []  // 存在自调用的链式路径

/**
 * 
 * @param {*} objOld 要拷贝的对象
 * @param {*} objKey 将对象的key值存储为一个对象，用于解析出存在自调用的对象路径
 * @returns 返回克隆后的对象，若存在自调用则先赋值为一个index
 */
function cp(objOld, objKey) {
  let objNew = {};
  objArr.push(objOld);
  // 暂时不考虑数组内存在自调用的情况
  if (Array.isArray(objOld)) {
    return [...objOld];
  }
  else if (typeof objOld == "object") {
    for (let item in objOld) {
      if (typeof objOld[item] == "object") {
        if (objArr.indexOf(objOld[item]) == -1) {
          // 此对象值未被遍历过，递归
          objKey[item] = {}
          objNew[item] = cp(objOld[item], objKey[item]);
        } else {
          objKey[item] = 0;
          // 此对象值为已经遍历过的对象，先赋值为对象数组的index
          objNew[item] = objArr.indexOf(objOld[item]);
        }
      } else {
        // 非对象直接赋值
        objNew[item] = objOld[item];
      }
    }
  }
  // 非object的原始值直接赋值
  else {
    return objOld
  }
  return objNew
}

/**
 * 寻找出拷贝对象的key值树中存在自调用的路径，并存储在 objKeyPath 中
 * @param {*} objKey  旧对象的key树中的叶子节点
 * @param {*} path    到此节点的路径
 * @returns 
 */
function findCircle(objKey, path = '') {
  if (JSON.stringify(objKey) == '{}') {
    return;
  } else {
    for (let item in objKey) {
      if (typeof objKey[item] === 'object') {
        findCircle(objKey[item], path + ',' + item);
      } else {
        objKeyPath.push(path + ',' + item)
        return;
      }
    }
  }
}


/**
 * 对 objKeyPath 进行拆分路径后，根据每一条路径的末尾（前面设置的对象池index），进行对象赋值 
 * @param {*} updatePath 对象截取路径
 * @param {*} objNew 克隆后的对象，传入obj的引用
 */
function upDateCircleVal(updatePath, objNew) {
  const updatePathArr = updatePath.split(',');
  updatePathArr.reduce((lastVal, key, index) => {
    if (index === updatePathArr.length - 1) {
      lastVal[key] = objArr[lastVal[key]]
    }
    return lastVal[key] || lastVal;
  }, objNew);
}
