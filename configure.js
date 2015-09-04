module.exports = {
  mongodb_url: 'mongodb://127.0.0.1:27017/zhihu',       // mongoose连接

  // 这里的加密字符串到了生成环境要换成128个字符的随机字符串
  sessionSecret: 'zhihu-sessionSecret',                 // session加密
  cookieSecret: 'zhihu-cookieSecret',                   // cookie加密
  auth_cookie_name: 'zhihu-auth_cookie_name',           // cookie name
  password_salt: 'zhihu-password_salt'                  // 密码加盐
};