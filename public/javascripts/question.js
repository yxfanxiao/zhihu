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

  // 关注问题
  $('.focused-on-question').click(function () {
    var focus_button = $(this);
    var focus_number = $(this).siblings('.focus-on-question-number').children('span');
    var isFocus = focus_button.data('isfocus'),
        question_id = focus_button.data('question'),
        user_id = focus_button.data('user');
    if (isFocus) {
      $.ajax({
        type: 'post',
        url: '/question/'+ question_id + '/unfocus/' + user_id,
        dataType: 'json'
      }).done(function (data) {
        if (data.ok == 1) {
          focus_button.text('关注问题');
          focus_number.text(parseInt(focus_number.text()) - 1);
          focus_button.data('isfocus', false);
        }}).fail(function () {
          alert('请先登录');
        });      
    } else {
      $.ajax({
        type: 'post',
        url: '/question/'+ question_id + '/focus/' + user_id,
        dataType: 'json'
      }).done(function (data) {
        if (data.ok == 1) {
          focus_button.text('取消关注');
          focus_number.text(parseInt(focus_number.text()) + 1);
          focus_button.data('isfocus', true);
        }}).fail(function () {
          alert('请先登录');
        });    
      }  
  });

  // 诶，“点赞功能”，感觉写了一晚上屎一样的代码！！心情都变low了。
  // 点赞
  $('.up').click(function () {
    var answer_id = $(this).data('answer'),
        isUp = $(this).data('isup'),
        isDown = $(this).data('isdown'),
        down_this = $(this).siblings('.down');
    
    if (!isUp && !isDown) {
      up($(this), answer_id);
      return;
    }
    if (!isUp && isDown) {
      cancelDown($(this), down_this, answer_id);
      return;
    }
    if(isUp && !isDown) {
      cancelUp($(this), answer_id);
      return;
    }
  });
  // down
  $('.down').click(function () {
    var up_this = $(this).siblings('.up');
    var answer_id = $(up_this).data('answer'),
        isUp = $(up_this).data('isup'),
        isDown = $(up_this).data('isdown');
    if (!isUp && !isDown) {
      down($(up_this), $(this), answer_id);
      return;
    }
    if (!isUp && isDown) {
      cancelDown($(up_this), $(this), answer_id);
      return;
    }
    if(isUp && !isDown) {
      cancelUp($(up_this), answer_id);
      return;
    }
  });

  function up (up_this, answer_id) {
    var up_value = $(up_this).children('.h5');
    $.ajax({
      type: 'post',
      url: '/answer/'+ answer_id + '/up',
      dataType: 'json'
    }).done(function (data) {
      if (data.ok == 1) {
        var number = $(up_value).text();
        $(up_value).text(parseInt(number) + 1);
        $(up_this).data('isup', true);
        $(up_this).css({
          'background-color':'#698ebf',
          'color': 'white'
        });
      }}).fail(function () {
      alert('请先登录');
    });     
  }  
  function cancelUp (up_this, answer_id) {
    var up_value = $(up_this).children('.h5');
    $.ajax({
      type: 'put',
      url: '/answer/'+ answer_id + '/up',
      dataType: 'json',
    }).done(function (data) {
      if (data.ok == 1) {
        var number = $(up_value).text();
        $(up_value).text(parseInt(number) - 1);
        $(up_this).data('isup', false);
        $(up_this).css({
          'background-color':'#EFF6FA',
          'color': '#698ebf'
        });
      }}).fail(function () {
      alert('请先登录');
    });   
  }  
  function down (up_this, down_this, answer_id) {
    $.ajax({
      type: 'post',
      url: '/answer/'+ answer_id + '/down',
      dataType: 'json'
      }).done(function (data) {
      if (data.ok == 1) {
        $(up_this).data('isdown', true);
        $(down_this).css({
          'background-color':'#698ebf',
          'color': 'white'
        });
      }}).fail(function () {
      alert('请先登录');
    }); 
  }   
  function cancelDown (up_this, down_this, answer_id) {
    $.ajax({
      type: 'put',
      url: '/answer/'+ answer_id + '/down',
      dataType: 'json'
    }).done(function (data) {
        $(up_this).data('isdown', false);
        $(down_this).css({
          'background-color':'#EFF6FA',
          'color': '#698ebf'
        });        
      if (data.ok == 1) {
      }}).fail(function () {
      alert('请先登录');
    });   
  }   
});

