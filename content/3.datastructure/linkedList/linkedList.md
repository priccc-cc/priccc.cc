---
title: '链表 LinkList'
description: ''
tag: ['Javascript']
author: 'Priccc'
createdAt: '2023-12-27'
updatedAt: ''
---

## 什么是链表？

## 链表的定义：

链表是一组节点组成的集合，每个节点都使用一个对象的引用来指向它的后一个节点。指向另一节点的引用讲做链。如下
![链表定义](https://user-gold-cdn.xitu.io/2017/9/27/a08d4dae94aa270a6039a9be276c19da?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

由于链表的起始点的确定比较麻烦，因此很多链表的实现都会在链表的最前面添加一个特殊的节点，称为 头节点，表示链表的头部。
![有头的链表](https://user-gold-cdn.xitu.io/2017/9/27/d2936b25a6d4ab86113ac788436c4c54?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 按照上面的说法来设计一下链表的结构。

`Node` 类

```javascript
class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}
```

`LinkedList` 类

```javascript
class LinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  append(value) {
    // 将一个节点添加到链表的末尾
  }

  prepend(value) {
    // 将一个节点添加到链表的开头
  }

  insert(value, index) {
    // 将一个节点插入到链表的任意位置
  }

  lookup(index) {
    // 查找特定索引的值
  }

  remove(index) {
    // 删除特定索引处的元素
  }

  reverse() {
    // 反转链表
  }
}
```

现在有了链表节点类和链表类，接下来实现链表的各种操作方法

`append`

```javascript
append (value) {
  const newNode = new Node(value)

  // 如果当前链表为空
  if (!this.head) {
    this.head = newNode
    this.tail = newNode
  } else {
    // 当前链表不为空
    this.tail.next = newNode
    this.tail = newNode
  }

  this.length++
}
```

`prepend`

```javascript
append (value) {
  const node = new Node(value)

  node.next = this.head
  this.head = node
  this.length++
}
```
