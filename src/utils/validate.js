'use strict'

const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user.model');

exports.validateData = (data)=>{
    let keys = Object.keys(data), msg='';

    for(let key of keys){
        if(data[key] !== null && data[key] !== undefined && data[key] !=='')continue;
        msg += `El parámetro ${key} es obligatorio\n`
    }
    return msg.trim();
}

exports.alreadyUser = async (username)=>{
    try{
     let exist = User.findOne({username:username}).lean()
     return exist;
    }catch(err){
        return err;
    }
 }

 exports.encrypt = async (password) => {
     try{
         return bcrypt.hashSync(password);
     }catch(err){
         console.log(err);
         return err;
     }
 }

 exports.checkPassword = async (password, hash)=>{
     try{
         return bcrypt.compareSync(password, hash);
     }catch(err){
         console.log(err);
         return err;
     }
 }

 exports.checkPermission = async (userId, sub)=>{
     try{
         if(userId != sub){
             return false;
         }else{
             return true;
         }
     }catch(err){
         console.log(err);
         return err;
     }
 }

 exports.findUser = async(username)=>{
    try{
        let exist = await User.findOne({username: username}).lean();
        return exist;
    }catch(err){
        console.log(err);
        return err;
    }
}