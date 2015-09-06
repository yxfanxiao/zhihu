// 循环一起做
// 2014年7月26日21:11:45




var async = require('./async.js');
var howdo = require('../howdo.js');

howdo
// 分配任务1
.task(function(done) {
    console.log('正在做task分配任务1……');
    async('task分配任务1', function(err) {
        console.log('task分配任务1做完了');
        done(err, 500);
    });
})
// 循环任务
.each([700, 900], function(key, val, done) {
    console.log('正在做第' + (key + 1) + '次事情……');
    async('第' + (key + 1) + '次事情', function(err) {
        console.log('第' + (key + 1) + '次事情做完了');
        done(err, val);
    });
})
// 分配任务2
.task(function(done) {
    console.log('正在做task分配任务2……');
    async('task分配任务2', function(err) {
        console.log('task分配任务2做完了');
        done(err, 1100, 1300);
    });
})
// 一起做
.together(function(err, data1, data2, data3, data4, data5) {
    if (err) return console.log(err.message);

    console.log('理论数据为：500,700,900,1100,1300');
    console.log('实际数据为：' + [data1, data2, data3, data4, data5].join(','));
});