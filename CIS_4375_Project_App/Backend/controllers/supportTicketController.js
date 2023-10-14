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

        const ticketLIst = await supportTicketData.GetAllJoin();
        res.send(ticketLIst);        
        console.log(ticketLIst)
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
   insertSupportTicket,
   updateSupportTicket,
   delSupportTicket
}