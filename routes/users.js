const express=require('express')
var router=express.Router()

const {createUser,getUserDetails,getUsersList,updateUserDetail,deleteUser}=require('../controllers/UserController/userManagement')


router.post('/save',createUser);
router.put('/update/:id',updateUserDetail);
router.put('/delete/:id',deleteUser);
router.get('/get-list',getUsersList);
router.get('/details/:id',getUserDetails);

module.exports=router