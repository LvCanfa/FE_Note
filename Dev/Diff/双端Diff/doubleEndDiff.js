
import { LcsFn } from '../../../Alg/Hard/String/LCS-两字符的最长相同子串/Lcs.js' // 引入字符串diff

let moveRecord = [] // 存储变化操作
/**
 * @desc    1. 两节点为字符串，则使用 LCS 算法求字符串的diff
 *          2. 创建4个索引和指针，分别指向新旧节点的头尾，进行4次比较：头头、尾尾、新尾旧头、新头旧尾；
 *              1. 若四次比较中存在可复用节点，则移动对应的索引和指针
 *              2. 新旧头尾未找到可复用节点，在旧节点中寻找是否存在新头节点
 *                  1. 若存在：在容器中将其插入到 oldStartNode 前面，并在旧节点中将其设置为 undefined
 *                  2. 若不存在：直接将该 newStartNode 插入到容器的 oldStartNode 前面
 *                  3. 再移动下标继续遍历
 *              3. 若存在指针为 undefined，即2.2。1中已经遍历过的节点，则直接指针移动跳过
 *          3. 当旧节点循环完毕，新节点还有剩余，说明要新增。反之说明要删除
 *              
 * @param {*} n1 旧节点
 * @param {*} n2 新节点
 * @param {*} container 容器（旧节点的深拷贝，或者是真实 DOM ）
 */
function patchChildren(n1, n2, container) {
    if (typeof n2 == 'string' && typeof n1 == 'string') {
        console.log('Diff String');
        const { strOld, strNew, sameStrArr, operateArr } = LcsFn(n1, n2);
        moveRecord = operateArr
    } else if (Array.isArray(n2)) {
        return patchKeyedChildren(n1, n2, container);
    } else {
        console.log('....')
    }
}
/**
 * @desc 
 * @param {*} n1 旧节点
 * @param {*} n2 新节点
 * @param {*} container 容器（旧节点的深拷贝，或者是真实 DOM ）
 */
function patchKeyedChildren(n1, n2, container) {
    const oldChildren = n1;
    const newChildren = n2;

    // 创建4个索引，分别指向新旧节点的头尾；
    let oldStartIdx = 0, newStartIdx = 0;
    let oldEndIdx = oldChildren.length - 1;
    let newEndIdx = newChildren.length - 1;

    // 创建4个指针，指向新旧节点的头尾
    let oldStartNode = oldChildren[oldStartIdx]
    let oldEndNode = oldChildren[oldEndIdx]
    let newStartNode = newChildren[newStartIdx]
    let newEndNode = newChildren[newEndIdx];

    /**
     * 4次比较：头头、尾尾、新尾旧头、新头旧尾
     */
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        // 若存在undefined（旧节点中被删除了的）
        if (!oldStartNode) {
            oldStartNode = oldChildren[++oldStartIdx]
        }
        else if (!oldEndNode) {
            oldEndNode = oldChildren[--oldEndIdx]
        }
        // 四次比较中存在可复用节点
        else if (oldStartNode.key === newStartNode.key) {
            moveRecord.push(`${newStartNode.key} stay`)
            newStartNode = newChildren[++newStartIdx]
            oldStartNode = oldChildren[++oldStartIdx]
        } else if (oldEndNode.key === newEndNode.key) {
            moveRecord.push(`${oldEndNode.key} stay`)
            newEndNode = newChildren[--newEndIdx]
            oldEndNode = oldChildren[--oldEndIdx]
        } else if (newEndNode.key === oldStartNode.key) {
            const operateDetail = insert(oldStartNode, container, oldEndNode);
            moveRecord.push(operateDetail)
            newEndNode = newChildren[--newEndIdx]
            oldStartNode = oldChildren[++oldStartIdx]
        } else if (newStartNode.key === oldEndNode.key) {
            const operateDetail = insert(oldEndNode, container, oldStartNode);
            moveRecord.push(operateDetail);
            newStartNode = newChildren[++newStartIdx]
            oldEndNode = oldChildren[--oldEndIdx]
        } else {
            /**
             * 新旧头尾未找到可复用节点，在旧节点中寻找是否存在新头节点
             * 若存在：在容器中将其插入到 oldStartNode 前面，并在旧节点中将其设置为 undefined，
             * 若不存在：直接将该 newStartNode 插入到容器的 oldStartNode 前面
             * 再移动下标继续遍历
             */
            const idxInOld = oldChildren.findIndex((item) => {
                if (item ? (item.key === newStartNode.key) : false) {
                    return true
                }
                return false
            })
            if (idxInOld > 0) {
                const vnodeToMove = oldChildren[idxInOld]
                const operateDetail =  insert(vnodeToMove, container, oldStartNode);
                moveRecord.push(operateDetail);

                oldChildren[idxInOld] = undefined;
            } else {
                const operateDetail =  insert(newStartNode, container, oldStartNode);
                moveRecord.push(operateDetail);
            }
            newStartNode = newChildren[++newStartIdx]
        }
    }
    /**
     * 当旧节点循环完毕，新节点还有剩余，说明要新增
     * 反之说明要删除
     */
    if (newStartIdx <= newEndIdx && oldStartIdx > oldEndIdx) {
        for (let i = newStartIdx; i <= newEndIdx; i++) {
            const operateDetail =  insert(newStartNode, container, oldStartNode);
            moveRecord.push(operateDetail);
        }
    } else if (newStartIdx > newEndIdx && oldStartIdx <= oldEndIdx) {
        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
            const operateDetail = unmounted(container, oldChildren[i])
            moveRecord.push(operateDetail);
        }
    }
    return { n1, n2, container, moveRecord }
}

/**
 * @desc 节点插入，若moveNode 不存在旧节点中，则插入为新增，存在则删除后插入，为移动。若targetNode不传则push到末尾
 * @param {*} moveNode 要移动的节点
 * @param {*} container 节点容器
 * @param {*} targetNode 移动的目标位置
 * @returns 操作详情
 */
function insert(moveNode, container, targetNode) {
    const oldIdx = findIdxInContainer(moveNode, container);
    if (oldIdx >= 0) {
        container.splice(oldIdx, 1)
    }
    const targetIdx = findIdxInContainer(targetNode, container);
    targetIdx > 0 ? container.splice(targetIdx, 0, moveNode) : container.push(moveNode);
    return oldIdx >= 0 ?
        `move   : ${moveNode.key}-> ${targetNode.key} before` :
        `insert : ${moveNode.key} -> ${targetNode ? targetNode.key + ' before' : 'last'}`
}
/**
 * 将节点和容器数据分别转成 JSON
 * @param {*} container 容器
 * @param {*} unMountedNode 要删除的节点
 * @returns 删除记录
 */
function unmounted(container, unMountedNode) {
    const targetIdx = container.indexOf(unMountedNode);
    if (targetIdx >= 0) {
        container.splice(targetIdx, 1);
    }
    return `delete ${unMountedNode.key}`
}

/**
 * @desc 将数据转为JSON后返回 vnode 在 container 中的 idx
 * @param {*} vnode 对象节点
 * @param {*} container 容器
 * @returns 节点位置idx
 */
function findIdxInContainer(vnode, container) {
    const vnodeStr = JSON.stringify(vnode)
    const containerStr = container.map((item) => {
        return JSON.stringify(item)
    })
    return containerStr.indexOf(vnodeStr);
}


export { patchChildren, insert, unmounted }
// 深拷贝对象，作为容器newStartNode