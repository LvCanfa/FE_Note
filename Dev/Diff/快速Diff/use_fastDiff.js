import { patchChildrenFast } from './fastDiff.js';
import cloneFn from '../../CloneDeep/forClone.js'; // 引入深拷贝
const fastNewNode = [
    { key: 1 },
    { key: 2 },
    { key: 3 },
    { key: 4 },
    { key: 6 },
    { key: 9 },
    { key: 12 },
    { key: 5 }
]
const fastOldNode = [
    { key: 1 },
    { key: 2 },
    { key: 21 },
    { key: 4 },
    { key: 6 },
    { key: 12 },
    { key: 10 },
    { key: 9 },
    { key: 5 }
]
const { container, moveRecord } = patchChildrenFast(fastOldNode, fastNewNode, cloneFn(fastOldNode));
console.log(moveRecord);
console.log(container);
/**
 * 快速 Diff 算法在实测中性能最优。它借鉴了文本 Diff 中的预处理 思路，先处理新旧两组子节点中相同的前置节点和相同的后置节点。 
 * 当前置节点和后置节点全部处理完毕后，如果无法简单地通过挂载新 节点或者卸载已经不存在的节点来完成更新，
 * 则需要根据节点的索引 关系，构造出一个最长递增子序列。
 * 最长递增子序列所指向的节点即 为不需要移动的节点
 */