'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const userRoutes = require('../src/routes/user.routes');
const foodRoutes = require('../src/routes/food.routes');
const routineRoutes = require('../src/routes/routines.routes');
const restaurantRoutes = require('../src/routes/restaurant.routes');

const app = express(); //instancia

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use('/user', userRoutes);
app.use('/food', foodRoutes);
app.use('/routine', routineRoutes);
app.use('/restaurant', restaurantRoutes);

module.exports = app;