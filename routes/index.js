var express = require('express');
var router = express.Router();

const crawl=require('./crawl')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



router.use('/crawl',crawl)

module.exports = router;
