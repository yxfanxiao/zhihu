// 跟着做

var async = require('./async.js');
var howdo = require('../howdo.js');

howdo
// 第1步
    .task(function (next) {
        console.log('###########################################################');
        console.log('正在做任务第1步...');
        async('任务第1步', function (e) {
            if (e) {
                console.log('任务第1步做错了。')
            } else {
                console.log('任务第1步做对了，上交的值为：1,2,3');
            }
            next(e, 1, 2, 3);
        });
    })

// 第2步
    .task(function (next, data1, data2, data3) {
        console.log('\r\n###########################################################');
        console.log('正在做任务第2步...');
        console.log('拿到任务第1步的值为：' + data1 + '，' + data2 + '，' + data3);
        async('任务第2步', function (e) {
            if (e) {
                console.log('任务第2步做错了。')
            } else {
                console.log('任务第2步做对了，上交的值为：4');
            }
            next(e, 4, 5);
        });
    })
    .follow()
    .try(function (data4, data5) {
        console.log('\n\n结果：');
        console.log('follow成功：拿到的数据应该为：4,5，实际值为：' + data4 + ',' + data5);
    })
    .catch(function (err) {
        console.log('\n\n结果：');
        console.log('follow失败：' + err.message);
    });
