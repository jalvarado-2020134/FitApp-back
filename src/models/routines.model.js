'use strict'

const mongoose = require('mongoose');

const routineSchema = mongoose.Schema({

    name: String,
    week: String,
    day: String,
    description: String,
    time: String,
    dificultyLevel: Number,
    priority: Number,
    complete: Boolean,
    client: {type: mongoose.Schema.ObjectId, ref: 'User'},

});

module.exports = mongoose.model('Routine', routineSchema);