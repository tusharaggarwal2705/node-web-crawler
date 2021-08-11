const multer = require('multer');
const logger = require('../utils/logger');
const { handleError } = require('../utils/requestHandlers');
const uploadData = multer({
    //rename:(fieldname,filename)=>`${Date.now()}-${filename.replace(/\W+/g, '-').toLowerCase()}`
  }).fields([
      {name:'file',maxCount:10}
  ])

  const parseFile=async(req,res,next)=>{
      logger.info('inside parser')
      uploadData(req,res,err=>{
          if(err){
            console.log(err);
            logger.error(err)
            handleError({res,err})
          }
          logger.info('parsed successfully')
          next();
      })
  }




  module.exports={
      parseFile
  }