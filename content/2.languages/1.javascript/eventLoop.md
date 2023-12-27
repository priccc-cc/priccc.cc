---
title: '时间循环 EventLoop'
description: ''
tag: ['Javascript']
author: 'Priccc'
createdAt: '2023-12-27'
updatedAt: ''
---

### 定义
为了协调事件（event），用户交互（user interaction），脚本（script），渲染（rendering），网络（networking）等，用户代理（user agent）必须使用事件循环（event loops）。

Node使用了libuv库来实现Event loop; 而在浏览器中，html规范定义了Event loop，具体的实现则交给不同的厂商去完成。
**浏览器的Event loop和Node的Event loop是两个概念**

### 宏任务
script(整体代码)、setTimeout、setInterval、setImmediate(Node)、requestAnimationFrame、I\O、UI rendering

### 微任务
process.nextTick(Node)、Promise、Object.observe(废弃)、MutationObserver

### 浏览器执行顺序
浏览器会不断从task队列中按顺序取task执行，每执行完一个task都会检查microtask队列是否为空（执行完一个task的具体标志是函数执行栈为空），如果不为空则会一次性执行完所有microtask。然后再进入下一个循环去task队列中取下一个task执行，以此类推。

![](https://segmentfault.com/img/bV6itK?w=810&h=414)

### Node执行顺序
Node 的 Event Loop 分为6个阶段，会按照如下顺序反复执行
1. timers：执行setTimeout() 和 setInterval()中到期的callback
2. I/O callbacks：上一轮循环中有少数的I/O callback会被延迟到这一轮的这一阶段执行
3. idle, prepare：队列的移动，仅内部使用
4. poll：最为重要的阶段，执行I/O callback，在适当的条件下会阻塞在这个阶段
5. check：执行setImmediate的callback
6. close callbacks：执行close事件的callback，例如socket.on("close",func)

在每个阶段完成后，microTask队列就会被执行。

需要注意的是，如果在timers阶段执行时创建了setImmediate则会在此轮循环的check阶段执行，如果在timers阶段创建了setTimeout，由于timers已取出完毕，则会进入下轮循环，check阶段创建timers任务同理。

![](https://segmentfault.com/img/bV6iwC?w=655&h=503)
