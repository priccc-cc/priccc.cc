1. 单行超出省略
```css
.text-clamp-1 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```
1. 多行超出省略
```css
.text-clamp-n {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  word-break: break-all;
  text-overflow: ellipsis;
  -webkit-line-clamp: n;
  overflow: hidden;
}
```