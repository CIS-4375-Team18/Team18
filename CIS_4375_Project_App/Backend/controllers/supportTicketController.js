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
            ticketList = await supportTicketData.GetAllJoin(userId, status);
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

const supportTicketByCat = async (req, res, next) => {
    try {
        const countTickets = await supportTicketData.getTicketCountByCat();
        res.send(countTickets);
        console.log(countTickets);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const supportTicketByCatPerUser = async (req, res, next) => {
    try {
        const END_USER_ID = req.params.id;
        const ticketsPerUser = await supportTicketData.getTicketCountByCatPerUser(END_USER_ID);
        res.send(ticketsPerUser);
        console.log(ticketsPerUser);
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const supportTicketPerSupport = async (req, res, next) => {
    try {
        const ticketsPerSupport = await supportTicketData.getTicketCountPerSupport();
        res.send(ticketsPerSupport);
        console.log(ticketsPerSupport);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const ticketsClosedCount = async (req, res, next) => {
    try {
        const closedTickets = await supportTicketData.getResolvedTicketCountPerMonth();
        res.send(closedTickets);
        console.log(closedTickets);
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
   supportTicketByCat,
   supportTicketByCatPerUser,
   supportTicketPerSupport,
   ticketsClosedCount,
   insertSupportTicket,
   updateSupportTicket,
   delSupportTicket
}