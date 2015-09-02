$(function () {
  // 问题界面的2种排序
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
  }, function () {
    $(this).css({'background': 'transparent'});  
  });

  // 当点击回复日期的时候，答案出现一层渐变色
  $('.answer-content-bottom-answer, #write-answer-point-myanswer').click(function () {
    var content_body_id = $(this).data('linkto');
    $('#' + content_body_id).css({
      'background-color': '#FCFF86',
      'transition': 'all 1s linear'
    });
    setTimeout(function () {
      $('#' + content_body_id).css({
        'background-color': 'transparent'
      });
    }, 1000);      
  });

  // 点赞，down
  $('.up').click(function () {
    var answer_id = $(this).data('answer');
    $.ajax({
      type: 'put',
      url: '/up/'+answer_id,
      dataType: 'json',
      success: function (data) {
        console.log(data);
      }
    });
  });
});

