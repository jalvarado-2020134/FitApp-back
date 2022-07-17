'use strict'

const express = require('express');
const mdAuth = require('../services/authenticated');
const api = express.Router();
const restaurantController = require('../controllers/restaurant.controller');

api.post('/newRestaurant',[mdAuth.ensureAuth],restaurantController.saveRestaurant);
api.put('/updateRestaurant/:id',[mdAuth.ensureAuth], restaurantController.updateRestaurant);
api.delete('/deleteRestaurant/:id',[mdAuth.ensureAuth],restaurantController.deleteRestaurant);
api.get('/getRestaurant/:id',[mdAuth.ensureAuth], restaurantController.getRestaurant);
api.get('/getRestaurants',[mdAuth.ensureAuth],restaurantController.getRestaurants);

module.exports = api;