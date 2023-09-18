'use strict';

const activeStatusData = require('../data/activeStatusses');

const getAllActiveStatusses= async (req, res, next) => {
    try {

        const activeStatusList = await activeStatusData.getAll();
        res.send(activeStatusList);        
        console.log(activeStatusList)
    } catch (error) {
        res.status(400).send(error.message);
    }
}



const getSingleActiveStatus = async (req, res, next) => {
    try {
        const ACTIVE_STATUS_ID = req.params.id;
        const activestatus = await activeStatusData.getById(ACTIVE_STATUS_ID);
        res.send(activestatus);
    } catch (error) {
        res.status(400).send(error.message);
    }
}



module.exports = {
  getAllActiveStatusses,
  getSingleActiveStatus
}