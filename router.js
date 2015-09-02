var express = require('express');
var router = express.Router();
var sign = require('./controllers/sign');
var index = require('./controllers/index');
var question = require('./controllers/question');
var answer = require('./controllers/answer');

// 首屏
router.get('/', sign.homepage);                         // 首页
router.post('/register', sign.register);                // 注册页
router.post('/login', sign.login);                      // 登录页
router.get('/logout', sign.logout);                     // 登出页

// 主页
// 之后这里有权限问题！！！
router.get('/index', index.index);                      // 主页
router.post('/question', question.post),                // 发布问题
router.get('/question/:q_id', question.view);           // 查看问题
router.post('/uploadPic', question.uploadPic);          // 上传图片
router.post('/answer/:q_id', answer.answer);            // 提交评论

module.exports = router;
