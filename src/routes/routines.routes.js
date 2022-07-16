'use strict'

const routineController = require('../controllers/routines.controller');
const express =  require('express');
const mdAuth = require('../services/authenticated');
const api = express.Router();

api.post('/newRoutine',[mdAuth.ensureAuth], routineController.newRoutine);
api.put('/updateRoutine/:id',[mdAuth.ensureAuth], routineController.updateRoutine);
api.delete('/deleteRoutine/:id',[mdAuth.ensureAuth], routineController.deleteRoutine);
api.get('/getRoutine/:id',[mdAuth.ensureAuth], routineController.getRoutine);
api.get('/getRoutines',[mdAuth.ensureAuth], routineController.getRoutines);


module.exports = api;