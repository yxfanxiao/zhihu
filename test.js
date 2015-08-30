var moment = require('moment')
moment.locale('zh-cn');
var date = moment(new Date()).fromNow();
console.log(date)