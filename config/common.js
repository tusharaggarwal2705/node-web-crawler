// const moment=require('moment')
const {verificationOtpValidity}=require('../config/config')

// exports.generateOtpExpiry = () => {
//     return moment().add(verificationOtpValidity, 'm')._d;
// }

exports.generateRandomOtp=(length)=>{
    try {
     length = length ? length : 8; // By default generates 6 digit Otp
 
     var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", otp = "";
     for (var i = length; i > 0; --i)
         otp += chars[Math.floor(Math.random() * chars.length)];
     return otp;       
    } catch (error) {
        throw error;
    }
 }

 exports.convertDate=()=>{
     let currentDate=new Date();
     return `${currentDate.getDate()}${currentDate.getDay()}${currentDate.getMonth()}${currentDate.getFullYear()}${currentDate.getHours()}${currentDate.getMinutes()}${currentDate.getSeconds()}`
 }