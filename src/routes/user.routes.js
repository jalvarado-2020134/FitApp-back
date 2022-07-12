'use strict'

const express = require('express');
const api = express.Router();
const mdAuth = require('../services/authenticated');
const userController = require('../controllers/user.controller')

api.post('/login', userController.login);
api.post('/register', userController.register);
api.put('/update/:id', mdAuth.ensureAuth, userController.update);
api.delete('/delete/:id', mdAuth.ensureAuth, userController.delete);

module.exports = api;