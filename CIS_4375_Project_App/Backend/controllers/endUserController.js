'use strict';

const endUserData = require('../data/endusers');

const getAllEndUsers= async (req, res, next) => {
    try {

        const endUsersList = await endUserData.getEndUsers();
        res.send(endUsersList);        
        console.log(endUsersList)
    } catch (error) {
        res.status(400).send(error.message);
    }
}



const getEndUser = async (req, res, next) => {
    try {
        const END_USER_ID = req.params.id;
        const enduser = await endUserData.getById(END_USER_ID);
        res.send(enduser);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addEndUser = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await endUserData.createEndUser(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateEndUser = async (req, res, next) => {
    try {
        const END_USER_ID =  req.params.id;
        const data = req.body;
        const updated = await endUserData.updateEndUser(END_USER_ID, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

/** */
const deleteEndUser = async (req, res, next) => {
    try {
        const END_USER_ID = req.params.id;
        const deleteEndUser = await endUserData.deleteEndUser(END_USER_ID);
        res.send(deleteEndUser);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllEndUsers,
    getEndUser,
    addEndUser,
    updateEndUser,
    deleteEndUser
}