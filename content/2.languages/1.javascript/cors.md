## 跨域资源共享 CORS

CORS是一个W3C标准，全称是"跨域资源共享"（Cross-origin resource sharing）。
它允许浏览器向跨源服务器，发出XMLHttpRequest请求，从而克服了AJAX只能同源使用的限制。
CORS需要浏览器和服务器同时支持。目前，所有浏览器都支持该功能，IE浏览器不能低于IE10。

浏览器会将CORS跨域请求分为`简单请求`和`非简单请求`
1. 同时满足以下两个条件，就属于简单请求
1、使用 `head`、`get`、`post` 请求
2、请求 header 只有：
* Accept
* Accept-Language
* Content-language
* Content-type: 仅限于 application/x-www-from-urlencoded、multipart/form-data、text/plain
2. 不同时满足以上条件属于非简单请求

#### 简单请求
浏览器会直接发出 CORS 请求，会在请求头信息中增加 Origin 字段，来说明本次请求来自哪个源（协议 + 域名 + 端口）

CORS请求设置的响应头字段，都以 Access-Control-开头:
1. Access-Control-Allow-Origin：必选
它的值要么是请求时Origin字段的值，要么是一个*，表示接受任意域名的请求。
2. Access-Control-Allow-Credentials：可选
它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。设为true，即表示服务器明确许可，Cookie可以包含在请求中，一起发给服务器。这个值也只能设为true，如果服务器不要浏览器发送Cookie，删除该字段即可。
3. Access-Control-Expose-Headers：可选
CORS请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma。如果想拿到其他字段，就必须在Access-Control-Expose-Headers里面指定。上面的例子指定，getResponseHeader('FooBar')可以返回FooBar字段的值。

#### 非简单请求
 非简单请求是那种对服务器有特殊要求的请求，比如请求方法是PUT或DELETE，或者Content-Type字段的类型是application/json。非简单请求的CORS请求，会在正式通信之前，增加一次HTTP查询请求，称为"预检"请求（preflight）

预检请求用的请求方法是OPTIONS，表示这个请求是用来询问的。请求头信息里面，关键字段是Origin，表示请求来自哪个源。除了Origin字段，"预检"请求的头信息包括两个特殊字段。

1. Access-Control-Request-Method：必选
用来列出浏览器的CORS请求会用到哪些HTTP方法，上例是PUT。
2. Access-Control-Request-Headers：可选
该字段是一个逗号分隔的字符串，指定浏览器CORS请求会额外发送的头信息字段，上例是X-Custom-Header。

##### 预检请求的回应
服务器收到"预检"请求以后，检查了Origin、Access-Control-Request-Method和Access-Control-Request-Headers字段以后，确认允许跨源请求，就可以做出回应。
HTTP回应中，除了关键的是Access-Control-Allow-Origin字段，其他CORS相关字段如下：
1. Access-Control-Allow-Methods：必选
它的值是逗号分隔的一个字符串，表明服务器支持的所有跨域请求的方法。注意，返回的是所有支持的方法，而不单是浏览器请求的那个方法。这是为了避免多次"预检"请求。
2. Access-Control-Allow-Headers
如果浏览器请求包括Access-Control-Request-Headers字段，则Access-Control-Allow-Headers字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段，不限于浏览器在"预检"中请求的字段。
3. Access-Control-Allow-Credentials：可选
该字段与简单请求时的含义相同。
4. Access-Control-Max-Age：可选
用来指定本次预检请求的有效期，单位为秒。