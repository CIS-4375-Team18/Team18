'use strict';

const express = require('express');
const endUserCont = require('../controllers/endUserController');
const router = express.Router();
router.get('/endusers',endUserCont.getAllEndUsers);
router.get('/enduser/:id', endUserCont.getEndUser);
router.post('/enduser', endUserCont.addEndUser);
router.put('/enduser/:id', endUserCont.updateEndUser);
router.delete('/enduser/:id', endUserCont.deleteEndUser);


module.exports = {
    routes: router
}