$(function () {
  // 注册/登录切换
  $('.js-signin').click(function () {
     $('.register-form').css({ 'display': 'none' });
     $('.login-form').css({ 'display': 'block' });
  });
  $('.js-register').click(function () {
     $('.register-form').css({ 'display': 'block' });
     $('.login-form').css({ 'display': 'none' });
  });
});