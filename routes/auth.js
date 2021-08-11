var express = require('express');
const { loginUser, registerUser, socialLogin, forgotPassword, sendVerificationOtp, updateUserInfo, getUserDetails, resetPassword } = require('../controllers/UserController/user');
var router = express.Router();
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',loginUser);
router.post('/register',registerUser);
router.post('/social-login',socialLogin);
router.put('/forgot-password',forgotPassword);
router.put('/send-verification-otp',sendVerificationOtp);
router.put('/update-client-details/:id',updateUserInfo);
router.get('/:id',getUserDetails)
router.put('/reset-password',resetPassword)


module.exports = router;
