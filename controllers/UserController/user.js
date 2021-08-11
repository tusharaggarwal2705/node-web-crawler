const { handleError,handleResponse}=require('../../utils/requestHandlers')
const {get,isUserExists,save,updateUser,resetPassword}=require('../../dbServices/user')
const loginValidator=require('../../utils/loginValidation');
const registerValidator=require('../../utils/registerValidator')
const jwt=require('jsonwebtoken')
const {appSecret,notificationTypes:{VERIFICATION_OTP}}=require('../../config/config');
const { generateRandomOtp, generateOtpExpiry } = require('../../config/common');
const generateJwtToken = async user => await jwt.sign(user, appSecret);
// const {emailService}=require('../../services/emailService');



exports.loginUser=async({body:{email,password}},res)=>{
    try {
        const {errors,isValid}=loginValidator({email,password})

        if(!isValid){
            if(errors.email) throw errors.email;
            else {
                throw errors.password
            }
        }

        let user = await get(email, 'email');
        if (user && await user.verifyPassword(password)) {
 
            let tokenObj = {
              userId: user._id,
            //   fistName:user.firstName ,
            //   lastName:user.lastName,
              salt: user.salt,
              isAdmin:user._doc.isAdmin
             } // Create JWT Payload
        
             user._doc.accessToken =  await generateJwtToken(tokenObj); //generateJwtToken return token and we will save in tokenObj.accessToken
             
             user.password = null;
             user.salt=null
             return handleResponse({ res, data: user });
          } else {
            return res.status(400).json({msg:"Password incorrect" });
          }
        
    } catch (err) {
        handleError({res,err})
    }
}


exports.registerUser=async({body:{firstName,lastName,email,password}},res)=>{
    try {
        const { errors, isValid } = registerValidator({email,password}); //here we pulled out errors and isValid from validateRegisterInput() this function where re.body include everything that sent to its routes in this case name,email,mobile and password
        // Check Validation
        if (!isValid) {
            //if isValid is not empty its mean errors object has got some errors so in this case it will redirect to the register
            return res.status(400).json(errors);
        }
        let isUserExist = await isUserExists(email,"email")

        if(isUserExist)return res.status(400).json({msg:"user email is already registered !!"})
        else{
            const newUser={
                // firstName:firstName,
                // lastName:lastName,
                email:email,
                password:password
            }

            let user = await save(newUser);
            
            let tokenObj = {
                userId: user._id,
                salt: user.salt,
                isAdmin:user._doc.isAdmin
                // firstName:firstName,
                // lastName:lastName,
            }
            user.password = null; //for sending res we set password to null just for security reason
            user.salt=null
            user._doc.accessToken = await generateJwtToken(tokenObj);
            return handleResponse({ res, data: user })
        }

        handleResponse(res,data)
    } catch (err) {
        handleError({res,err})
    }
}


exports.socialLogin=async({body:{firstName,lastName,email,photoUrl}},res)=>{
    try {
        if (!email) throw 'Please provide an email';
        
        let user=await isUserExists(email,"email");

        if(user){
            user = await get(email, 'email');
            let tokenObj = {
                userId: user._id,
                // fistName:user.firstName ,
                // lastName:user.lastName,
                salt: user.salt
               } // Create JWT Payload
          
               user._doc.accessToken =  await generateJwtToken(tokenObj); //generateJwtToken return token and we will save in tokenObj.accessToken
               user.salt=null
               user.password = null;
        }else{
            const newUser={
                firstName:firstName,
                lastName:lastName,
                email:email,
                photoUrl:photoUrl,
                password:"abcdABCD@$%123"
            }

            user = await save(newUser);
            
            let tokenObj = {
                userId: user._id,
                salt: user.salt,
                isAdmin:user._doc.isAdmin
                // firstName:firstName,
                // lastName:lastName,
            }
            user.salt=null;
            user.password = null; //for sending res we set password to null just for security reason
            user._doc.accessToken = await generateJwtToken(tokenObj);
             
        }
        handleResponse({ res, data: user })
        
    } catch (err) {
        handleError({res,err})
    }
}


exports.forgotPassword=async({body:{email,password,otp}},res)=>{
    try {
        if(!email) throw 'please provide an email';
        if(!password) throw 'Please provide a password';
        //if(!otp) throw 'Please provide an otp';
        let user=await get(email,"email")
        if(!user) throw 'User with email does not exist';
        else{
            // let isOtpValid=validateOtp(otp,user)
            // if(!isOtpValid) throw 'Otp expired'
            let result=await updateUser(user._id,{password,forgotPasswordInfo:{}})
            result.password=null;
            result.salt=null;
            handleResponse({res,data:result})
        }
        
    } catch (err) {
        handleError({res,err})
    }
}

exports.sendVerificationOtp=async({body:{email}},res)=>{
    try {
         if(!email) throw 'Please provide an email';

         let user=await get(email,"email")

         if(!user)throw 'User with this email does not exist'

         else{
             let otp=await generateRandomOtp(7)

             let forgotPasswordInfo={
                 otp,
                 otpExpiry:generateOtpExpiry()
             }
             await updateUser(user._id,{forgotPasswordInfo})
            //  await emailService({email,subject:VERIFICATION_OTP,otp})
             handleResponse({res,data:'Otp send to registered email.'})
         }
         
    } catch (err) {
        handleError({res,err})
    }
}

exports.updateUserInfo=async({body:{architectFirm,architectName,contactNumber},params:{id}},res)=>{
    try{
        let result=await updateUser(id,{architectFirm,architectName,contactNumber,isProfileCompleted:true})
        handleResponse({res,data:result})
    }catch(err){
        handleError({res,err})
    }
}

exports.getUserDetails=async({params:{id}},res)=>{
    try {
        let result=await get(id)
        handleResponse({res,data:result})
    } catch (err) {
        handleError({res,err})
    }
}

exports.resetPassword=async({body:{email,password}},res)=>{
    try{
        let result=await resetPassword(email,password)
        result.password=null;
        result.salt=null;
        handleResponse({res,data:result})
    }catch(err){
        handleError({res,err})
    }
}

const validateOtp=(otp,user)=>{
    try {
        let currentDate=new Date();
        let otpExpiryDate=user.forgotPasswordInfo.otpExpiry
        if(!(user.forgotPasswordInfo.otp===otp))throw 'incorrect otp';
        if(otpExpiryDate<currentDate) return false;
        return true;

    } catch (err) {
        throw err;
    }
}