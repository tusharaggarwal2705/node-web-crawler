const { handleError, handleResponse } = require("../../utils/requestHandlers")
const { save,getList, updateUser,get }=require('../../dbServices/user');

// const { sendEmail } = require("../../services/emailService");
const { generateRandomOtp } = require("../../config/common");
exports.createUser=async({body},res)=>{
    try {
        // body['password']='Password2@'
        body['password']=generateRandomOtp(8);
        // await sendEmail(body.email,body.password)
        let result=await save(body)
        handleResponse({res,data:result})
    } catch (err) {
        handleError({err,res})
    }
}

exports.getUsersList=async(req,res)=>{
    try {
        let result=await getList();
        handleResponse({res,data:result})
    } catch (err) {
        handleError({err,res})
    }
}

exports.updateUserDetail=async({body,params:{id}},res)=>{
    try {
        let result=await updateUser(id,body);
        handleResponse({res,data:result})
    } catch (err) {
        handleError({err,res})
    }
}

exports.deleteUser=async({params:{id}},res)=>{
    try {
        let result=await updateUser(id,{isDeleted:true});
        handleResponse({res,data:result})
    } catch (err) {
        handleError({err,res})
    }
}

exports.getUserDetails=async({params:{id}},res)=>{
    try {
        let result=await get(id)
        handleResponse({res,data:result})
    } catch (err) {
        handleError({err,res})
    }
}

