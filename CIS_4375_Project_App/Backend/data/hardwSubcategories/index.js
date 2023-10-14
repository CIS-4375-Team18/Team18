'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');


const GetAll = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const selectAllQ = "SELECT [HARDW_SUB_CATEGORY_ID] " +
        " ,[HARDW_SUB_CATEGORY_DESC] ,[ACTIVE_STATUS_ID] FROM [dbo].[HARDW_SUB_CATEGORY]"
        const hardwCatList = await pool.request().query(selectAllQ);
        return hardwCatList.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

const GetActive = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const selectActiveQ = "SELECT dbo.HARDW_SUB_CATEGORY.HARDW_SUB_CATEGORY_ID, dbo.HARDW_SUB_CATEGORY.HARDW_SUB_CATEGORY_DESC, dbo.ACTIVE_STATUS.ACTIVE_STATUS_DESC "+
        " FROM dbo.ACTIVE_STATUS INNER JOIN dbo.HARDW_SUB_CATEGORY ON dbo.ACTIVE_STATUS.ACTIVE_STATUS_ID = dbo.HARDW_SUB_CATEGORY.ACTIVE_STATUS_ID " +
         " WHERE ACTIVE_STATUS.ACTIVE_STATUS_DESC = 'ACTIVE'"
        const activeHardwList = await pool.request().query(selectActiveQ);
        return activeHardwList.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

const getById = async(HARDW_SUB_CATEGORY_ID) => {
    try {
        let pool = await sql.connect(config.sql);
        const selectById = "SELECT [HARDW_SUB_CATEGORY_ID] " +
        " ,[HARDW_SUB_CATEGORY_DESC] ,[ACTIVE_STATUS_ID] FROM [dbo].[HARDW_SUB_CATEGORY]" +
        " WHERE HARDW_SUB_CATEGORY_ID = @HARDW_SUB_CATEGORY_ID"
        const hardwCatList = await pool.request()
                            .input('HARDW_SUB_CATEGORY_ID', sql.Int, HARDW_SUB_CATEGORY_ID)
                            .query(selectById);
        return hardwCatList.recordset;
    } catch (error) {
        return error.message;
    }
}

const insertNew = async (hardwSubCatData) => {
    try {
        let pool = await sql.connect(config.sql);
        const insertQ = "INSERT INTO [dbo].[HARDW_SUB_CATEGORY] "+
        " ([HARDW_SUB_CATEGORY_DESC]  ,[ACTIVE_STATUS_ID]) VALUES "+
        " (@HARDW_SUB_CATEGORY_DESC, @ACTIVE_STATUS_ID)"
        const insertSubCat = await pool.request()
                            .input('HARDW_SUB_CATEGORY_DESC', sql.NVarChar(30), hardwSubCatData.HARDW_SUB_CATEGORY_DESC)
                            .input('ACTIVE_STATUS_ID', sql.SmallInt, hardwSubCatData.ACTIVE_STATUS_ID)
                            .query(insertQ);                            
        return insertSubCat.recordset;
    } catch (error) {
        return error.message;
    }
}

const update = async (HARDW_SUB_CATEGORY_ID, data) => {
    try {
        let pool = await sql.connect(config.sql);
        const updateQ = "UPDATE [dbo].[HARDW_SUB_CATEGORY] "
        +" SET [HARDW_SUB_CATEGORY_DESC] = @HARDW_SUB_CATEGORY_DESC, [ACTIVE_STATUS_ID] = @ACTIVE_STATUS_ID "+
        "  WHERE HARDW_SUB_CATEGORY_ID = @HARDW_SUB_CATEGORY_ID";
     
        const update = await pool.request()
            .input('HARDW_SUB_CATEGORY_ID', sql.Int, HARDW_SUB_CATEGORY_ID)
            .input('HARDW_SUB_CATEGORY_DESC', sql.NVarChar(15), data.HARDW_SUB_CATEGORY_DESC)
            .input('ACTIVE_STATUS_ID', sql.SmallInt, data.ACTIVE_STATUS_ID)
            .query(updateQ);
        return update.recordset;
    } catch (error) {
        return error.message;
    }
}

const del = async (HARDW_SUB_CATEGORY_ID) => {
    try {
        let pool = await sql.connect(config.sql);
        const delQ = "DELETE FROM HARDW_SUB_CATEGORY WHERE HARDW_SUB_CATEGORY_ID = @HARDW_SUB_CATEGORY_ID"

        const delReq = await pool.request()
                        .input('HARDW_SUB_CATEGORY_ID', sql.Int, HARDW_SUB_CATEGORY_ID)
                            .query(delQ);
        return delReq.recordset;
    } catch (error) {
        return error.message;
    }
}


module.exports = {
   GetAll,
   GetActive,
   getById,
   update,
   insertNew,
   del
}