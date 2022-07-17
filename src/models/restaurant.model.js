'use strict'

const mongoose = require('mongoose')

const restaurantSchema = mongoose.Schema({

    name: String,
    description: String,
    address: String,
    specialty: String,
    calification: Number,
    open: String,
    close: String,
    phone: String,
    calificationUser: Boolean,
})

module.exports = mongoose.model('Restaurant', restaurantSchema)