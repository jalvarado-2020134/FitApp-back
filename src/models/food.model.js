'use strict'

const mongoose = require('mongoose')

const foodSchema = mongoose.Schema({
    name: String,
    week: String,
    day: String,
    breakfast: String,
    snack: String,
    lunch: String,
    dinner: String,
    aproxPrice: String,
    client: {type: mongoose.Schema.ObjectId, ref: 'User'},


    
})

module.exports = mongoose.model('Food',foodSchema)