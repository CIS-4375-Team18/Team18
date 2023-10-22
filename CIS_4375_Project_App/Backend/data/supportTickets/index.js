'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');


const GetAllJoinByStatus = async (SUPPORT_TICKET_STATUS) => {
    try {
        let pool = await sql.connect(config.sql);
        const selectAllTicketsQ = "SELECT ST.SUPPORT_TICKET_ID "+
        " ,ST.SUPPORT_TICKET_SUBJECT  "+
        " ,ST.SUPPORT_TICKET_NOTE "+
        " ,ST.DEVICE_MAKE "+
        " ,ST.DEVICE_MODEL "+
        " ,ST.SUPPORT_TICKET_TIMELINE "+
        " ,ST.SUPPORT_TICKET_DATE_CREATED "+
        " ,ST.SUPPORT_TICKET_RESOLUTION_TIME "+
        " ,ST.SUPPORT_TICKET_STATUS_ID "+
        " ,ST.TICKET_CATEGORY_ID "+
        " ,ST.TICKET_SUB_CATEGORY_ID "+
        " ,ST.TICKET_PRIORITY_ID "+
        " ,ST.SUPPORT_AGENT_ID "+
        " ,ST.RESOLUTION_DATE "+
        " ,ST.END_USER_ID "+
        " ,ST.SUPPORT_TICKET_ASSET_TAG "+
        " ,EU.END_USER_FIRST_NAME "+
        " ,EU.END_USER_LAST_NAME "+
        " ,EU.END_USER_EMAIL "+
        " FROM [dbo].[SUPPORT_TICKET] as ST "+
        " JOIN dbo.END_USER as EU ON ST.END_USER_ID = EU.END_USER_ID"
        " WHERE ST.SUPPORT_TICKET_STATUS_ID = @SUPPORT_TICKET_STATUS";
        const supportTicketsList = await pool.request()
                            .input('SUPPORT_TICKET_STATUS', sql.Int, SUPPORT_TICKET_STATUS)
                            .query(selectAllTicketsQ);
        return supportTicketsList.recordset;
    } catch (error) {
        console.log(error.message);
    }
}


const GetAll = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const selectAllTicketsQ = "SELECT [SUPPORT_TICKET_ID] "+
        " ,[SUPPORT_TICKET_SUBJECT]  "+
        " ,[SUPPORT_TICKET_NOTE] "+
        " ,[DEVICE_MAKE] "+
        " ,[DEVICE_MODEL] "+
        " ,[SUPPORT_TICKET_TIMELINE] "+
        " ,[SUPPORT_TICKET_DATE_CREATED] "+
        " ,[SUPPORT_TICKET_RESOLUTION_TIME] "+
        " ,[SUPPORT_TICKET_STATUS_ID] "+
        " ,[TICKET_CATEGORY_ID] "+
        " ,[TICKET_SUB_CATEGORY_ID] "+
        " ,[TICKET_PRIORITY_ID] "+
        " ,[SUPPORT_AGENT_ID] "+
        " ,[RESOLUTION_DATE] "+
        " ,[END_USER_ID] "+
        " ,[SUPPORT_TICKET_ASSET_TAG] "+
        " FROM [dbo].[SUPPORT_TICKET] "
        const supportTicketsList = await pool.request().query(selectAllTicketsQ);
        return supportTicketsList.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

const GetByUserId = async (USER_ID, SUPPORT_TICKET_STATUS) => {
    try {
        let pool = await sql.connect(config.sql);
        const selectAllTicketsQ = "SELECT  [SUPPORT_TICKET_ID] "+
        " ,[SUPPORT_TICKET_SUBJECT]  "+
        " ,[SUPPORT_TICKET_NOTE] "+
        " ,[DEVICE_MAKE] "+
        " ,[DEVICE_MODEL] "+
        " ,[SUPPORT_TICKET_TIMELINE] "+
        " ,[SUPPORT_TICKET_DATE_CREATED] "+
        " ,[SUPPORT_TICKET_RESOLUTION_TIME] "+
        " ,[SUPPORT_TICKET_STATUS_ID] "+
        " ,[TICKET_CATEGORY_ID] "+
        " ,[TICKET_SUB_CATEGORY_ID] "+
        " ,[TICKET_PRIORITY_ID] "+
        " ,[SUPPORT_AGENT_ID] "+
        " ,[RESOLUTION_DATE] "+
        " ,[END_USER_ID] "+
        " ,[SUPPORT_TICKET_ASSET_TAG] "+
        " FROM [dbo].[SUPPORT_TICKET] " + 
        " WHERE END_USER_ID = @USER_ID AND " +
        " [SUPPORT_TICKET_STATUS_ID] = @SUPPORT_TICKET_STATUS";
        const supportTicketsList = await pool.request()
                            .input('USER_ID', sql.Int, USER_ID)
                            .input('SUPPORT_TICKET_STATUS', sql.Int, SUPPORT_TICKET_STATUS)
                            .query(selectAllTicketsQ);
        return supportTicketsList.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

const GetAssignedByUserId = async (USER_ID) => {
    try {
        let pool = await sql.connect(config.sql);
        const selectAllTicketsQ = "SELECT ST.SUPPORT_TICKET_ID "+
        " ,ST.SUPPORT_TICKET_SUBJECT  "+
        " ,ST.SUPPORT_TICKET_NOTE "+
        " ,ST.DEVICE_MAKE "+
        " ,ST.DEVICE_MODEL "+
        " ,ST.SUPPORT_TICKET_TIMELINE "+
        " ,ST.SUPPORT_TICKET_DATE_CREATED "+
        " ,ST.SUPPORT_TICKET_RESOLUTION_TIME "+
        " ,ST.SUPPORT_TICKET_STATUS_ID "+
        " ,ST.TICKET_CATEGORY_ID "+
        " ,ST.TICKET_SUB_CATEGORY_ID "+
        " ,ST.TICKET_PRIORITY_ID "+
        " ,ST.SUPPORT_AGENT_ID "+
        " ,ST.RESOLUTION_DATE "+
        " ,ST.END_USER_ID "+
        " ,ST.SUPPORT_TICKET_ASSET_TAG "+
        " ,EU.END_USER_FIRST_NAME "+
        " ,EU.END_USER_LAST_NAME "+
        " ,EU.END_USER_EMAIL "+
        " FROM [dbo].[SUPPORT_TICKET] as ST "+
        " JOIN dbo.END_USER as EU ON ST.END_USER_ID = EU.END_USER_ID"
        " WHERE ST.SUPPORT_TICKET_STATUS_ID = @SUPPORT_TICKET_STATUS";
        " AND ST.SUPPORT_AGENT_ID = @USER_ID";
        const supportTicketsList = await pool.request()
                            .input('USER_ID', sql.Int, USER_ID)
                            .input('SUPPORT_TICKET_STATUS', sql.Int, SUPPORT_TICKET_STATUS)
                            .query(selectAllTicketsQ);
        return supportTicketsList.recordset;
    } catch (error) {
        console.log(error.message);
    }
}


const getByIdJoin = async(SUPPORT_TICKET_ID) => {
    try {
        let pool = await sql.connect(config.sql);
        const selectAllTicketsQ = "SELECT ST.SUPPORT_TICKET_ID, ST.SUPPORT_TICKET_SUBJECT, ST.SUPPORT_TICKET_NOTE, ST.DEVICE_MAKE, "+
        " ST.DEVICE_MODEL, ST.SUPPORT_TICKET_TIMELINE, ST.SUPPORT_TICKET_DATE_CREATED, ST.SUPPORT_TICKET_RESOLUTION_TIME, "+
        " ES.END_USER_ID, ES.END_USER_FIRST_NAME, ES.END_USER_LAST_NAME, STS.SUPPORT_TICKET_STATUS_ID, "+
        " STS.SUPPORT_TICKET_STATUS_DESC, TC.TICKET_CATEGORY_ID, TC.TICKET_CATEGORY_DESC, TP.TICKET_PRIORITY_ID, "+
        " TP.TICKET_PRIORITY_DESC, ST.RESOLUTION_DATE, SA.SUPPORT_AGENT_ID, SA.SUPPORT_AGENT_FIRST_NAME, "+
        " SA.SUPPORT_AGENT_LAST_NAME, TSC.TICKET_SUB_CATEGORY_ID, TSC.TICKET_SUB_CATEGORY_DESC "+
        " FROM dbo.SUPPORT_TICKET as ST INNER JOIN "+
        " dbo.END_USER as ES ON ST.END_USER_ID = ES.END_USER_ID INNER JOIN "+
        " dbo.SUPPORT_TICKET_STATUS as STS ON ST.SUPPORT_TICKET_STATUS_ID = STS.SUPPORT_TICKET_STATUS_ID INNER JOIN " +
        " dbo.TICKET_CATEGORY as TC ON ST.TICKET_CATEGORY_ID = TC.TICKET_CATEGORY_ID INNER JOIN "+
        " dbo.TICKET_PRIORITY as TP ON ST.TICKET_PRIORITY_ID = TP.TICKET_PRIORITY_ID LEFT OUTER JOIN "+
        " dbo.SUPPORT_AGENT as SA ON ST.SUPPORT_AGENT_ID = SA.SUPPORT_AGENT_ID LEFT OUTER JOIN "+
        " dbo.TICKET_SUB_CATEGORY as TSC ON ST.TICKET_SUB_CATEGORY_ID = TSC.TICKET_SUB_CATEGORY_ID "+
        " WHERE SUPPORT_TICKET_ID = @SUPPORT_TICKET_ID"
        const supportTicket = await pool.request()
                            .input('SUPPORT_TICKET_ID', sql.Int, SUPPORT_TICKET_ID)
                            .query(selectAllTicketsQ);
        return subCategory.recordset;
    } catch (error) {
        return error.message;
    }
}

const getById = async(SUPPORT_TICKET_ID) => {
    try {
        let pool = await sql.connect(config.sql);
        const selectAllTicketsQ = "SELECT  [SUPPORT_TICKET_ID] "+
        " ,[SUPPORT_TICKET_SUBJECT]  "+
        " ,[SUPPORT_TICKET_NOTE] "+
        " ,[DEVICE_MAKE] "+
        " ,[DEVICE_MODEL] "+
        " ,[SUPPORT_TICKET_TIMELINE] "+
        " ,[SUPPORT_TICKET_DATE_CREATED] "+
        " ,[SUPPORT_TICKET_RESOLUTION_TIME] "+
        " ,[SUPPORT_TICKET_STATUS_ID] "+
        " ,[TICKET_CATEGORY_ID] "+
        " ,[TICKET_SUB_CATEGORY_ID] "+
        " ,[TICKET_PRIORITY_ID] "+
        " ,[SUPPORT_AGENT_ID] "+
        " ,[RESOLUTION_DATE] "+
        " ,[END_USER_ID] "
        " FROM [dbo].[SUPPORT_TICKET] WHERE SUPPORT_TICKET_ID=@SUPPORT_TICKET_ID  "
        const supportTicket = await pool.request()
                            .input('SUPPORT_TICKET_ID', sql.Int, SUPPORT_TICKET_ID)
                            .query(selectAllTicketsQ);
        return supportTicket.recordset;
    } catch (error) {
        return error.message;
    }
}

const insertNew = async (supportTicketData) => {
    try {
        let pool = await sql.connect(config.sql);
        const createSupportTicket = "INSERT INTO [dbo].[SUPPORT_TICKET] "+
       " ([SUPPORT_TICKET_SUBJECT] "+
       " ,[SUPPORT_TICKET_NOTE] "+
       " ,[DEVICE_MAKE] "+
       " ,[DEVICE_MODEL] "+
       " ,[SUPPORT_TICKET_TIMELINE] "+
       " ,[SUPPORT_TICKET_DATE_CREATED] "+
       " ,[SUPPORT_TICKET_RESOLUTION_TIME] "+
       " ,[SUPPORT_TICKET_STATUS_ID] "+
       " ,[TICKET_CATEGORY_ID] "+
       " ,[TICKET_SUB_CATEGORY_ID] "+
       " ,[TICKET_PRIORITY_ID] "+
       " ,[SUPPORT_AGENT_ID] "+
       " ,[RESOLUTION_DATE] "+
       " ,[END_USER_ID] "+
       " ,[SUPPORT_TICKET_ASSET_TAG]) "+
       " VALUES "+
       " (@SUPPORT_TICKET_SUBJECT, "+
       " @SUPPORT_TICKET_NOTE, "+
       " @DEVICE_MAKE, "+
       " @DEVICE_MODEL, "+
       " @SUPPORT_TICKET_TIMELINE, "+
       " @SUPPORT_TICKET_DATE_CREATED, "+
       " @SUPPORT_TICKET_RESOLUTION_TIME, "+
       " @SUPPORT_TICKET_STATUS_ID, "+
       " @TICKET_CATEGORY_ID, "+
       " @TICKET_SUB_CATEGORY_ID, "+
       " @TICKET_PRIORITY_ID, "+
       " @SUPPORT_AGENT_ID, "+
       " @RESOLUTION_DATE, "+
       " @END_USER_ID, "+
       " @SUPPORT_TICKET_ASSET_TAG)"

        const insertSuppTicket = await pool.request()
                            .input('SUPPORT_TICKET_SUBJECT', sql.NVarChar(500), supportTicketData.SUPPORT_TICKET_SUBJECT)
                            .input('SUPPORT_TICKET_NOTE', sql.NVarChar('max'), supportTicketData.SUPPORT_TICKET_NOTE)
                            .input('DEVICE_MAKE', sql.NVarChar(20), supportTicketData.DEVICE_MAKE)
                            .input('DEVICE_MODEL', sql.NVarChar(20), supportTicketData.DEVICE_MODEL)
                            .input('SUPPORT_TICKET_TIMELINE', sql.NVarChar(20), supportTicketData.SUPPORT_TICKET_TIMELINE)
                            .input('SUPPORT_TICKET_DATE_CREATED', sql.DateTime, supportTicketData.SUPPORT_TICKET_DATE_CREATED)
                            .input('SUPPORT_TICKET_RESOLUTION_TIME', sql.Int, supportTicketData.SUPPORT_TICKET_RESOLUTION_TIME)
                            .input('SUPPORT_TICKET_STATUS_ID', sql.SmallInt, supportTicketData.SUPPORT_TICKET_STATUS_ID)
                            .input('TICKET_CATEGORY_ID', sql.SmallInt, supportTicketData.TICKET_CATEGORY_ID)
                            .input('TICKET_SUB_CATEGORY_ID', sql.SmallInt, supportTicketData.TICKET_SUB_CATEGORY_ID)        
                            .input('TICKET_PRIORITY_ID', sql.SmallInt, supportTicketData.TICKET_PRIORITY_ID)        
                            .input('SUPPORT_AGENT_ID', sql.SmallInt, supportTicketData.SUPPORT_AGENT_ID)        
                            .input('RESOLUTION_DATE', sql.DateTime, supportTicketData.RESOLUTION_DATE)  
                            .input('END_USER_ID', sql.SmallInt, supportTicketData.END_USER_ID)
                            .input('SUPPORT_TICKET_ASSET_TAG', sql.NVarChar(40), supportTicketData.SUPPORT_TICKET_ASSET_TAG)      
                            .query(createSupportTicket);                            
        return insertSuppTicket.recordset;
    } catch (error) {
        return error.message;
    }
}

const update = async (SUPPORT_TICKET_ID, data) => {
    try {
        let pool = await sql.connect(config.sql);
        const updateSubCatQ = "UPDATE [dbo].[SUPPORT_TICKET] "+
        " SET [SUPPORT_TICKET_SUBJECT] = @SUPPORT_TICKET_SUBJECT, "+
        " [SUPPORT_TICKET_NOTE] = @SUPPORT_TICKET_NOTE,  "+
        " [DEVICE_MAKE] = @DEVICE_MAKE,  "+
        " [DEVICE_MODEL] = @DEVICE_MODEL, "+
        " [SUPPORT_TICKET_TIMELINE] = @SUPPORT_TICKET_TIMELINE, "+
        " [SUPPORT_TICKET_DATE_CREATED] = @SUPPORT_TICKET_DATE_CREATED, "+
        " [SUPPORT_TICKET_RESOLUTION_TIME] = @SUPPORT_TICKET_RESOLUTION_TIME, "+
        " [SUPPORT_TICKET_STATUS_ID] = @SUPPORT_TICKET_STATUS_ID, "+
        " [TICKET_CATEGORY_ID] = @TICKET_CATEGORY_ID, "+
        " [TICKET_SUB_CATEGORY_ID] = @TICKET_SUB_CATEGORY_ID,  "+
        " [TICKET_PRIORITY_ID] = @TICKET_PRIORITY_ID, "+
        " [SUPPORT_AGENT_ID] = @SUPPORT_AGENT_ID,  "+
        " [RESOLUTION_DATE] = @RESOLUTION_DATE, "+
        " [END_USER_ID] = @END_USER_ID, "
        " WHERE SUPPORT_TICKET_ID=@SUPPORT_TICKET_ID"
     
        const update = await pool.request()
            .input('SUPPORT_TICKET_ID', sql.Int, SUPPORT_TICKET_ID)
            .input('SUPPORT_TICKET_SUBJECT', sql.NVarChar(500), data.SUPPORT_TICKET_SUBJECT)
            .input('SUPPORT_TICKET_NOTE', sql.NVarChar('max'), data.SUPPORT_TICKET_NOTE)
            .input('DEVICE_MAKE', sql.NVarChar(20), data.DEVICE_MAKE)
            .input('DEVICE_MODEL', sql.NVarChar(20), data.DEVICE_MODEL)
            .input('SUPPORT_TICKET_TIMELINE', sql.NVarChar(20), data.SUPPORT_TICKET_TIMELINE)
            .input('SUPPORT_TICKET_DATE_CREATED', sql.Date, data.SUPPORT_TICKET_DATE_CREATED)
            .input('SUPPORT_TICKET_RESOLUTION_TIME', sql.Int, data.SUPPORT_TICKET_RESOLUTION_TIME)
            .input('SUPPORT_TICKET_STATUS_ID', sql.SmallInt, data.SUPPORT_TICKET_STATUS_ID)
            .input('TICKET_CATEGORY_ID', sql.SmallInt, data.TICKET_CATEGORY_ID)
            .input('TICKET_SUB_CATEGORY_ID', sql.SmallInt, data.TICKET_SUB_CATEGORY_ID)        
            .input('TICKET_PRIORITY_ID', sql.SmallInt, data.TICKET_PRIORITY_ID)        
            .input('SUPPORT_AGENT_ID', sql.SmallInt, data.SUPPORT_AGENT_ID)        
            .input('RESOLUTION_DATE', sql.Date, data.RESOLUTION_DATE)
            .input('END_USER_ID', sql.SmallInt, data.END_USER_ID)        
                                
            .query(updateSubCatQ);
        return update.recordset;
    } catch (error) {
        return error.message;
    }
}

const del = async (SUPPORT_TICKET_ID) => {
    try {
        let pool = await sql.connect(config.sql);
        const deleteSuppTicketQ = "DELETE FROM SUPPORT_TICKET WHERE SUPPORT_TICKET_ID = @SUPPORT_TICKET_ID"

        const deleteSticket = await pool.request()
                        .input('SUPPORT_TICKET_ID', sql.Int, SUPPORT_TICKET_ID)
                            .query(deleteSuppTicketQ);
        return deleteSticket.recordset;
    } catch (error) {
        return error.message;
    }
}


module.exports = {
   GetAll,
   GetAllJoinByStatus,
   GetByUserId,
   GetAssignedByUserId,
   getById,
   getByIdJoin,
   update,
   insertNew,
   del
}