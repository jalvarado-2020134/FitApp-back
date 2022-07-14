'use strict'

const mongoose = require('mongoose')

const foodSchema = mongoose.Schema({
    week: String,
    day: String,
    breakfast: String,
    snack: String,
    lunch: String,
    dinner: String,
    client: {type: mongoose.Schema.ObjectId, ref: 'User'},


    
})

module.exports = mongoose.model('Food',foodSchema)