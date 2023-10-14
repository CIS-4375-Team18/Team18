'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');


const GetAll = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const selectAllQ = "SELECT [SOFTW_SUB_CATEGORY_ID] " +
        " ,[SOFTW_SUB_CATEGORY_DESC] ,[ACTIVE_STATUS_ID] FROM [dbo].[SOFTW_SUB_CATEGORY]"
        const softwCatList = await pool.request().query(selectAllQ);
        return softwCatList.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

const GetActive = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const selectActiveQ = "SELECT dbo.SOFTW_SUB_CATEGORY.SOFTW_SUB_CATEGORY_ID, dbo.SOFTW_SUB_CATEGORY.SOFTW_SUB_CATEGORY_DESC, dbo.ACTIVE_STATUS.ACTIVE_STATUS_DESC "+
        " FROM dbo.ACTIVE_STATUS INNER JOIN dbo.SOFTW_SUB_CATEGORY ON dbo.ACTIVE_STATUS.ACTIVE_STATUS_ID = dbo.SOFTW_SUB_CATEGORY.ACTIVE_STATUS_ID " +
         " WHERE ACTIVE_STATUS.ACTIVE_STATUS_DESC = 'ACTIVE'"
        const activeSoftwList = await pool.request().query(selectActiveQ);
        return activeSOFTWList.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

const getById = async(SOFTW_SUB_CATEGORY_ID) => {
    try {
        let pool = await sql.connect(config.sql);
        const selectById = "SELECT [SOFTW_SUB_CATEGORY_ID] " +
        " ,[SOFTW_SUB_CATEGORY_DESC] ,[ACTIVE_STATUS_ID] FROM [dbo].[SOFTW_SUB_CATEGORY]" +
        " WHERE SOFTW_SUB_CATEGORY_ID = @SOFTW_SUB_CATEGORY_ID"
        const softwCatList = await pool.request()
                            .input('SOFTW_SUB_CATEGORY_ID', sql.Int, SOFTW_SUB_CATEGORY_ID)
                            .query(selectById);
        return softwCatList.recordset;
    } catch (error) {
        return error.message;
    }
}

const insertNew = async (softwSubCatData) => {
    try {
        let pool = await sql.connect(config.sql);
        const insertQ = "INSERT INTO [dbo].[SOFTW_SUB_CATEGORY] "+
        " ([SOFTW_SUB_CATEGORY_DESC]  ,[ACTIVE_STATUS_ID]) VALUES "+
        " (@SOFTW_SUB_CATEGORY_DESC, @ACTIVE_STATUS_ID)"
        const insertSubCat = await pool.request()
                            .input('SOFTW_SUB_CATEGORY_DESC', sql.NVarChar(30), softwSubCatData.SOFTW_SUB_CATEGORY_DESC)
                            .input('ACTIVE_STATUS_ID', sql.SmallInt, softwSubCatData.ACTIVE_STATUS_ID)
                            .query(insertQ);                            
        return insertSubCat.recordset;
    } catch (error) {
        return error.message;
    }
}

const update = async (SOFTW_SUB_CATEGORY_ID, data) => {
    try {
        let pool = await sql.connect(config.sql);
        const updateQ = "UPDATE [dbo].[SOFTW_SUB_CATEGORY] "
        +" SET [SOFTW_SUB_CATEGORY_DESC] = @SOFTW_SUB_CATEGORY_DESC, [ACTIVE_STATUS_ID] = @ACTIVE_STATUS_ID "+
        "  WHERE SOFTW_SUB_CATEGORY_ID = @SOFTW_SUB_CATEGORY_ID";
     
        const update = await pool.request()
            .input('SOFTW_SUB_CATEGORY_ID', sql.Int, SOFTW_SUB_CATEGORY_ID)
            .input('SOFTW_SUB_CATEGORY_DESC', sql.NVarChar(15), data.SOFTW_SUB_CATEGORY_DESC)
            .input('ACTIVE_STATUS_ID', sql.SmallInt, data.ACTIVE_STATUS_ID)
            .query(updateQ);
        return update.recordset;
    } catch (error) {
        return error.message;
    }
}

const del = async (SOFTW_SUB_CATEGORY_ID) => {
    try {
        let pool = await sql.connect(config.sql);
        const delQ = "DELETE FROM SOFTW_SUB_CATEGORY WHERE SOFTW_SUB_CATEGORY_ID = @SOFTW_SUB_CATEGORY_ID"

        const delReq = await pool.request()
                        .input('SOFTW_SUB_CATEGORY_ID', sql.Int, SOFTW_SUB_CATEGORY_ID)
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