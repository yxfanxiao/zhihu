// 一起做

var async = require('./async.js');
var howdo = require('../howdo.js');

howdo
// 任务1
    .task(function (done) {
        //console.log('任务1正在做...');
        //async('任务1', function (e) {
        //    if (e) {
        //        console.log('任务1做错了');
        //    } else {
        //        console.log('任务1做对了，给的值是：1');
        //    }
        //    done(e, 1);
        //});
            done(new Error('呵呵1'));
    })

// 任务2
    .task(function (done) {
        //console.log('任务2正在做...');
        //async('任务2', function (e, data) {
        //    if (e) {
        //        console.log('任务2做错了');
        //    } else {
        //        console.log('任务2做对了，给的值是：2, 3');
        //    }
        //    done(e, 2, 3);
        //});
            done(new Error('呵呵2'));
    })

// 一起做
    .together()
    .try(function (data1, data2, data3) {
        console.log('\r\n###########################################################');
        console.log('together成功：应拿到的数据为：1,2,3，实际拿到的数据分别为：' + [data1, data2, data3].join(','));
    })
    .catch(function (err) {
        console.log('\r\n###########################################################');
        console.log('together失败：' + err.message);
    });
