'use strict'

const User = require('../models/user.model');
const jwt = require('../services/jwt');
const {validateData, encrypt, alreadyUser, checkPassword, checkUpdate, checkPermission, checkUpdateManager, validateExtension}=require('../utils/validate');


exports.login = async (req,res)=>{
    try{
        const params = req.body;
        let data ={
            username: params.username,
            password: params.password
        }

        let msg = validateData(data);

        if(msg) return res.status(400).send(msg);
        let already = await alreadyUser(params.username);
        if(already && await checkPassword(data.password, already.password)){
            let token = await jwt.createToken(already);
            delete already.password;


            return res.send({message: 'Welcome', already, token});
        }else return res.status(401).send({message: 'Invalid Credentials'});

    }catch(err){
        console.log(err)
        return err;
    }
}

exports.register = async(req,res)=>{
    try{
        const params = req.body;
        let data={
            name: params.name,
            username: params.username,
            email: params.email,
            password: params.password,
            age: params.age,
            role: params.role,
        };

        let msg = validateData(data);
        if(msg)return res.status(400).send(msg);
        let already = await alreadyUser(data.username);
        if(already) return res.status(400).send({message: 'Username already in use'});
        data.surname = params.surname;
        data.phone = params.phone;
        data.age = params.age;
        data.height = params.height;
        data.weight = params.weight;
        data.password = await encrypt(params.password);

        let user = new User(data);
        await user.save();
        return res.send({message: 'User created successfully', user});

    }catch(err){
        console.log(err)
        return err;
    }
}

exports.update = async(req,res)=>{
    try{
        const userId = req.params.id;
        const params = req.body;

        const permission = await checkPermission(userId, req.user.sub);
        if(permission === false) return res.status(401).send({message: 'Youn dont have permission tu update'});

        const userExist = await User.findOne({_id: userId});
        if(!userExist) return res.send({message: 'User not found'});

        const updateCheck = await checkUpdate(params);
        if(updateCheck === false) return res.status(400).send({message: 'Invalid params'});

        let alreadyuser = await alreadyUser(params.username);
        if(alreadyuser && userExist.username != params.username)return res.send({message: 'Username already in use'});

        const userUpdate = await User.findOneAndUpdate({_id: userId}, params,{new:true}).lean();
        if(userUpdate) return res.send({message: 'User update successfully', userUpdate});
        return res.send({message: 'User not updated'});

    }catch(err){
        console.log(err)
        return err;
    }
}

exports.delete = async(req,res)=>{
    try{
        const userId = req.params.id;

        const permission = await checkPermission(userId, req.user.sub);
        if(permission === false) return res.status(403).send({message: 'You dont have permission to delete'});

        const deleteUser = await User.findOneAndDelete({_id: userId});
        if(deleteUser) return res.send({message: 'Your account', deleteUser});
        return res.send({message: 'User not found'})
    }catch(err){
        console.log(err)
        return err;
    }
}