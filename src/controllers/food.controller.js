'use strict'

const User =require('../models/user.model');
const Food = require('../models/food.model');
const {validateData, alreadyFood, checkUpdate, alreadyFoodUpdated}=require('../utils/validate');

exports.newFood = async(req,res)=>{
    try{
        const params = req.body;
        const data = {
            name: params.name,
            week: params.week,
            day: params.day,
            breakfast: params.breakfast,
            snack: params.snack,
            lunch: params.lunch,
            dinner: params.dinner,
            aproxPrice: params.aproxPrice,
            client: params.client
        };

        const msg = validateData(data);
        if(!msg){
            let foodExist = await alreadyFood(data.client, data.name);
            if(foodExist) return res.status(400).send({message: 'Food already exist'});
            const check = await User.findOne({_id: data.client});
            if(check === null || check._id != data.client)
            return res.send({message: 'User not found'})
            console.log(check);

            const foodAlready = await Food.findOne({$and:[{name:data.name},{client: data.client}]});
            if(foodAlready) return res.send({message: 'Food exists'});
            const food = new Food(data);
            await food.save();
            return res.send({message: 'Food saved successfully', food})
        }else return res.status(400).send(msg);
    }catch(err){
        console.log(err)
        return err;
    }
}

exports.updateFood = async(req,res)=>{
    try{
        const foodId = req.params.id;
        const params = req.body;

        const foodExist = await Food.findOne({_id: foodId});
        if(!foodExist) return res.send({message: 'Food not found'});

        const validateUpdate = await checkUpdate(params);
        if(validateUpdate === false) return res.status(400).send({message: 'Invalid params'});

        const foodUpdate = await Food.findOneAndUpdate({_id: foodId}, params,{new:true});
        if(!foodUpdate) return res.send({message: 'Food not updated'});
        return res.send({message: 'Food updated successfully', foodUpdate});

    }catch(err){
        console.log(err)
        return err;
    }
}

exports.deleteFood = async(req,res)=>{
    try{
        const foodId = req.params.id;

        const foodExist = await Food.findOne({_id: foodId});
        if(!foodExist) return res.send({message: 'Food not found'});

        const deleteFood = await Food.findOneAndDelete({_id: foodId});
        if(!deleteFood) return res.status(400).send({message: 'Food not deleted'});
        return res.send({message: 'Food', deleteFood});

    }catch(err){
        console.log(err)
        return err;
    }
}

exports.getFood = async(req,res)=>{
    try{
        const foodId = req.params.id;
        const food = await Food.findOne({_id: foodId});
        if(!food) return res.send({message: 'Food not found'});
        return res.send({message: 'Food found', food})
    }catch(err){
        console.log(err)
        return err;
    }
}

exports.getFoods = async(req,res)=>{
    try{
        const foods = await Food.find().populate('client')
        return res.send({message: 'Foods found', foods});
    }catch(err){
        console.log(err)
        return err;
    }
}

exports.foodByWeek = async(req,res)=>{
    try{
        const params = req.body;
        const data={
            week: params.week
        };

        const msg = validateData(data);
        if(msg)return res.status(400).send(msg);
        const foods = await Food.find({week:{$regex: params.week, $options: 'i'}}).lean();
        return res.send({message: 'Foods found', foods});
    }catch(err){
        console.log(err)
        return err;
    }
}