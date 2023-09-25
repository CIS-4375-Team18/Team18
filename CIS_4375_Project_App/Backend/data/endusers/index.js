'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getEndUsers = async () => {

    try {
        let pool = await sql.connect(config.sql);
        const getAllQuery = "SELECT [END_USER_ID] ,[END_USER_FIRST_NAME],[END_USER_LAST_NAME] "+
        " ,[END_USER_EMAIL] ,[END_USER_PRIMARY_PHONE]  ,[END_USER_CLASS]  FROM [dbo].[END_USER]";
        const endUsersList = await pool.request().query(getAllQuery);
        return endUsersList.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

const getById = async (END_USER_ID) => {
    try {
        let pool = await sql.connect(config.sql);
        const byIdQuery = "SELECT [END_USER_ID] ,[END_USER_FIRST_NAME],[END_USER_LAST_NAME] "+
        " ,[END_USER_EMAIL] ,[END_USER_PRIMARY_PHONE]  ,[END_USER_CLASS]  FROM [dbo].[END_USER] WHERE END_USER_ID=@END_USER_ID";
        const enduser = await pool.request()
            .input('END_USER_ID', sql.Int, END_USER_ID)
            .query(byIdQuery);
        return enduser.recordset;
    } catch (error) {
        return error.message;
    }
}

const createEndUser = async (endUserData) => {
    try {
        let pool = await sql.connect(config.sql);
        const createQuery = "INSERT INTO [dbo].[END_USER] ([END_USER_FIRST_NAME] "+
        " ,[END_USER_LAST_NAME]  ,[END_USER_EMAIL] ,[END_USER_PRIMARY_PHONE] "+
        ",[END_USER_CLASS]) VALUES (@END_USER_FIRST_NAME, @END_USER_LAST_NAME "+
        ",@END_USER_EMAIL, @END_USER_PRIMARY_PHONE, @END_USER_CLASS)"

        const insertEndUser = await pool.request()
            .input('END_USER_FIRST_NAME', sql.NVarChar(40), endUserData.END_USER_FIRST_NAME)
            .input('END_USER_LAST_NAME', sql.NVarChar(40), endUserData.END_USER_LAST_NAME)
            .input('END_USER_EMAIL', sql.NVarChar(40), endUserData.END_USER_EMAIL)
            .input('END_USER_PRIMARY_PHONE', sql.NVarChar(40), endUserData.END_USER_PRIMARY_PHONE)
            .input('END_USER_CLASS', sql.NVarChar(40), endUserData.END_USER_CLASS)
            .query(createQuery);
        return insertEndUser.recordset;
    } catch (error) {
        return error.message;
    }
}

const endUserLogin = async (userEmail, userPassword) => {
    try {
        let pool = await sql.connect(config.sql);
        const loginQuery = "SELECT EXISTS (SELECT * FROM [dbo].[END_USER] WHERE"+
            "END_USER_EMAIL=@userEmail and END_USER_PASSWORD=@userPassword)"

        const loginUser = await pool.request()
            .input('END_USER_EMAIL', sql.NVarChar(40), userEmail.END_USER_EMAIL)
            .input('END_USER_PASSWORD', sql.NVarChar(255), userPassword.END_USER_PASSWORD)
            .query(loginQuery);
        return loginUser.recordset;
    } catch (error) {
        return error.message
    }
}

const updateEndUser = async (END_USER_ID, data) => {
    try {
        let pool = await sql.connect(config.sql);
        const updateQuery = "UPDATE [dbo].[END_USER] SET [END_USER_FIRST_NAME] = @END_USER_FIRST_NAME, "+
        " [END_USER_LAST_NAME] = @END_USER_LAST_NAME, "+
        " [END_USER_EMAIL] = @END_USER_EMAIL, "+
        " [END_USER_PRIMARY_PHONE] = @END_USER_PRIMARY_PHONE, "+
        " [END_USER_CLASS] = @END_USER_CLASS  WHERE END_USER_ID = @END_USER_ID"
        const update = await pool.request()
            .input('END_USER_ID', sql.Int, END_USER_ID)
            .input('END_USER_FIRST_NAME', sql.NVarChar(40), data.END_USER_FIRST_NAME)
            .input('END_USER_LAST_NAME', sql.NVarChar(40), data.END_USER_LAST_NAME)
            .input('END_USER_EMAIL', sql.NVarChar(40), data.END_USER_EMAIL)
            .input('END_USER_PRIMARY_PHONE', sql.NVarChar(40), data.END_USER_PRIMARY_PHONE)
            .input('END_USER_CLASS', sql.NVarChar(40), data.END_USER_CLASS)
            .query(updateQuery);
        return update.recordset;
    } catch (error) {
        return error.message;
    }
}

const deleteEndUser = async (END_USER_ID) => {
    try {
        let pool = await sql.connect(config.sql);
        const deleteQuery = "DELETE FROM [END_USER] WHERE [END_USER_ID]=@END_USER_ID"
        const deleteEndUser = await pool.request()
            .input('END_USER_ID', sql.Int, END_USER_ID)
            .query(deleteQuery);
        return deleteEndUser.recordset;
    } catch (error) {
        return error.message;
    }
}


module.exports = {
    getEndUsers,
    getById,
    createEndUser,
    updateEndUser,
   
    deleteEndUser
}