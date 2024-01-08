---
title: '稀疏数组 SqarseArray'
description: ''
tag: ['Javascript']
author: 'Priccc'
createdAt: '2023-12-27'
updatedAt: ''
---

## 何为稀疏数组？

稀疏数组是指索引不连续，数组长度大于元素个数的数组，通俗地说就是 有空隙的数组。

### 怎么生成一个稀疏数组？

```js
// 构造函数声明一个没有元素的数组
var a = new Array(5)    // [empty × 5]

// 指定的索引值大于数组长度
var a = []
a[5] = 4                // [empty × 5, 4]

// 指定大于元素个数的数组长度
var a = []
a.length = 5            // [empty × 5]

// 数组直接量中省略值
var a = [0,,,,]         // [0, empty × 3]

// 删除数组元素
var a = [0, 1, 2, 3, 4]
delete a[4]             // [0, 1, 2, 3, empty]
```

上面的代码中有个 `empty`，这是打印数组输出的值，但是 JavaScript 中并没有这个基础数据类型，那这个 `empty` 到底是什么呢？看下面的代码：

```js
var a = new Array(5)
console.log(a)     // [empty × 5]
a[0]               // undefined
```

难道 `empty` === `undefined`？

其实并不是这样的，`empty` 意识是缺失，当你访问这个缺失的熟悉时，JavaScript 会临时给赋值成 `undefined`。

## 稀疏数组 和 密集数组

`密集数组`：数组元素之间是紧密相连的，不存在空隙，也就是我们平时常用的数组

## 区别？

1. 本质的区别就是数组元素间是否是紧密相连的

2. 遍历方法差异
   * 在遍历到稀疏数组的缺失元素时，回调函数是不会执行的
   ```js
   var a = [1,,3,,]
   a.forEach(i => { console.log(i) }) // 1 3   // 只会打印出不缺失位置的元素
   ```

   * `for-in` 与 `for-of`
   `for-in` 与上面类似
   `for-of` 则会将缺失的元素输出位 `undefined`
   ```js
   var a = [1,,,,5]
   for (var i in a) { console.log(i) }    // 0 4
   for (var i of a) { console.log(i) }    // 1 undefined undefined undefined 5
   ```

   * `map` 与 `filter`
   `map`不会遍历缺失元素，但返回的结果具有与源数组相同的长度和空隙
   `filter`缺失的元素会过滤掉
   ```js
   var a = [1,,,,5]

   a.map(i => i)     // [1, empty × 3, 5]

   a.filter(i => i)  // [1, 5]
   ```

   * `join`
   缺失元素的位置会被保留
   ```js
   var a = [1,,,,5]
   a.join()  // 1,,,,5
   ```

   * `sort`
   会正常排序，但不会对缺失元素排序，会返回与源数组相同的长度
   ```js
   var a = [5,,,,1]
   a.sort()  // [1, 5, empty × 3]
   ```


现在我们知道了什么是稀疏数组，并且知道了怎么去生成一个稀疏数组和它与密集数组的区别，那它都有哪些特性呢？

首先来普及一下一个知识点，V8 引擎访问对象的两种模式：
* Dictionary mode（字典模式）
  字典模式也成为哈希表模式，V8 引擎使用哈希表来存储对象。
* Fast mode（快速模式）
  快速模式使用类似 C 语言的 struct 来表示对象，如果你不知道什么是 struct，可以理解为是只有属性没有方法的 class。

`稀疏数组` 则是采用的字典模式存储的，而这种模式的数据访问速度会比较慢，所以在日常开发中尽量避免使用稀疏数组。
