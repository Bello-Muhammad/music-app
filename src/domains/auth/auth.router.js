const express = require('express');
const { login, register } = require('./auth.controller');

const AuthRouter = express.Router();

AuthRouter.post('/register', register);
AuthRouter.post('/login', login);

module.exports = AuthRouter;