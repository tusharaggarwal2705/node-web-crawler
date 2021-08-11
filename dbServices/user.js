const User=require('../models/userModel');


exports.get = (idOrEmail, fieldName = "_id") => User.findOne({ [fieldName]: idOrEmail + "" });

exports.isUserExists = (idOrEmail, fieldName = "_id") => User.countDocuments({ [fieldName]: idOrEmail });

exports.save=async(data)=>new User(data).save();

exports.updateUser=async(userId,updateObj)=>{
    try {
        let result=await User.findByIdAndUpdate(
            userId,
            {
                $set:updateObj
                
            },
            {
                new:true
            }
            )
        return result;
    } catch (err) {
        throw err;
    }
}

exports.resetPassword=async(email,password)=>{
    try {
        let result=await User.findOneAndUpdate({email:email},{$set:{password:password}},{new:true})
        return result;
    } catch (err) {
        throw err;
    }
}

exports.getList=async()=>{
    try {
        return await User.find({isDeleted:false}).lean(true);
    } catch (err) {
        throw err;
    }
}