$(function () {
  $('.answer-sort').hover(function () {
    $('.sort-by-time').css({
      'display': 'block',
      'color': '#999'
    });
    $('.answer-sort').css({
      'border': '1px solid #eee'
    });
  }, function () {
    $('.sort-by-time').css({'display': 'none'});
    $('.answer-sort').css({
      'border': '1px solid transparent'
    });
  });
  $('.sort-by-time').hover(function () {
    $(this).css({'background': '#eee'});
  });
});