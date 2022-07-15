'use strict'

const express = require('express');
const mdAuth = require('../services/authenticated');
const api = express.Router();
const foodController = require('../controllers/food.controller');

api.post('/newFood',[mdAuth.ensureAuth],foodController.newFood);
api.put('/updateFood/:id',[mdAuth.ensureAuth], foodController.updateFood);
api.delete('/deleteFood/:id',[mdAuth.ensureAuth],foodController.deleteFood);
api.get('/getFood/:id',[mdAuth.ensureAuth], foodController.getFood);
api.get('/getFoods',[mdAuth.ensureAuth],foodController.getFoods);
api.post('/searchFood', [mdAuth.ensureAuth], foodController.foodByWeek);

module.exports = api;