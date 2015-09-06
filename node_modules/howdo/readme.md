# howdo[![NPM version](https://img.shields.io/npm/v/howdo.svg?style=flat)](https://npmjs.org/package/howdo)

异步流程控制。

入门指引：<http://FrontEndDev.org/column/howdo-introduction/>


# FEATURES
* nodejs（all）、browser（IE6/7/8/9/10/11、chrome、firefox）通用
* 注重约定
* 同步、异步任务都支持
* 支持顺序串行任务
* 支持顺序并行任务
* 自动实例化
* 链式操作



# INSTALL

## nodejs
```cmd
npm install -S howdo
```

```js
var howdow = require('howdo');
```

## browser
### CMD
```
defined(function(require, exports, module){
    var howdo = require('./path/to/howdo.js');
});
```

### 全局
```html
<script src="/path/to/howdo.js"></script>
<script>
// howdo挂载在window对象上
// do sth...
</script>
```


# API
遵守这个约定，回调的第一个参数为错误对象。
```
// err 为 null 或 undefined 时表示回调成功
// 否则为回调失败
callback(err, ...);
```

## `#task` 分配单个任务，链式
```js
// 分配顺序串行任务
howdo
    // 分配单次任务 1
    .task(function (next) {
        // 第一个参数必须是Error对象的实例，如果没有错误，传null
        // 可以传多个结果给下一个任务接收
        next(null, 1, 2, 3);
    })
    // 分配单次任务 2
    .task(function (next, data1, data2, data3) {
        // data1 = 1
        // data2 = 2
        // data3 = 3
        next(null, data1 + data2 + data3);
    })
    .try(function(data){
        // data = 6
    })
    .catch(function (err) {
        // err = null
    })
    .follow();


// 分配顺序并行任务
howdo
    // 分配单次任务 1
    .task(function (done) {
        // 第一个参数必须是Error对象的实例，如果没有错误，传null
        // 可以传多个结果给结果接收
        done(null, 1, 2, 3);
    })
    // 分配单次任务 2
    .task(function (done) {
        done(null, 4);
    })
    .try(function(data1, data2, data3, data4){
        // data1 = 1
        // data2 = 2
        // data3 = 3
        // data4 = 4
    })
    .catch(function(err){
        // err = null
    })
    .follow();
```

## `#each` 循环分配任务，链式
```js
// task是用来分配单个次序任务，而如果是批量次序任务的话，就需要用each来操作了

var list = [1, 2, 3, 4];

// 批量分配顺序串行任务
howdo
    .each(list, function (key, val, next, data) {
        // 第1次： data = undefined
        // 第2次： data = 1
        // 第3次： data = 2
        // 第4次： data = 3
        next(null, val);
    })
    .try(function(data){
        // data = 4
    })
    .catch(function(err){
        // err = null
    })
    .follow();


// 批量分配顺序并行任务
howdo
    .each(list, function (key, val, done) {
        done(null, val);
    })
    .try(function(data1, data2, data3, data4){
        // data1 = 1
        // data2 = 2
        // data3 = 3
        // data4 = 4
    })
    .catch(function(err){
        // err = null
    })
    .together();
```


## `#follow` 顺序串行任务，链式

`follow`用来收集任务结果，如其字面意思，表示多个任务是顺序串行执行的。


## `#together` 顺序并行任务，链式

`together`也是用来收集任务结果，如其字面意思，表示多个任务是顺序并行执行的。


## `try` 任务成功回调，链式
```
.try(function(arg0, arg1, ...){
    // ...
})
```


## `catch` 任务失败回调，链式
```
.try(function(err){
    // 任务失败的回调
})
```



# VERSION
## 2.0.x
- 增加了`try`、`catch`两个接口

## v1.1.4
- 完善了一些描述

## v1.1.1
* 修复空列表的each问题

## v1.1.0
* 兼容到IE6、chrome、firefox
* 兼容到nodejs

## v0.0.1
* 初始版本
