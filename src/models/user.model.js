'use strict'

const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: String,
    surname: String,
    username: String,
    age: String,
    email: String,
    password: String,
    phone: String,
    height: String,
    weight:String
});

module.exports = mongoose.model('User', userSchema)