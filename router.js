var express = require('express');
var router = express.Router();
var auth = require('./middlewares/auth');
var sign = require('./controllers/sign');
var index = require('./controllers/index');
var question = require('./controllers/question');
var answer = require('./controllers/answer');
var topic = require('./controllers/topic');
var user = require('./controllers/user');

// 首屏
router.get('/', sign.homepage);                                            // 首页
router.post('/register', sign.register);                                   // 注册页
router.post('/login', sign.login);                                         // 登录页
router.get('/logout', sign.logout);                                        // 登出页
router.get('/index', index.index);                                         // 主页
router.get('/search', index.search);                                       // 搜索

// 提问
router.post('/question', auth.userRequired, question.post);                // 发布问题
router.get('/question/:q_id', question.view);                              // 查看问题

// 回答
router.post('/question/:q_id/answer', answer.answer);                      // 提交回答

// 赞、down
router.post('/answer/:a_id/up', answer.addUp);                             // 对回答点赞
router.put('/answer/:a_id/up', answer.cancelUp);                           // 修改赞
router.post('/answer/:a_id/down', answer.addDown);                         // 对回答down
router.put('/answer/:a_id/down', answer.cancelDown);                       // 修改down

// 话题
router.get('/topic', topic.getAll);                                        // 得到话题
router.get('/topic/:tag', topic.tag);                                      // 具体话题          

// 用户
router.get('/home', auth.userRequired, user.home);                         // 用户主页
router.get('/setting', auth.userRequired, user.setting);                   // 用户设置
router.post('/user/:u_id/name', auth.userRequired, user.editName);         // 修改姓名
router.post('/user/:u_id/email', auth.userRequired, user.editEmail);       // 修改邮箱
router.post('/user/:u_id/phone', auth.userRequired, user.editPhone);       // 修改邮箱
router.post('/user/:u_id/password', auth.userRequired, user.editPassword); // 修改密码
router.post('/updateAvatar', auth.userRequired, user.updateAvatar);        // 修改头像

// common
router.post('/uploadPic', question.uploadPic);                             // 上传图片




module.exports = router;
