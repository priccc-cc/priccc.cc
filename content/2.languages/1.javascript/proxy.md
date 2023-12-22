# Proxy

`var proxy = new Proxy(target, handler);`

`proxy` 可以拦截13个操作
1. `get(target, propKey, receiver)`
  拦截对象属性的读取
2. `set(target, propKey, value, receiver)`
  拦截对象属性的设置
3. `has(target, propKey)`
  拦截 `propKey in  proxy` 的操作，返回一个布尔值
4. `deleteProperty(target, propKey)`
  拦截 `delete proxy[propKey]` 的操作，返回一个布尔值
5. `ownKeys(target)`
  拦截 `Object.getOwnPropertyNames(proxy)`,`Object.getOwnPropertySymbols(proxy)`,`Object.keys(rpoxy)`,`for...in...`，返回一个数组。
  该方法返回目标对象的所有的属性的名，而 `Object.keys()` 的返回结果只包括目标对象的可遍历属性。
6. `getOwnPropertyDescriptor(target, propKey)`
  拦截 `Object.getOwnPropertyDescriptor(target, propKey)` 返回属性的描述对象
7. `defineProperty(target, propKey, propDesc)`
  拦截 `Object.defineProperty(target, propKey, propDesc)`、`Object.defineProperties(target, propDesc)`，返回一个布尔值
8. `preventExtensions(target)`
  拦截 `preventExtensions(target)` 返回一个布尔值
9. `getPropertyOf(target)`
  拦截 `Object.getPropertyOf(target)`，返回一个对象
10. `isExtensible(target)`
  拦截 `Object.isExtensible(target)`，返回一个布尔值
11. `setPropertyOf(target, proto)`
  拦截 `Object.setPropertyOf(proxy, proto)`，返回一个布尔值
12. `apply(target, object, args)`
  拦截 `Proxy` 实例作为函数调用的操作，比如
  `proxy(...args)`，`proxy.call(object, ...args)`，`proxy.appley(...)`
13. `construct(target, args)`
  拦截 `Proxy` 实例作为构造函数调用的操作，比如
  `new proxy(...args)`