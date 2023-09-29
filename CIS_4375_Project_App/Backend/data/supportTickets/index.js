'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');


const GetAllJoin = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const selectAllTicketsQ = "SELECT dbo.SUPPORT_TICKET.SUPPORT_TICKET_ID, dbo.SUPPORT_TICKET.SUPPORT_TICKET_SUBJECT, dbo.SUPPORT_TICKET.SUPPORT_TICKET_NOTE, dbo.SUPPORT_TICKET.DEVICE_MAKE, "+
       " dbo.SUPPORT_TICKET.DEVICE_MODEL, dbo.SUPPORT_TICKET.SUPPORT_TICKET_TIMELINE, dbo.SUPPORT_TICKET.SUPPORT_TICKET_DATE_CREATED, dbo.SUPPORT_TICKET.SUPPORT_TICKET_RESOLUTION_TIME, "+
       " dbo.END_USER.END_USER_ID, dbo.END_USER.END_USER_FIRST_NAME, dbo.END_USER.END_USER_LAST_NAME, dbo.SUPPORT_TICKET_STATUS.SUPPORT_TICKET_STATUS_ID, "+
       " dbo.SUPPORT_TICKET_STATUS.SUPPORT_TICKET_STATUS_DESC, dbo.TICKET_CATEGORY.TICKET_CATEGORY_ID, dbo.TICKET_CATEGORY.TICKET_CATEGORY_DESC, dbo.TICKET_PRIORITY.TICKET_PRIORITY_ID, "+
       " dbo.TICKET_PRIORITY.TICKET_PRIORITY_DESC, dbo.SUPPORT_TICKET.RESOLUTION_DATE, dbo.SUPPORT_AGENT.SUPPORT_AGENT_ID, dbo.SUPPORT_AGENT.SUPPORT_AGENT_FIRST_NAME, "+
       " dbo.SUPPORT_AGENT.SUPPORT_AGENT_LAST_NAME, dbo.TICKET_SUB_CATEGORY.TICKET_SUB_CATEGORY_ID, dbo.TICKET_SUB_CATEGORY.TICKET_SUB_CATEGORY_DESC "+
       " FROM dbo.SUPPORT_TICKET INNER JOIN "+
       " dbo.END_USER ON dbo.SUPPORT_TICKET.END_USER_ID = dbo.END_USER.END_USER_ID INNER JOIN "+
       " dbo.SUPPORT_TICKET_STATUS ON dbo.SUPPORT_TICKET.SUPPORT_TICKET_STATUS_ID = dbo.SUPPORT_TICKET_STATUS.SUPPORT_TICKET_STATUS_ID INNER JOIN " +
       " dbo.TICKET_CATEGORY ON dbo.SUPPORT_TICKET.TICKET_CATEGORY_ID = dbo.TICKET_CATEGORY.TICKET_CATEGORY_ID INNER JOIN "+
       " dbo.TICKET_PRIORITY ON dbo.SUPPORT_TICKET.TICKET_PRIORITY_ID = dbo.TICKET_PRIORITY.TICKET_PRIORITY_ID LEFT OUTER JOIN "+
       " dbo.SUPPORT_AGENT ON dbo.SUPPORT_TICKET.SUPPORT_AGENT_ID = dbo.SUPPORT_AGENT.SUPPORT_AGENT_ID LEFT OUTER JOIN "+
       " dbo.TICKET_SUB_CATEGORY ON dbo.SUPPORT_TICKET.TICKET_SUB_CATEGORY_ID = dbo.TICKET_SUB_CATEGORY.TICKET_SUB_CATEGORY_ID"
        const supportTicketsList = await pool.request().query(selectAllTicketsQ);
        return supportTicketsList.recordset;
    } catch (error) {
        console.log(error.message);
    }
}


const GetAll = async () => {
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
        " FROM [dbo].[SUPPORT_TICKET] "
        const supportTicketsList = await pool.request().query(selectAllTicketsQ);
        return supportTicketsList.recordset;
    } catch (error) {
        console.log(error.message);
    }
}


const getByIdJoin = async(SUPPORT_TICKET_ID) => {
    try {
        let pool = await sql.connect(config.sql);
        const selectAllTicketsQ = "SELECT dbo.SUPPORT_TICKET.SUPPORT_TICKET_ID, dbo.SUPPORT_TICKET.SUPPORT_TICKET_SUBJECT, dbo.SUPPORT_TICKET.SUPPORT_TICKET_NOTE, dbo.SUPPORT_TICKET.DEVICE_MAKE, "+
        " dbo.SUPPORT_TICKET.DEVICE_MODEL, dbo.SUPPORT_TICKET.SUPPORT_TICKET_TIMELINE, dbo.SUPPORT_TICKET.SUPPORT_TICKET_DATE_CREATED, dbo.SUPPORT_TICKET.SUPPORT_TICKET_RESOLUTION_TIME, "+
        " dbo.END_USER.END_USER_ID, dbo.END_USER.END_USER_FIRST_NAME, dbo.END_USER.END_USER_LAST_NAME, dbo.SUPPORT_TICKET_STATUS.SUPPORT_TICKET_STATUS_ID, "+
        " dbo.SUPPORT_TICKET_STATUS.SUPPORT_TICKET_STATUS_DESC, dbo.TICKET_CATEGORY.TICKET_CATEGORY_ID, dbo.TICKET_CATEGORY.TICKET_CATEGORY_DESC, dbo.TICKET_PRIORITY.TICKET_PRIORITY_ID, "+
        " dbo.TICKET_PRIORITY.TICKET_PRIORITY_DESC, dbo.SUPPORT_TICKET.RESOLUTION_DATE, dbo.SUPPORT_AGENT.SUPPORT_AGENT_ID, dbo.SUPPORT_AGENT.SUPPORT_AGENT_FIRST_NAME, "+
        " dbo.SUPPORT_AGENT.SUPPORT_AGENT_LAST_NAME, dbo.TICKET_SUB_CATEGORY.TICKET_SUB_CATEGORY_ID, dbo.TICKET_SUB_CATEGORY.TICKET_SUB_CATEGORY_DESC "+
        " FROM dbo.SUPPORT_TICKET INNER JOIN "+
        " dbo.END_USER ON dbo.SUPPORT_TICKET.END_USER_ID = dbo.END_USER.END_USER_ID INNER JOIN "+
        " dbo.SUPPORT_TICKET_STATUS ON dbo.SUPPORT_TICKET.SUPPORT_TICKET_STATUS_ID = dbo.SUPPORT_TICKET_STATUS.SUPPORT_TICKET_STATUS_ID INNER JOIN " +
        " dbo.TICKET_CATEGORY ON dbo.SUPPORT_TICKET.TICKET_CATEGORY_ID = dbo.TICKET_CATEGORY.TICKET_CATEGORY_ID INNER JOIN "+
        " dbo.TICKET_PRIORITY ON dbo.SUPPORT_TICKET.TICKET_PRIORITY_ID = dbo.TICKET_PRIORITY.TICKET_PRIORITY_ID LEFT OUTER JOIN "+
        " dbo.SUPPORT_AGENT ON dbo.SUPPORT_TICKET.SUPPORT_AGENT_ID = dbo.SUPPORT_AGENT.SUPPORT_AGENT_ID LEFT OUTER JOIN "+
        " dbo.TICKET_SUB_CATEGORY ON dbo.SUPPORT_TICKET.TICKET_SUB_CATEGORY_ID = dbo.TICKET_SUB_CATEGORY.TICKET_SUB_CATEGORY_ID "+
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
       " ,[END_USER_ID]) "
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
       " @END_USER_ID) "

        const insertSuppTicket = await pool.request()
                            .input('SUPPORT_TICKET_SUBJECT', sql.NVarChar(500), supportTicketData.SUPPORT_TICKET_SUBJECT)
                            .input('SUPPORT_TICKET_NOTE', sql.NVarChar('max'), supportTicketData.SUPPORT_TICKET_NOTE)
                            .input('DEVICE_MAKE', sql.NVarChar(20), supportTicketData.DEVICE_MAKE)
                            .input('DEVICE_MODEL', sql.NVarChar(20), supportTicketData.DEVICE_MODEL)
                            .input('SUPPORT_TICKET_TIMELINE', sql.NVarChar(20), supportTicketData.SUPPORT_TICKET_TIMELINE)
                            .input('SUPPORT_TICKET_DATE_CREATED', sql.Date, supportTicketData.SUPPORT_TICKET_DATE_CREATED)
                            .input('SUPPORT_TICKET_RESOLUTION_TIME', sql.Int, supportTicketData.SUPPORT_TICKET_RESOLUTION_TIME)
                            .input('SUPPORT_TICKET_STATUS_ID', sql.SmallInt, supportTicketData.SUPPORT_TICKET_STATUS_ID)
                            .input('TICKET_CATEGORY_ID', sql.SmallInt, supportTicketData.TICKET_CATEGORY_ID)
                            .input('TICKET_SUB_CATEGORY_ID', sql.SmallInt, supportTicketData.TICKET_SUB_CATEGORY_ID)        
                            .input('TICKET_PRIORITY_ID', sql.SmallInt, supportTicketData.TICKET_PRIORITY_ID)        
                            .input('SUPPORT_AGENT_ID', sql.SmallInt, supportTicketData.SUPPORT_AGENT_ID)        
                            .input('RESOLUTION_DATE', sql.Date, supportTicketData.RESOLUTION_DATE)  
                            .input('END_USER_ID', sql.SmallInt, supportTicketData.END_USER_ID)      
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
   GetAllJoin,
   getById,
   getByIdJoin,
   update,
   insertNew,
   del
}