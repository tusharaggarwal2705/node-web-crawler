var express = require('express');
var router = express.Router();
var auth=require('./auth');

var user=require('./users');

const { isAuthenticated } = require("../middlewares/authCheck");

router.use(isAuthenticated);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/auth',auth);

router.use('/user',user);

module.exports = router;
