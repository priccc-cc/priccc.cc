如何使用？
```javascript
handlerId = requestAnimationFrame(callback)
```

如何取消？
```javascript
window.cancelAnimationFrame(handlerId)
```

优势：
1. 由系统决定回调函数执行时机
2. CPU 节能，在页面被隐藏时不执行
3. 函数节流

例子：
```javascript
var progress = 0; //回调函数 
function render() {
  progress += 1; //修改图像的位置
  if (progress < 100) { //在动画没有结束前，递归渲染
    window.requestAnimationFrame(render);
  }
}
//第一帧渲染
window.requestAnimationFrame(render);
```

与 setInterval 的区别？
`setInterval` 浏览器没法保证开始执行的时间和执行频率
`requestAnimationFrame` 是专门为了实现动画效果的 api，保证浏览器在 16.7（1000 / 60）ms 刷新一帧