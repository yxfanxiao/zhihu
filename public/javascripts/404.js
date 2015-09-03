// main2048.js 主逻辑

var board = new Array();
var score = 0;
var hasConflicted = new Array();
var gameoverFlag = false;


$(document).ready(function () {
  newgame();
});

function newgame () {
  init();
  generateOneNumber();
  generateOneNumber();
  $('header h1').css({
    transform: 'rotate(360deg)',
    transition: 'transform 2s ease 0s'
  });
  setTimeout(function(){
    $('header h1').css({
      transform: '',
      transition: ''
  })
  },1000)
}

function init () {
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      var gridCell = $('#grid-cell-'+i+'-'+j);
      gridCell.css('top',getPosTop(i, j));
      gridCell.css('left',getPosLeft(i, j));
    }
  } 
  for (var i = 0; i < 4; i++) {
    board[i] = new Array();
    hasConflicted[i] = new Array();
    for (var j = 0; j < 4; j++) {
      board[i][j] = 0;
      hasConflicted[i][j] = false;
    }
  }
  // board[1][0] =2;
  score = 0;
  updateNewScore();
  updateBoardView();
  
}

function updateBoardView () {
  $('.number-cell').remove();
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      $('#grid-container').append('<div class="number-cell" id="number-cell-'+i+'-'+j+'" ></div>');
      var theNumberCell = $('#number-cell-'+i+'-'+j);
      if (board[i][j] == 0) {
        theNumberCell.css('width', '0px');
        theNumberCell.css('height', '0px');
        // ??why set top & left?
        // i know, for the animation, now it's at the centre, after it take over the Cell
        theNumberCell.css('top', getPosTop(i, j) + 50);
        theNumberCell.css('left', getPosLeft(i, j) + 50);
      }
      else 
      {
        theNumberCell.css('width', '100px');
        theNumberCell.css('height', '100px');
        theNumberCell.css('top', getPosTop(i, j));
        theNumberCell.css('left', getPosLeft(i, j));
        theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]));
        theNumberCell.css('color', getNumberColor(board[i][j]));
        theNumberCell.text(board[i][j]);
      }
      hasConflicted[i][j] = false;
    }
  }

}

function generateOneNumber () {
  if (nospace(board)) {
    return false;
  }
  var randx = ~~(Math.random() * 4);
  var randy = ~~(Math.random() * 4);
  var times = 0;
  while (times < 50) {
    if (board[randx][randy] == 0) {
      break;
    } 
    var randx = ~~(Math.random() * 4);
    var randy = ~~(Math.random() * 4);
    times++;
  }
  if (times == 50) {
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        if (board[i][j] == 0) {
          randx = i;
          randy = j;
        }
      }
    }
  }
  var randNumber = Math.random() < 0.5 ? 2 : 4;
  board[randx][randy] = randNumber;
  // alert(randx+' '+randy+' '+randNumber+' '+board[randx][randy]);
  showNumberWithAnimation(randx, randy, randNumber);
}



function nospace (board) {
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (board[i][j] == 0) {
        return false;
      }
    }
  }
  return true;
}


$(document).keydown(function (event) {
  switch (event.keyCode) {
    case 37: 
      event.preventDefault();
      if (moveLeft()) {
        setTimeout(function () {
          generateOneNumber();
          print(board); 
        },200);
        setTimeout('isgameover()',300);
      } 
      break;
    case 38:
      event.preventDefault();
      if (moveUp()) {
        setTimeout(function () {
          generateOneNumber();
          print(board); 
        },200);
        setTimeout('isgameover()',300);
      } 
      break;
    case 39:
      event.preventDefault();
      if (moveRight()) {
        setTimeout(function () {
          generateOneNumber();
          print(board); 
        },200);
        setTimeout('isgameover()',300);
      } 
      break;
    case 40:
      event.preventDefault();
      if (moveDown()) {
        setTimeout(function () {
          generateOneNumber();
          print(board); 
        },200);
        setTimeout('isgameover()',300);
      } 
      break;
    dafault:
      break;
  }
});

function isgameover () {
  if (nospace(board) && nomove(board) && !gameoverFlag) {
    gameover();
    // for (var i = 0; i < 4; i++) {
    //  for (var j = 1; j < 4; j++) {
    //    board[i][j] = 0;
    //  }
    // }
  }
}

function gameover () {
  gameoverFlag = true;
  alert('gameover');
}

function moveLeft () {
  if (!canMoveLeft(board)) {
    return false;
  }
  var addScore = 0;
  for (var i = 0; i < 4; i++) {
    for (var j = 1; j < 4; j++) {
      if (board[i][j] != 0) {
        for (var k = 0; k < j; k++) {
          if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
            showMoveAnimation(i, j, i, k);
            board[i][k] = board[i][j];
            board[i][j] = 0;
            continue;
          }
          else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflicted[i][k]) 
          {
            board[i][k] += board[i][j];
            board[i][j] = 0;
            score += board[i][k];
            addScore += board[i][k];
            hasConflicted[i][k] = true;
            continue;
          }
        }
      }
    }
  }
  updateScore(score,addScore);
  setTimeout(function () {
    updateBoardView();
  }, 150)
  return true;
}

function moveRight () {
  if (!canMoveRight(board)) {
    return false;
  }
  var addScore = 0;
  for (var i = 0; i < 4; i++) {
    for (var j = 2; j >= 0; j--) {
      if (board[i][j] != 0) {
        for (var k = 3; k > j; k--) {
          if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
            showMoveAnimation(i, j, i, k);
            board[i][k] = board[i][j];
            board[i][j] = 0;
            continue;
          }
          else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && !hasConflicted[i][k]) 
          {
            board[i][k] += board[i][j];
            board[i][j] = 0;
            score += board[i][k];
            addScore += board[i][k];
            hasConflicted[i][k] = true;
            continue;
          }
        }
      }
    }
  }
  updateScore(score,addScore);  
  setTimeout(function () {
    updateBoardView();
  }, 150)
  return true;
}

function moveUp () {
  if (!canMoveUp(board)) {
    return false;
  }
  var addScore = 0;
  for (var i = 1; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (board[i][j] != 0) {
        for (var k = 0; k < i; k++) {
          if (board[k][j] == 0 && noBlockVertical(k, j, i, board)) {
            showMoveAnimation(i, j, k, j);
            board[k][j] = board[i][j];
            board[i][j] = 0;
            continue;
          }
          else if (board[k][j] == board[i][j] && noBlockVertical(k, j, i, board) && !hasConflicted[k][j]) 
          {
            showMoveAnimation(i, j, k, j);
            board[k][j] += board[i][j];
            board[i][j] = 0;
            score += board[k][j];
            addScore += board[k][j];
            hasConflicted[k][j] = true;
            continue;
          }
        }
      }
    }
  }
  updateScore(score,addScore);
  setTimeout(function () {
    updateBoardView();
  }, 150)
  return true;
}

function moveDown () {
  if (!canMoveDown(board)) {
    return false;
  }
  var addScore = 0;
  for (var i = 2; i >= 0; i--) {
    for (var j = 0; j < 4; j++) {
      if (board[i][j] != 0) {
        for (var k = 3; k > i; k--) {
          if (board[k][j] == 0 && noBlockVertical(k, j, i, board)) {
            showMoveAnimation(i, j, k, j);
            board[k][j] = board[i][j];
            board[i][j] = 0;
            continue;
          }
          else if (board[k][j] == board[i][j] && noBlockVertical(i, j, k, board) && !hasConflicted[k][j]) 
          {
            showMoveAnimation(i, j, k, j);
            board[k][j] += board[i][j];
            board[i][j] = 0;
            score += board[k][j];
            addScore += board[k][j];
            hasConflicted[k][j] = true;
            continue;
          }
        }
      }
    }
  }
  updateScore(score,addScore);
  setTimeout(function () {
    updateBoardView();
  }, 150)
  return true;
}

// to debug
function print (board) {
  var str = '';
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      str += board[i][j] + '  ';
    }
    str += '\n';
  }
  console.log(str);
}


// showanimation2048.js 动画效果逻辑

function showNumberWithAnimation(i, j, randNumber) {
  var numberCell = $('#number-cell-'+i+'-'+j);
  numberCell.css('background-color',getNumberBackgroundColor(randNumber));
  numberCell.css('color',getNumberColor(randNumber));
  numberCell.text(randNumber);
  numberCell.animate({
    width: '100px',
    height: '100px',
    top: getPosTop(i, j),
    left: getPosLeft(i, j)
  },50);
}

function showMoveAnimation (fromx, fromy, tox, toy) {
  var numberCell = $('#number-cell-'+fromx+'-'+fromy);
  numberCell.animate({
    top: getPosTop(tox, toy),
    left: getPosLeft(tox, toy)
  },200);
}

function updateScore (score,addScore) {
  $('#score').text(score);
  if (addScore > 0) {
    var $i = $('<b>').text('+'+addScore);
    $i.css({position:"fixed",left:"380px",top:"350px",fontSize:'1.5em',fontFamily:"Arial"});
    $('body').append($i);
    $i.animate({
      opacity:'0',
      top: '300px',
      'font-size': '2em'
    },1000,function(){
      $i.remove();
    });
  }
}

function updateNewScore () {
  $('#score').text(0);
}

// support2048.js 底层支撑逻辑

function getPosTop (i, j) {
  return 20 + i * 120;
}

function getPosLeft (i, j) {
  return 20 + j * 120;
}

function getNumberBackgroundColor (number) {
  switch (number) {
    case 2: return "#eee4da" ; break;
    case 4: return "#ede0c8" ; break;
    case 8: return "#f2b179" ; break;
    case 16: return "#f59563" ; break;
    case 32: return "#f67c5f"; break;
    case 64: return "#f65e3b"; break;
    case 128: return "#edcf72"; break;
    case 256: return "#edcc61"; break;
    case 512: return "#9c0"; break;
    case 1024: return "#33b5e5"; break;
    case 2048: return "#09c"; break;
    case 4096: return "#a6c"; break;
    case 8192: return "#93c"; break;
    default: return "red";break;
  }
}

function getNumberColor (number) {
  if (number <= 4) {
    return "#776e65";
  }
  return "white";
}

function canMoveLeft (board) {
  for (var i = 0; i < 4; i++) {
    for (var j = 1; j < 4; j++) {
      if (board[i][j] != 0) {
        if (board[i][j-1] == 0 || board[i][j-1] == board[i][j]) {
          return true;
        }
      }
    }
  }
  return false;
}

function canMoveRight (board) {
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 3; j++) {
      if (board[i][j] != 0) {
        if (board[i][j+1] == 0 || board[i][j+1] == board[i][j]) {
          return true;
        }
      }
    }
  }
  return false;
}


function noBlockHorizontal (row, col1, col2, board) {
  for (var i = col1 + 1; i < col2; i++) {
    if (board[row][i] != 0) {
      return false;
    }
  }
  return true;
}

function noBlockVertical (row1, col, row2, board) {
  for (var i = row1 + 1; i < row2; i++) {
    if (board[i][col] != 0) {
      return false;
    }
  }
  return true;
}

function canMoveUp (board) {
  for (var i = 1; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (board[i][j] != 0) {
        if (board[i-1][j] == 0 || board[i-1][j] == board[i][j]) {
          return true;
        }
      }
    }
  }
  return false;
}

function canMoveDown (board) {
  for (var i = 2; i >= 0; i--) {
    for (var j = 0; j < 4; j++) {
      if (board[i][j] != 0) {
        if (board[i+1][j] == 0 || board[i+1][j] == board[i][j]) {
          return true;
        }
      }
    }
  }
  return false;
}

function nomove (board) {
  if (canMoveLeft(board) || canMoveRight(board) || canMoveUp(board) || canMoveDown(board)) {
    return false;
  }
  return true;
}