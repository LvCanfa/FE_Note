import { patchChildren } from './doubleEndDiff.js';
import cloneFn from '../../CloneDeep/forClone.js'; // 引入深拷贝

// 新旧节点测试数据
const oldNode = {
    type: 'div',
    children: [
        {
            type: 'p',
            children: '1',
            key: 1
        },
        {
            type: 'p',
            children: '2',
            key: 2
        },
        {
            type: 'p',
            children: '3',
            key: 3
        },
        {
            type: 'p',
            children: '5',
            key: 5
        },
    ]
}
const newNode = {
    type: 'div',
    children: [
        {
            type: 'p',
            children: '2',
            key: 2
        },
        {
            type: 'p',
            children: '4',
            key: 4
        },
        {
            type: 'p',
            children: '3',
            key: 3
        },
        {
            type: 'p',
            children: '1',
            key: 1
        },
        {
            type: 'p',
            children: '6',
            key: 6
        }
    ]
}

const oldNodeCopy = cloneFn(oldNode);
const {moveRecord} = patchChildren(oldNode.children, newNode.children, oldNodeCopy.children);
console.log(moveRecord);
/**
    [
        'move   : 2-> 1 before',
        'insert : 4 -> 1 before',
        'move   : 3-> 1 before',
        '1 stay',
        'insert : 6 -> 5 before',
        'delete 5'
    ]
 */
/**
 * 双端 Diff 算法指的是，在新旧两组子节点的四个端点之间分别进行比较， 并试图找到可复用的节点。
 * 相比简单 Diff 算法，双端 Diff 算法的优势 在于，对于同样的更新场景，执行的 DOM 移动操作次数更少。
 */