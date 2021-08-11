const {handleError}=require('../utils/requestHandlers')

exports.isAuthorizedUser=async({user:{role,clients},query:{clientId}},res,next)=>{
    try {
        
        if(role=='Super Admin' || clients.includes(clientId)){
            next();
        }else{
            throw 'Access denied'
        }
    } catch (err) {
        handleError({err,res,statusCode:401})
    }
}

exports.isSuperAdmin=async({user:{role}},res,next)=>{
    try {
        
        if(role=='Super Admin'){
            next();
        }else{
            throw 'Access denied'
        }
    } catch (err) {
        handleError({err,res,statusCode:401})
    }
}