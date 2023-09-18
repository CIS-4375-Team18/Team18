'use strict';

const express = require('express');
const activeStatusCtr = require('../controllers/activeStatusController');
const router = express.Router();
router.get('/activestatusses',activeStatusCtr.getAllActiveStatusses);
router.get('/activestatus/:id',activeStatusCtr.getSingleActiveStatus);



module.exports = {
    routes: router
}