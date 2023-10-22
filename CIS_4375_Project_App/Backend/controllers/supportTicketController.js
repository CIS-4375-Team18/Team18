'use strict';

const supportTicketData = require('../data/supportTickets');

const GetAllSupportTickets = async (req, res, next) => {
    try {

        const ticketLIst = await supportTicketData.GetAll();
        res.send(ticketLIst);        
        console.log(ticketLIst)
    } catch (error) {
        res.status(400).send(error.message);
    }
}


const GetAllTicketsDisplay = async (req, res, next) => {
    try {
        const userRole = req.body.userRole;
        const userId = req.body.userId;
        const status = req.body.status;
        const createdByUserId = req.body.createdByUserId;

        let ticketList = [];
        if (userRole === 'System Administrator' || userRole === 'IT Teacher') {
            ticketList = await supportTicketData.GetAllJoin(createdByUserId, status);
        } else if (userRole === 'Technician') {
            ticketList = await supportTicketData.GetAssignedByUserId(userId, status);
        } else {
            ticketList = await supportTicketData.GetByUserId(userId, status);
        }
        
        res.send(ticketList);         
    } catch (error) {
        res.status(400).send(error.message);
    }
}



const getSingleTicket = async (req, res, next) => {
    try {
        const SUPPORT_TICKET_ID = req.params.id;
        const supportTicket = await supportTicketData.getById(SUPPORT_TICKET_ID);
        res.send(supportTicket);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const insertSupportTicket = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await supportTicketData.insertNew(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}


const updateSupportTicket = async (req, res, next) => {
    try {
        const SUPPORT_TICKET_ID =  req.params.id;
        const data = req.body;
        const updated = await supportTicketData.update(SUPPORT_TICKET_ID, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

/** */
const delSupportTicket = async (req, res, next) => {
    try {
        const SUPPORT_TICKET_ID = req.params.id;
        const deleteSupportTicket = await supportTicketData.del(SUPPORT_TICKET_ID);
        res.send(deleteSupportTicket);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
   GetAllSupportTickets,
   GetAllTicketsDisplay,
   getSingleTicket,
   insertSupportTicket,
   updateSupportTicket,
   delSupportTicket
}