var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/pics')
  },
  filename: function (req, file, cb) {
    cb(null, req.session.user._id + Date.now() + '.png');
  }
});

// 匹配文件后缀
function fileFilter (req, file, cb) {
  var reg_pic = new RegExp('[.](jpg|png|gif)$');
  if (!reg_pic.test(file.originalname)) {
    cb('图片不是.jpg、.png或.gif格式，无法上传', false);
  }
  else {
    cb(null, true);
  }
}

exports.upload = multer({ storage: storage, fileFilter: fileFilter }).single('pic');


