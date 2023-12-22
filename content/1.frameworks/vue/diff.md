# Diff 算法

```javascript
while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
  if (isUndef(oldStartVnode)) { // TODO: 如果旧节点不存在，则相应位移一位
    oldStartVnode = oldCh[++oldStartIdx] // Vnode has been moved left
  } else if (isUndef(oldEndVnode)) { // TODO: 如果旧节点不存在，则相应位移一位
    oldEndVnode = oldCh[--oldEndIdx]
  } else if (sameVnode(oldStartVnode, newStartVnode)) { // TODO: 如果 oldStartVnode === newStartVnode
    patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
    oldStartVnode = oldCh[++oldStartIdx]
    newStartVnode = newCh[++newStartIdx]
  } else if (sameVnode(oldEndVnode, newEndVnode)) {
    patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx)
    oldEndVnode = oldCh[--oldEndIdx]
    newEndVnode = newCh[--newEndIdx]
  } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right // TODO: 如果 oldStartVnode === newStartVnode，旧节点移到右侧
    patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx)
    canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm))
    oldStartVnode = oldCh[++oldStartIdx]
    newEndVnode = newCh[--newEndIdx]
  } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
    patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
    canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
    oldEndVnode = oldCh[--oldEndIdx]
    newStartVnode = newCh[++newStartIdx]
  } else {
    // TODO: 生成一个key与旧VNode的key对应的哈希表（只有第一次进来undefined的时候会生成，也为后面检测重复的key值做铺垫） 比如childre是这样的 [{xx: xx, key: 'key0'}, {xx: xx, key: 'key1'}, {xx: xx, key: 'key2'}] beginIdx = 0 endIdx = 2 结果生成{key0: 0, key1: 1, key2: 2}
    if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
    // TODO: 如果newStartVnode新的VNode节点存在key并且这个key在oldVnode中能找到则返回这个节点的idxInOld（即第几个节点，下标）
    idxInOld = isDef(newStartVnode.key)
      ? oldKeyToIdx[newStartVnode.key]
      : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx)
    if (isUndef(idxInOld)) { // New element
      // TODO: newStartVnode没有key或者是该key没有在老节点中找到则创建一个新的节点
      createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
    } else {
      // TODO: 获取同key的老节点
      vnodeToMove = oldCh[idxInOld]
      if (sameVnode(vnodeToMove, newStartVnode)) {
        patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
        oldCh[idxInOld] = undefined // TODO: 因为已经进行patchVnode了，所以赋值undefined
        // TODO: 当有标识位canMove时可以直接插入oldStartVnode对应的真实Dom节点前面*
        canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm)
      } else {
        // same key but different element. treat as new element
        createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
      }
    }
    newStartVnode = newCh[++newStartIdx]
  }
}
if (oldStartIdx > oldEndIdx) {
  // TODO: 全部比较完成以后，发现oldStartIdx > oldEndIdx的话，说明老节点已经遍历完了，新节点比老节点多， 所以这时候多出来的新节点需要一个一个创建出来加入到真实Dom中
  refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm
  addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue)
} else if (newStartIdx > newEndIdx) {
  // TODO: 如果全部比较完成以后发现newStartIdx > newEndIdx，则说明新节点已经遍历完了，老节点多于新节点，这个时候需要将多余的老节点从真实Dom中移除
  removeVnodes(oldCh, oldStartIdx, oldEndIdx) // TODO: 移除 oldStartIdx - oldEndIdx 之间的所有节点
}
```