'use strict'

const User = require('../models/user.model');
const Routine = require('../models/routines.model');
const {validateData, alreadyRoutine, checkUpdateRoutine, alreadyRoutineUpdated} = require('../utils/validate');

exports.newRoutine = async(req,res)=>{
    try{
        const params = req.body;
        const data ={
            name: params.name,
            week: params.week,
            day: params.day,
            description: params.description,
            dificultyLevel: params.dificultyLevel,
            priority: params.priority,
            time: params.time,
            complete: false,
            client: params.client
        };

        if(data.priority <1)
        return res.status(400).send({message: 'The range of priority is 1-10'})

        if(data.priority >10)
        return res.status(400).send({message: 'The range of priority is 1-10'})

        const msg = validateData(data);
        if(msg) return res.status(400).send(msg);

        const check = await User.findOne({_id: data.client});
        if(check === null || check._id != data.client)
        return res.send({message: 'User not found'})
        console.log(check)

        const routineAlready = await Routine.findOne({$and:[{name: data.name},{client: data.client}]});
        if(routineAlready) return res.send({message: 'The CLIENT already had his routine for this day'});
        const routine = new Routine(data);
        await routine.save();
        return res.send({message: 'Routine saved successfully', routine})

    }catch(err){
        console.log(err)
        return err;
    }
}

exports.updateRoutine = async(req,res)=>{
    try{
        const routineId = req.params.id;
        const params = req.body;


        const data={
            priority: params.priority
        }

        if(data.priority <1)
        return res.status(400).send({message: 'The range of priority is 1-10'})

        if(data.priority >10)
        return res.status(400).send({message: 'The range of priority is 1-10'})

        const routineExist = await Routine.findOne({_id: routineId});
        if(!routineExist) return res.send({message: 'Routine not found'});

        const routineUpdate = await checkUpdateRoutine(params);
        if(!routineUpdate) return res.status(400).send({message: 'Invalid params'});
        await Routine.findOneAndUpdate({_id: routineId},params);
        return res.send({message: 'Routine updated successfully'});
    }catch(err){
        console.log(err)
        return err;
    }
}

exports.deleteRoutine = async(req,res)=>{
    try{
        const routineId = req.params.id;

        const routineExist = await Routine.findOne({_id: routineId});
        if(!routineExist) return res.send({message: 'Routine not found'});

         const deleteRoutine = await Routine.findOneAndDelete({_id: routineId});
         if(!deleteRoutine)return res.status(4000).send({message: 'Routine not deleted'});
         return res.send({message: 'Routine', deleteRoutine});

    }catch(err){
        console.log(err)
        return err;
    }
}

exports.getRoutine = async(req,res)=>{

    try{
        const routineId = req.params.id;

        const routine = await Routine.findOne({_id: routineId});
        if(!routine) return res.send({message: 'Routine not found'});
        return res.send({message: 'Routine found', routine})
    }catch(err){
        console.log(err)
        return err;
    }
}

exports.getRoutines = async(req,res)=>{
    try{
        const routines = await Routine.find().populate('client')
        return res.send({message: 'Routines founds', routines})
    }catch(err){
        console.log(err)
        return err;
    }
}