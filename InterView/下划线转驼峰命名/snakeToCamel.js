/**
 * 
 * @param {*} obj 
 * 定义函数 snakeToCamel ，接受一个参数，判断它的数据类型：
 *  1. 非 object，直接返回
 *  2. Array，使用 map 将每一个item 传入 snakeToCamel
 *  3. Object ：.keys 配合 .reduce对每一个 key 进行正则匹配，修改 _ 为 驼峰，
 *     并将value传入 snakeToCamel 
 *  4. 将reduce的结果返回
 */
function snakeToCamel(obj) {
  // 非object直接返回
  if (typeof obj !== 'object') return obj;

  // 数组调用map，snakeToCamel参数为map的item
  if (Array.isArray(obj)) return obj.map(snakeToCamel);

  return Object.keys(obj).reduce((result, key) => {
    const value = obj[key];
    // 正则 参数对应：匹配到的字符串，匹配字符、偏移量、原字符串
    // a_ba_d: _b, b, 1, a_ba_d、_d, d, 4, a_ba_d
    const camelKey = key.replace(/_([a-z])/g, function (match, p1, offset, string) {
      // console.log(match, p1, offset, string);
      return p1.toUpperCase();
    })
    // 递归调用 snakeToCamel 驼峰化value
    result[camelKey] = snakeToCamel(value);
    return result;
  }, {})
}

const obj = {
  user_name: 'John',
  age_now: 25,
  address: {
    province_name: 'California',
    city_name: 'Los Angeles'
  },
  orders: [
    { order_id: 1, product_name_phone: 'iPhone' },
    { order_id: 2, product_name: 'Macbook Pro' }
  ]
};

console.log(snakeToCamel(obj));
// console.log(obj);