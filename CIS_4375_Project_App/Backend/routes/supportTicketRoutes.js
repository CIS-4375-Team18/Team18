'use strict';

const express = require('express');
const supportTicketCntr  = require('../controllers/supportTicketController');
const router = express.Router();
router.get('/supporttickets', supportTicketCntr.GetAllSupportTickets);
router.get('/ticketDisplay', supportTicketCntr.GetAllTicketsDisplay);
router.get('/ticketbycat', supportTicketCntr.supportTicketByCat);
router.get('/supportticket/:id', supportTicketCntr.getSingleTicket);
router.post('/supportticket', supportTicketCntr.insertSupportTicket);
router.put('/supportticket/:id', supportTicketCntr.updateSupportTicket);
router.delete('/supportticket/:id', supportTicketCntr.delSupportTicket);


module.exports = {
    routes: router
}