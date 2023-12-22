# 浏览器缓存

```flow
  st=>start: 用户请求资源
  op1=>operation: 直接使用缓存
  op2=>operation: 向服务器请求 If-None-Match
  op3=>operation: 向服务器请求 If-Modified-Since
  op4=>operation: 服务器返回304，读取本地缓存
  op5=>operation: 向服务器请求
  op6=>operation: 请求响应，协商缓存
  cond1=>condition: 是否存在缓存?
  cond2=>condition: 缓存是否过期?
  cond3=>condition: 判断 ETag?
  cond4=>condition: 判断 Last-Modified?
  cond5=>condition: 服务器返回200还是304?
  e=>end 返回展示资源
  st->cond1
  cond1(no)->op5
  cond1(yes)->cond2
```


[浏览器缓存看这一篇就够了](https://zhuanlan.zhihu.com/p/60950750)

### 1. 缓存机制

匹配流程
 1. 发起请求前， 根据请求头的expires和cache-control判断是否命中（包括是否过期）强缓存策略， 如果命中， 直接从缓存中取， 不会发送请求。如果没有， 进入下一步
 2. 没有命中强缓存，浏览器会发送请求，根据请求头的last-modified和etag判断是否命中协商缓存，如果命中，直接从缓存获取资源。如果没有， 进入下一步
 3. 向浏览器发送请求

 ![](https://pic3.zhimg.com/80/v2-28160195deb51a7ff988ce0e6fe47996_1440w.jpg)

### 2. 强缓存

强缓存：不会向服务器发送请求，直接从缓存中读取资源。

#### 2.1 强缓存原理
强制缓存就是向浏览器缓存查找该请求结果，并根据该结果的缓存规则来决定是否使用该缓存结果的过程，强制缓存的情况主要有三种(暂不分析协商缓存过程)，如下：

- 第一次请求， 不存在缓存结果和标识， 直接请求浏览器
- 存在缓存结果和标识， 但是已经失效，强制缓存失效， 使用协商缓存
- 存在缓存结果和标识， 且未失效， 强制缓存生效，直接从返回该结果

控制强制缓存的字段分别是Expires和Cache-Control，其中Cache-Control优先级比Expires高。


Expires

缓存过期时间。Expires=max-age + 请求时间，需要和Last-modified结合使用。Expires是Web服务器响应消息头字段，在响应http请求时告诉浏览器在过期时间前浏览器可以直接从浏览器缓存取数据，而无需再次请求。

受限于本地时间，如果本地时间更改，可能会造成缓存失效

Cache-Control

控制网页缓存。

取值：
- public：所有内容都将被缓存（客户端和代理服务器都可缓存）
- private：所有内容只有客户端可以缓存
- no-cache: 默认值。 客户端缓存内容，但是是否使用缓存则需要经过协商缓存来验证决定。
- no-store：都不会被缓存。 不适用强制缓存也不适用协商缓存
- max-age=xxx (xxx is numeric)：缓存内容将在xxx秒后失效

#### 2.2 缓存放哪里

from disk cache和from memory cache

Chrome的网络请求的Size会出现三种情况from disk cache(磁盘缓存)、from memory cache(内存缓存)、以及资源大小数值。

tips: 内存缓存是响应速度最快的一种缓存。 内存缓存是快的，也是“短命”的。它和渲染进程“生死相依”，当进程结束后，也就是 tab 关闭以后，内存里的数据也将不复存在。

浏览器读取缓存的顺序为memory –> disk。

![](https://pic1.zhimg.com/80/v2-fa21b4ae1b1c2ff3f696256684880864_1440w.jpg)


### 3. 协商缓存

协商缓存就是强制缓存失效后，浏览器携带缓存标识向服务器发起请求，由服务器根据缓存标识决定是否使用缓存的过程，主要有以下两种情况：

- 协商缓存生效，返回304和Not Modified
![](https://pic3.zhimg.com/80/v2-29af290eabb00d70fb015eeeccf16666_1440w.jpg)
- 协商缓存失效，返回200和请求结果
![](https://pic2.zhimg.com/80/v2-1683bb59b2f2dbc33cddb93de7acf791_1440w.jpg)


#### 3.1 Last-Modified和If-Modified-Since

1. 首先浏览器向服务端发送请求， 服务端在`response header`中返回资源的上次修改时间`last-modified`, 浏览器会混存下这个时间
2. 浏览器下次请求的时候， 会在`request header`中带上`if-modified-since`(即之前缓存的`last-modified`)， 服务端会进行比较， 一致的话说明资源没有改变，服务端返回正文为空的响应，浏览器从缓存中读取资源

last-modified依赖的是保存的绝对时间，所以会出现误差
 - 保存的时间是以秒为单位的，1秒内多次修改是无法捕捉到的；
 - 各机器读取到的时间不一致，就有出现误差的可能性。

 为了解决这个问题， 出现了etag

 #### 3.2 ETag和If-None-Match

 生成etag常用的方法包括对资源内容使用抗碰撞散列函数，使用最近修改的时间戳的哈希值，甚至只是一个版本号。 和last-modified一样.
 - 浏览器会先发送一个请求得到etag的值，然后再下一次请求在request header中带上if-none-match:[保存的etag的值]。
 - 通过发送的etag的值和服务端重新生成的etag的值进行比对，如果一致代表资源没有改变，服务端返回正文为空的响应，告诉浏览器从缓存中读取资源。

etag的每次生成服务端都要进行读写操作，但是last-modified只需要读操作，所以etag消耗较大

精确度：Etag > last-modified
性能： last-modified > Etag

### 4. 用户行为对浏览器缓存的影响

1. 打开网页，地址栏输入地址： 查找 disk cache 中是否有匹配。如有则使用；如没有则发送网络请求。
2. 普通刷新 (F5)：因为 TAB 并没有关闭，因此 memory cache 是可用的，会被优先使用(如果匹配的话)。其次才是 disk cache。
3. 强制刷新 (Ctrl + F5)：浏览器不使用缓存，因此发送的请求头部均带有 Cache-control:no-cache(为了兼容，还带了 Pragma:no-cache),服务器直接返回 200 和最新内容。

### 5. 总结

![](https://pic3.zhimg.com/80/v2-3e4cf399bbc70a84b426b04b7eac55ba_1440w.jpg)