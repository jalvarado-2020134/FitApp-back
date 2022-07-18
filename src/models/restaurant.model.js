'use strict'

const mongoose = require('mongoose')

const restaurantSchema = mongoose.Schema({

    name: String,
    description: String,
    address: String,
    speciality: String,
    calification: Number,
    open: String,
    close: String,
    phone: String,
    calificationUser: Boolean,
    client: {type: mongoose.Schema.ObjectId, ref: 'User'},
})

module.exports = mongoose.model('Restaurant', restaurantSchema)