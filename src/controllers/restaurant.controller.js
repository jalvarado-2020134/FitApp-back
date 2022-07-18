'use strict'

const User = require('../models/user.model')
const Restaurant = require('../models/restaurant.model');
const {validateData, alreadyUser, checkUpdateRoutine} = require('../utils/validate');

exports.saveRestaurant = async(req,res)=>{
    try{
        const params = req.body;
        const data ={
            name: params.name,
            description: params.description,
            address: params.address,
            speciality: params.speciality,
            open: params.open,
            close: params.close,
            phone: params.phone,
            calification: params.calification,
            client: params.client
        };

        const msg = validateData(data);
        if(msg) return res.status(400).send(msg);
        const restaurantExist = await alreadyUser(params.name);
        if(restaurantExist) return res.send({message: 'Restaurant already recommended'});

        data.calificationUser = params.calificationUser;

        const restaurant = new Restaurant(data);
        await restaurant.save();
        return res.send({message: 'Restaurant saved successfully', restaurant})
    }catch(err){
        console.log(err)
        return err;
    }
}

exports.updateRestaurant = async(req,res)=>{
    try{
        const restaurantId = req.params.id;
        const params = req.body;

        const restaurantExist = await Restaurant.findOne({_id: restaurantId});
        if(!restaurantExist) return res.send({message: 'Restaurant not found'});

        const validateUpdate = await checkUpdateRoutine(params);
        if(validateUpdate === false) return res.status(400).send({message: 'Invalid params'});

        const restaurantUpdate = await Restaurant.findOneAndUpdate({_id: restaurantId}, params,{new:true});
        if(!restaurantUpdate) return res.send({message: 'Restaurant not updated'});
        return res.send({message: 'Restaurant updated successfully', restaurantUpdate});
    }catch(err){
        console.log(err)
        return err;
    }
}

exports.deleteRestaurant = async(req,res)=>{
    try{
        const restaurantId = req.params.id;

        const restaurantExist = await Restaurant.findOne({_id: restaurantId});
        if(!restaurantExist) return res.send({message: 'Restaurant not found'});

        const deleteRestaurant = await Restaurant.findOneAndDelete({_id: restaurantId});
        if(!restaurantId) return res.status(400).send({message: 'Restaurant not deleted'});
        return res.send({message: 'Restaurant', deleteRestaurant});
    }catch(err){
        console.log(err)
        return err;
    }
}

exports.getRestaurant = async(req,res)=>{
    try{
        const restaurantId = req.params.id;
        const restaurant = await Restaurant.findOne({_id: restaurantId});
        if(!restaurant) return res.send({message: 'Restaurant not found'});
        return res.send({message: 'Restaurant found', restaurant})
    }catch(err){
        console.log(err)
        return err;
    }
}

exports.getRestaurants = async(req,res)=>{
    try{
        const restaurants = await Restaurant.find().populate('client')
        return res.send({message: 'Restaurant found', restaurants});
    }catch(err){
        console.log(err)
        return err;
    }
}