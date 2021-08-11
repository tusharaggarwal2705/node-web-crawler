// const mongoose=require('mongoose')
// const db=require('../connection/dbMaster')
// const bcrypt=require('bcryptjs')
// const config = require('../config/config')
// const defSchemaAttr = require('../common/plugins/defSchemaAttr')



// const UserSchema=new mongoose.Schema({
//     email:{
//         type: String,
//         unique: true,
//         index: true,
//         validate: [
//             function (email) {
//                 let emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
//                 return emailRegex.test(email);
//             },
//             'The e-mail is invalid.'
//         ],
//         trim: true,
//         lowercase: true,
//         required: true,
//         set: function (v) {
//             return `${v}`.toLowerCase()
//         }
//     },
//     password:{
//         type: String,
//         required: true,
//         minlength: 8,
//         // validate: [
//         //     function (password) {
//         //         let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
//         //         return passwordRegex.test(password);
//         //     },
//         //     'Password should be alphanumeric.'
//         // ],
//     },
//     // salt: {
//     //     type: String,
//     //     default: ""
//     // }

//     userId:String,
//     firstName:String,
//     lastName:String,
//     address:{
//         state:String,
//         city:String,
//         country:String,
//         line1:String,
//         line2:String,
//         pinCode:Number
//     },
//     clients:[{type:mongoose.Schema.Types.ObjectId}],
//     accessPriviliges:[{type:String}],
//     contactNumber:Number,
//     dateOfBirth:Date,
//     role:{
//       type:String,
//       enum:['Super Admin','Account Manager','Admin','User']
//     },
//     designation:String,
//     forgotPasswordInfo:{
//         otp:String,
//         otpExpiry:Date
//     },
// })

// UserSchema.pre("save",function(callback){
//     // let user=this
//     // generatePasswordHash(user,callback)
//     this.salt=bcrypt.genSaltSync(20),
//     this.password=bcrypt.hashSync(this.password,10)
//     callback();
//   })

// UserSchema.pre("findOneAndUpdate",function(callback){
//     let updateObj=this._update.$set
//     if(updateObj && updateObj.password){
//         updateObj.salt=bcrypt.genSaltSync(20),
//         updateObj.password=bcrypt.hashSync(updateObj.password,10)
//     }
//     callback();
// })  
  
// UserSchema.methods.verifyPassword=async function(password){
//     return await bcrypt.compare(password,this.password)
//   }

// UserSchema.plugin(defSchemaAttr)

// module.exports=db.model('User', UserSchema)