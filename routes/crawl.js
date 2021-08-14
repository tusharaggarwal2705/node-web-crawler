const express=require('express');
const { webPageCrawler } = require('../controllers/crawlerController');

var router=express.Router()




router.get('/web-page',webPageCrawler)
module.exports=router