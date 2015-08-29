var express = require('express');
var router = express.Router();
var sign = require('./controllers/sign')


router.get('/', sign.homepage);           // 首页
router.post('/register', sign.register);  // 注册页
router.post('/login', sign.login);        // 登录页

router.get('/index', function (req, res, next) {
  res.render('index')
});


module.exports = router;
