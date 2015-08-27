var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('login', { title: 'zhihu-与世界分享你的知识' });
});

module.exports = router;
