var moment = require('moment')
moment.locale('zh-cn')
var _ = require('lodash')
// var date = moment(new Date()).format('YYYY-MM-DD');;
// console.log(moment([2007, 0, 29]).toNow()); 
// var date = moment(new Date()).isBefore('2015-09-01');
// console.log(date)
// var date = moment("2015-09-06T06:10:05.445Z");
// console.log(date)

// var date = moment('2015-08-30T05:06:07').calendar(null, {
//     sameDay: '今天 HH:mm',
//     nextDay: 'YYYY-MM-DD',
//     nextWeek: 'YYYY-MM-DD',
//     lastDay: '昨天 HH:mm',
//     lastWeek: 'YYYY-MM-DD'
// });

// var date1 = moment("2015-09-01T15:00:05.424Z").unix(Number);
// var date2 = moment(new Date()).unix(Number);
// console.log(date1)
// console.log(date2)
// console.log(date1==date2)


// var a = {}
// console.log(a == {})

// if (a) {
//   console.log('a')
// } 
//   console.log('b')


// var a = [3][3]
// a = _.slice(a,0, 3)
// console.log(a)


// var a = [1,2,3]
// var sum = a.reduce(function (pre, cur) {
//   return pre + cur
// })
// console.log(sum)

// var a = '@liu asd'
// a = a.replace('@liu ', '')
// console.log(a)

// var a = {a:1}
// var b = {a:2}
// var c = []
// c.push(a)
// c.push(b)
// console.log(c)

// var a = [1,2,3]
// var b
// console.log(a.forEach(function(i) {
//   return i + 1;
// }))

// var Promise = require('bluebird')
// var fs = Promise.promisifyAll(require("fs"))
// Promise.then(function () {
//   return [fs.readFileAsync('myfile.json'),
//           fs.readFileAsync('myfile2.json')]
// }).spread(function (file1, file2) {
//   if (file1 == file2) {
//     console.log(file1)
//   } else {
//     console.log(file2)
//   }
// })









// fs.readFileAsync("myfile.json").then(JSON.parse).then(function (json) {
//     console.log("Successful json" + json);
// }).catch(SyntaxError, function (e) {
//     console.error("file contains invalid json");
// }).catch(Promise.OperationalError, function (e) {
//     console.error("unable to read file, because: ", e.message);
// });








// var str = 'a\r\n     a'
// // console.log(str)
// // var reg = new RegExp('\r\n','g')
// console.log(str.replace('/\r\n/g', '<br>').replace('/ /g','&nbsp;'))


// var reg = new RegExp('[.](jpg|png|gif)$');
// console.log(reg.test('1080p壁纸.jpg'))





// var a = [{a:1,b:2},{a:1,b:2},{a:1,b:3}];
var a = [1,2,2]
console.log(_.uniq(a))