/**
 * @desc LRU 接收一个缓存个数参数，创建一个map来注册缓存，当对某一个已存在 key 操作时，删除并重新创建，
 *       保障该 key 存在最新位置
 *       当key 数量超过限定值，则删除最晚引用的key
 * @param {*} num 缓存的数量
 */
function MyLRU(num) {
    this.cacheNum = num || 2;
    this.cache = new Map();
}
MyLRU.prototype.getCache = function (key) {
    const hasKey = this.cache.has(key);
    if (hasKey) {
        const keyVal = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, keyVal);
        return keyVal
    }
    return 'no this cache!'
}
MyLRU.prototype.setCache = function (key, val) {
    const hasKey = this.cache.has(key);
    if (hasKey) {
        this.cache.delete(key);
    } else if (this.cache.size >= this.cacheNum) {
        const firstKey = this.cache.keys().next().value;
        this.cache.delete(firstKey);
    }
    this.cache.set(key, val);
}
MyLRU.prototype.getAll = function () {
    console.log(this.cache);
}

const cache = new MyLRU(4);
cache.setCache(1, 'a');
cache.setCache(2, 'b');
cache.setCache(3, 'c'); 

console.log(cache.getCache(1));
console.log(cache.getCache(2)); 
console.log(cache.getCache(9));
// a
// b
// no this cache!

cache.setCache(1, 'a');
cache.setCache(4, 'a');
cache.setCache(2, 'b');
cache.setCache(5, 'd');
cache.setCache(3, 'd');
cache.setCache(2, 'b');
cache.getAll();
// Map(4) { 4 => 'a', 5 => 'd', 3 => 'd', 2 => 'b' }