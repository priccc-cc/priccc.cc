# 排序算法

### 排序的定义
对一序列对象根据某个关键字进行排序

### 排序算法描述术语
1. 稳定性：排序后值相同的两个值顺序没变就是`排序稳定的`，否则是`排序不稳定的`
2. 内排序、外排序：排序只在内存中完成叫内排序，需要借助磁盘的排序叫外排序
3. 时间复杂度
4. 空间复杂度


待排序数组
```javascript
const arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]
```

### 冒泡排序
通过依次比较、交换相邻的元素大小（按照由小到大的顺序，如果符合这个顺序就不用交换）。

1 次这样的循环可以得到一个最大值，`n - 1` 次这样的循环可以排序完毕。

属性
* 稳定
* 时间复杂度 `O(n²)`
* 交换 `O(n²)`
* 对即将排序完成的数组进行排序 `O(n)`

#### 普通版
```javascript
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        [arr[i], arr[j]] = [arr[j], arr[i]]
      }
    }
  }
  return arr
}
```

#### 双向遍版
> 传统冒泡排序中每一趟排序操作只能找到一个最大值或最小值, 我们可以 在每趟排序中进行正向和反向两遍冒泡 ， 一次可以得到两个最终值（最大和最小） , 从而使外排序趟数几乎减少了一半。

```javascript
function bubbleSort(arr) {
  let start = 0, end = arr.length - 1

  while (start < end) {
    for (let i = start; i < end; i++) {
      if (arr[i] < arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]
      }
    }
    start++
    for (let i = end; i > start; i--) {
      if (arr[i] < arr[i - 1]) {
        [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]]
      }
    }
    end--
  }
  return arr
}
```

### 选择排序

每一次内循环遍历寻找最小的数，记录下 `minIndex`，并在这次内循环结束后交换 `minIndex` 和 `i` 的位置。
重复这样的循环 `n - 1` 次即得到结果。

属性
* 不稳定
* `Θ(n²)` 无论什么输入，均为 `Θ(n²)`
* `Θ(n)` 交换: 注意，这里只有 `n` 次的交换，选择排序的唯一优点*

> “可预测”的时间复杂度，什么进来都是 `O(n²)`，但不稳定，唯一的优点是减少了 swap 次数。

```javascript
function selectionSort(arr) {
  for (let i = 0, len = arr.length; i < len - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (i !== minIndex) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
    }
  }
  return arr;
}
```

### 插入排序
默认 `a[0]` 为已排序数组中的元素，从 `arr[1]` 开始逐渐往已排序数组中插入元素，从后往前一个个比较，如果待插入元素小于已排序元素，则已排序元素往后移动一位，直到待插入元素找到合适的位置并插入已排序数组。
经过 `n - 1` 次这样的循环插入后排序完毕。

属性：
* 稳定
* 适合场景：对快要排序完成的数组时间复杂度为 `O(n)`
* 非常低的开销
* 时间复杂度 `O(n²)`

#### 普通版
```js
function insertionSort(arr) {
  for (let i = 1, len = arr.length; i < len; i++) {
    const temp = arr[i];
    let preIndex = i - 1;

    while (arr[preIndex] > temp) {
      arr[preIndex + 1] = arr[preIndex];
      preIndex -= 1;
    }
    arr[preIndex + 1] = temp;
  }
  return arr;
}
```
#### 二分查找版
```js
function insertionSort(arr) {
  for (let i = 1, len = arr.length; i < len; i++) {
    const temp = arr[i];
    let left = 0, right = i - 1

    while (left <= right) {
      let middle = Math.floor((left + right) / 2)

      if (temp < arr[middle]) {
        right = middle - 1
      } else {
        left = middle + 1
      }
    }
    for (var j = i - 1; j >= left; j--) {
      arr[j + 1] = arr[j];
    }
    arr[left] = temp;
  }
  return arr;
}
```

### 归并排序
归并排序使用分而治之的思想，以折半的方式来递归/迭代排序元素，利用空间来换时间，做到了时间复杂度 O(n·log(n)) 的同时保持了稳定。

属性
* 稳定 (在 `O(n·log(n)`) 时间复杂度的排序算法中，归并排序是唯一稳定的)
* 时间复杂度 `O(n·log(n))`
* 对于数组需要 `Θ(n)` 的额外空间 注意：归并排序需要额外的空间，这是它的不完美之处
* 对于链表需要 `O(log(n))` 的额外空间，所以归并排序非常适合列表的排序
* `Does not require random access to data` 因为这个特点，归并排序很适合用来排序列表

```js
function mergeSort(arr) {
  const length = arr.length

  if (length < 2) return arr

  const middle = Math.floor(length / 2)
  const left = arr.slice(0, middle)
  const right = arr.slice(middle)

  return merge(mergeSort(left), mergeSort(right))
}
function merge(left, right) {
  const result = []

  while (left.length > 0 && right.length > 0) {
    result.push(left[0] > right[0] ? right.shift() : left.shift())
  }

  return result.concat(left, right)
}
```

### 堆排序
堆排序可以认为是选择排序的改进版，像选择排序一样将输入划分为已排序和待排序。

不一样的是堆排序利用堆这种近似完全二叉树的良好的数据结构来实现排序，本质上使用了二分的思想。

1. 先将所有的数据堆化
2. 然后移动 `arr[0]` 到数组末尾（已排序区域）
3. 再重新堆化，依次这样循环来排序。

利用堆这种良好的数据结构，它在拥有良好的可预测性的同时（不管输入什么都是 `O(n·log(n))` 时间复杂度），但它的缺点也有：即不稳定，而且 `O(n·log(n))` 的平均效率决定了它的效率不如快速排序。适用于数据库内引擎排序（需要这样的可预测性性能）。

属性
* 不稳定
* `O(n·log(n))` 时间复杂度