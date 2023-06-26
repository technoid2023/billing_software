const express = require('express');

const db = require('../../Serivce/dboperation');

let service = {};
service.ulogin = async (req, res) => {
    let data = req.body;
    try {
        let response = await db.ulogIn(data);
        if (response) {
            res.json(response);
        }
    } catch (err) {
        res.json(err)
    }
}
service.ulogout = async (req, res) => {
    let token = req.headers.token;
    // console.log(req.headers.token);

    try {
        let response = await db.ulogOut(token);
        if (response) {
            res.json({ response });
        }
    } catch (err) {
        res.json(err)
    }
}
service.uReg = async (req, res) => {
    let data = req.body;
    try {
        let response = await db.userRegistration(data);
        if (response) {
            res.json(response);
        }
    } catch (err) {
        res.json(err)
    }
}
service.getallTicket = async (req, res) => {
    let page = req.query.page;
    let limit = req.query.limit;
    try {
        let response = await db.alltickets(page, limit);
        if (response) {
            res.json(response);
        }
    } catch (err) {
        res.json(err)
    }
}
service.getTicketbyCat = async (req, res) => {
    let page = req.query.page;
    let limit = req.query.limit;
    
    let sub_cat = req.body.sub_catgory;

    try {
        let response = await db.ticketbyCat(page, limit,sub_cat);
        if (response) {
            res.json(response);
        }
    } catch (err) {
        res.json(err)
    }
}
service.getallOrders = async (req, res) => {
    let page = req.query.page;
    let limit = req.query.limit;
    let user = req.body.mobile;
    try {
        let response = await db.allOrders(page, limit, user);
        if (response) {
            res.json(response);
        }
    } catch (err) {
        res.json(err)
    }
}
service.getTicketbyId = async (req, res) => {

    let order = req.params.id;

    try {
        let response = await db.ticketbyId(order);
        if (response) {
            res.json(response);
        }
    } catch (err) {
        res.json(err)
    }
}
service.createTicket = async (req, res) => {
    let data=req.body;
    // let ticket = req.params.id;
    // console.log(ticket);

    try {
        let response = await db.createNewTicket(data);
        if (response) {
            res.json(response);
        }
    } catch (err) {
        res.json(err)
    }
}
service.updateTicket = async (req, res) => {
    let data=req.body;
    let ticket = req.params.id;
    // console.log(ticket);

    try {
        let response = await db.updateTicket(data, ticket);
        if (response) {
            res.json(response);
        }
    } catch (err) {
        res.json(err)
    }
}
service.deleteTicket = async (req, res) => {
    // let data=req.body;
    let ticket = req.params.id;
    // console.log(ticket);

    try {
        let response = await db.deleteTicket(ticket);
        if (response) {
            res.json(response);
        }
    } catch (err) {
        res.json(err)
    }
}
module.exports = service;