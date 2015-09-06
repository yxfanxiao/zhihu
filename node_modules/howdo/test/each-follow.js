// 循环一起做
// 2014年7月26日21:11:45




var async = require('./async.js');
var howdo = require('../howdo.js');

howdo
// 分配任务1
.task(function(next) {
    console.log('正在做task分配任务1……');
    async('task分配任务1', function(err) {
        console.log('task分配任务1做完了，next数据为：300,500');
        next(err, 300, 500);
    });
})
// 循环任务
.each({
    0: 700,
    1: 900,
}, function(key, val, next, data1, data2) {
    console.log('正在做第' + (key*1 + 1) + '次事情，拿到的数据为：' + [data1, data2].join(','));
    async('第' + (key*1 + 1) + '次事情', function(err) {
        console.log('第' + (key*1 + 1) + '次事情做完了，next数据为：' + val);
        next(err, val);
    });
})
// 分配任务2
.task(function(next, data) {
    console.log('正在做task分配任务2，拿到的数据为：'+ data);
    async('task分配任务2', function(err) {
        console.log('task分配任务2做完了，next数据为：1100,1300');
        next(err, 1100, 1300);
    });
})
// 跟着做
.follow(function(err, data1, data2) {
    if (err) return console.log(err.message);

    console.log('理论数据为：1100,1300');
    console.log('实际数据为：' + [data1, data2].join(','));
});