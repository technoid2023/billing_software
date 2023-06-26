const { request } = require('express');
const express = require('express');
const route = express.Router();

const verify = require('../../Middleware/authentication');
const control = require('../controller/controller');
route.post('/login', control.ulogin)
route.post('/logout', verify, control.ulogout);
route.post('/register', control.uReg);
route.get('/ticket', verify, control.getallTicket);
route.post('/ticket', verify, control.getTicketbyCat);
route.put('/ticket/:id', verify, control.updateTicket);
route.get('/ticket/:id', verify, control.getTicketbyId);
route.post('/ticket/add', verify, control.createTicket);
route.post('/ticket/order',verify,control.getallOrders)
route.delete('/ticket/:id', verify, control.deleteTicket);
module.exports = route;

