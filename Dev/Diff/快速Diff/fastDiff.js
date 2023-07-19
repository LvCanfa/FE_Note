// 快速 Diff 算法包含预处理 步骤，这其实是借鉴了纯文本 Diff 算法的思路。

import { lis } from '../../../Alg/Hard/Array/LIS-数组的最长子序列/Lis.js';

import { insert, unmounted } from '../双端Diff/doubleEndDiff.js'

let moveRecord = []
/**
 * @desc  1. 相较于双端diff，快速diff先对新旧节点进行了头尾的预处理，找出头部与尾部开始的相同节点，并对非相同部分进行移动处理
 *        2. 根据预处理后新节点剩余部分构建数组 source 用于依次存储剩余 newChildred 中的节点在 oldChilren 的 idx，若为新增则值为 -1
 *        3. 构建一个索引表 keyIdx，存储新节点中的某一个节点对应的在 newChildren 中的 idx，用于填充 source
 *        4. 遍历 oldChildren 部分，根据 key 值从索引表 keyIdx 中获取此节点在 newChildren 中的idx，存储为 k
 *          4.1 若k不存在，则说明该旧节点需要删除
 *          4.2 若k存在，更新 source 
 *        5. 使用 lis 获取 source 的最长子序列 seq。
 *        6. 循环预处理后的newChilren剩余节点，判断当前位置是否处于 最长子序列（不用移动）上，进行插入或移动
 * @param {*} oldChildren 旧节点
 * @param {*} newChildren 新节点
 * @param {*} container 容器（旧节点的深拷贝，或者是真实 DOM ）
 */
export function patchChildrenFast(oldChildren, newChildren, container) {
    if (typeof newChildren == 'string' && typeof oldChildren == 'string') {
        console.log('Diff String');
    } else if (Array.isArray(newChildren)) {
        return patchKeyedChildren(oldChildren, newChildren, container);
    } else {
        console.log('....')
    }
}
/**
 * @desc 1. 先调用 preTreatMent 进行预处理，并返回 preIdx、oldEnd、newEnd，对应非相同部分的开始与结束idx。
 *       2. 若新旧节点中，有其一处理完毕，另一个剩余，则对应将剩余的插入或删除
 *       3. 若新旧节点均为处理完毕，则调用 moveRemainNode 方法进行排序
 *          3.1 构建索引表 keyIdx 存储预处理后 newChildren 中每一个节点，key为节点的key，val为节点的idx
 *          3.2 构建数组 source 存储预处理后 newChildren 中剩余节点在 oldChildren 中的位置
 *          3.3 获取 source 的最长子序列 seq，根据 seq 来进行最少的节点移动
 * @param {*} oldChildren 旧节点
 * @param {*} newChildren 新节点
 * @param {*} container 容器（旧节点的深拷贝，或者是真实 DOM ）
 */
function patchKeyedChildren(oldChildren, newChildren, container) {

    // 预处理头尾，除去头尾相同部分
    let { preIdx, oldEnd, newEnd } = preTreatMent(oldChildren, newChildren);

    // 新节点剩余，旧节点处理完毕，需要插入
    if (preIdx <= newEnd && preIdx > oldEnd) {
        while (preIdx <= newEnd) {
            const operateDetail = insert(newChildren[preIdx++], container, oldChildren[oldEnd + 1])
            moveRecord.push(operateDetail)
        }
    }
    // 新节点完毕，旧节点剩余，需要删除
    else if (preIdx > newEnd && preIdx <= oldEnd) {
        while (preIdx <= oldEnd) {
            const operateDetail = unmounted(container, oldChildren[preIdx++])
            moveRecord.push(operateDetail)
        }
    }
    else if(preIdx <= newEnd && preIdx <= oldEnd) {
        // 需要重新排序预处理后的数据
        moveRemainNode(preIdx, oldEnd, newEnd, oldChildren, newChildren, container);
    }
    return {container, moveRecord}
}

/**
 * @desc 用于寻找新旧节点头尾的相同部分，并返回对应的idx，Array[preIdx, xxxEnd]是非头尾相同部分
 * @param {*} oldChildren  旧节点
 * @param {*} newChildren  新节点
 * @returns preIdx: 从 oldChildren[preIdx] 和 newChildren[preIdx] 开始，是不同的
 * @returns oldEnd: 从 oldChildren[oldEnd] 截止是不同的
 * @returns newEnd: 同上
 */
function preTreatMent(oldChildren, newChildren) {
    let preIdx = 0;
    let oldNode = oldChildren[preIdx]
    let newNode = newChildren[preIdx]
    /**
     * 预处理头部
    */
    while (oldNode && newNode && (oldNode.key === newNode.key)) {
        preIdx++;
        oldNode = oldChildren[preIdx]
        newNode = newChildren[preIdx]
    }
    /**
     * 尾部预处理
     * oldEnd < preIdx , newEnd < preIdx若成立，则说明在预处理中已经处理完毕全部旧｜新节点
     */
    let oldEnd = oldChildren.length - 1;
    let newEnd = newChildren.length - 1;
    let oldEndNode = oldChildren[oldEnd];
    let newEndNode = newChildren[newEnd];
    while (oldEndNode.key === newEndNode.key) {
        oldEndNode = oldChildren[--oldEnd];
        newEndNode = newChildren[--newEnd];
    }
    return { preIdx, oldEnd, newEnd }
}

/**
 * @desc  1. 根据预处理后新节点剩余部分构建数组 source 用于依次存储剩余 newChildred 中的节点在 oldChilren 的 idx，若为新增则值为 -1
 *        2. 构建一个索引表 keyIdx，存储新节点中的某一个节点对应的在 newChildren 中的 idx，用于填充 source
 *        3. 遍历 oldChildren 部分，根据 key 值从索引表 keyIdx 中获取此节点在 newChildren 中的idx，存储为 k
 *          3.1 若k不存在，则说明该旧节点需要删除
 *          3.2 若k存在，更新 source 
 *        4. 使用 lis 获取 source 的最长子序列 seq。
 *        5. 循环预处理后的newChilren剩余节点，判断当前位置是否处于 最长子序列（不用移动）上，进行插入或移动
 *         
 * @param {*} preIdx 新旧节点中头部开始不相同部分的开始下标
 * @param {*} oldEnd 尾部不相同部分截止的下标
 * @param {*} newEnd 同上
 * @param {*} oldChildren 旧节点
 * @param {*} newChildren 新节点
 * @param {*} container 修改的容器
 */
function moveRemainNode(preIdx, oldEnd, newEnd, oldChildren, newChildren, container) {
    /**
     * @desc 新节点中预处理后部分的长度
     */
    const count = newEnd - preIdx + 1;

    /**
     *  @desc 存储 newChildren 预处理后剩余部分的每一个节点在 oldChildren 中的idx，-1表示新增节点
     * */ 
    const source = new Array(count).fill(-1);

    const newStartIdx = preIdx;
    const oldStartIdx = preIdx;

    let moved = false;   // 是否需要移动
    let pos = 0;         // 代表 遍历旧的一组子节点的过程中遇到的最大索引值 k。

    /**
     * @desc 创建索引表，新节点中的某一个节点对应的在 newChildren 中的 idx 
     */ 
    const keyIdx = {}

    for (let i = newStartIdx; i <= newEnd; i++) {
        keyIdx[newChildren[i].key] = i;
    }

    let patched = 0; // 已更新过的节点数量
    for (let i = oldStartIdx; i <= oldEnd; i++) {
        /**
         * @desc 遍历 oldChildren 部分，根据 key 值从索引表 keyIdx 中获取此节点在 newChildren 中的idx
         */
        const k = keyIdx[oldChildren[i].key]; 

        // 若更新过的旧节点数量少于等于剩余新节点数量，则更新。反之说明剩余的全部需要卸载，无需比较
        if (patched <= count) {
            // 有 k 说明是可复用节点，并将 i: 该节点在 oldChildren 中的 idx ，赋值给source
            if (typeof k !== 'undefined') {
                source[k - newStartIdx] = i
                // 每更新一个节点，都将 patched 变量 +1
                patched++
                if (k < pos) {
                    moved = true
                } else {
                    pos = k
                }
            }
            // 此节点在 newChildren 中不存在
            else {
                const operateDetail =unmounted(container, oldChildren[i]);
                moveRecord.push(operateDetail)
            }
        }
        // 若更新过的节点数量大于剩余数量，则需要卸载
        else {
            const operateDetail =unmounted(container, oldChildren[i]);
            moveRecord.push(operateDetail)
        }
    }

    if (moved) {
        /**
         * @desc source 的最长子序列
         * @source 存储 newChildren 预处理后剩余部分的每一个节点在 oldChildren 中的idx，-1表示新增节点
         */ 
        const seq = lis(source);

        /**
         * @desc 从末尾开始的最长子序列 idx，会从尾往头递减
         */
        let s = seq.length - 1;
        let i = count - 1;
        // 循环预处理后的newChilren剩余节点，判断当前位置是否处于 最长子序列（不用移动）上
        for (i; i >= 0; i--) {
            // 新增与非最长子序列，则需要插入或移动
            if (source[i] == -1 || i !== seq[s]) {
                // 新增
                let pos = i + newStartIdx
                const nextPos = pos + 1;
                const nextVNode = nextPos < newChildren.length ? newChildren[nextPos] : null;
                const operateDetail = insert(newChildren[pos], container, nextVNode);
                moveRecord.push(operateDetail)
            }
            // 当前位置在 source 的最长子序列上，无需操作
            else if (i === seq[s]) {
                s--
            }

        }
    }
}
