'use strict';

const bcrypt = require('bcrypt');
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
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.END_USER_PASSWORD, saltRounds);
        data.END_USER_PASSWORD = hashedPassword;
        const insert = await endUserData.createEndUser(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const loginEndUser = async (req, res, next) => {
    try {
        const { END_USER_EMAIL, END_USER_PASSWORD} = req.body;

        const storedHashedPassword = await endUserData.getHashedPassword(END_USER_EMAIL);

        if (!storedHashedPassword) {
            res.status(401).send('User not found')
        }
        const passwordMatch = await bcrypt.compare(END_USER_PASSWORD, storedHashedPassword);

        if (passwordMatch) {
            res.status(200).send('Login Successful')
        } else {
            res.status(401).send('Login Failed')
        }
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
    loginEndUser,
    updateEndUser,
    deleteEndUser
}