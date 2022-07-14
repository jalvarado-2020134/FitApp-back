'use strict'

const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: String,
    surname: String,
    username: String,
    age: String,
    email: String,
    gender: String,
    password: String,
    phone: String,
    role: String,
    image: String,
    height: String,
    weight:String
});

module.exports = mongoose.model('User', userSchema)