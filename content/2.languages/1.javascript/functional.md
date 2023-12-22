# 函数式编程

`函数式编程`更加强调在编程过程中把更多的关注点放在如何去`构建关系`

函数式编程的特点：
1. ”函数“是一等公民
2. 声明式编程
3. 惰性执行
4. 无状态和数据不可变
5. 无副作用
6. 纯函数

## 1. 函数柯里化
```javascript
function curry (func) {
  return function curried (...args) {
    if (args.length >= func.length) {
      return func.apply(this, args)
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2))
      }
    }
  }
}
```

## 2. 函数 componse
```javascript
function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }
  if (funcs.length === 1) {
    return funcs(0)
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
```

## 3. 偏函数
```javascript
function partial(fn, ...args1) {
  return function (...args2) {
    return fn.call(this, ...args1, ...args2)
  }
}
```