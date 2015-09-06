var express = require('express');
var router = express.Router();
var sign = require('./controllers/sign');
var index = require('./controllers/index');
var question = require('./controllers/question');
var answer = require('./controllers/answer');
var topic = require('./controllers/topic');

// 首屏
router.get('/', sign.homepage);                         // 首页
router.post('/register', sign.register);                // 注册页
router.post('/login', sign.login);                      // 登录页
router.get('/logout', sign.logout);                     // 登出页
router.get('/index', index.index);                      // 主页

// 提问
router.post('/question', question.post),                // 发布问题
router.get('/question/:q_id', question.view);           // 查看问题

// 回答
router.post('/question/:q_id/answer', answer.answer);    // 提交回答

// 赞、down
router.post('/answer/:a_id/up', answer.addUp);          // 对回答点赞
router.put('/answer/:a_id/up', answer.cancelUp);        // 修改赞
router.post('/answer/:a_id/down', answer.addDown);      // 对回答down
router.put('/answer/:a_id/down', answer.cancelDown);    // 修改down

// 话题
router.get('/topic', topic.getAll);                     // 得到话题

// 用户
router.get('/home', index.home);                         // 用户主页

// common
router.post('/uploadPic', question.uploadPic);          // 上传图片




module.exports = router;
