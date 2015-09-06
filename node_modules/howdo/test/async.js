/*!
 * async
 * @author ydr.me
 * 2014-08-26 13:59
 */

(function () {
    'use strict';

    if(typeof global === 'undefined'){
        window.async = async;
    }else{
        module.exports = async;
    }

    // 定义1个异步函数
    function async(name, callback) {
        // 500 - 1000ms
        var timeout = randomNumber(500, 1000);
        setTimeout(function () {
            var e = timeout > 950 ? new Error(name + '做错了') : null;
            callback(e);
        }, timeout);
    }

    // 随机值
    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
})();

