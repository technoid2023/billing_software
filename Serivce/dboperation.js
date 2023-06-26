const jwt = require("jsonwebtoken");
const sch = require('../Table/schema')
const mongoose = require('mongoose');
const axios = require('axios');
const { log } = require("console");
const spawn = require('child_process').spawn;
function connect() {
    const url = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.0";
    const connection = mongoose.createConnection(url,
        { useNewUrlParser: true, useUnifiedTopology: true })
    return connection;
}
let operation = {};


operation.ulogIn = async (data) => {
    // console.log(data);
    return new Promise(async (resolve, reject) => {
 
        let conn = connect();
        let coll = conn.useDb('billing');
        let userModel = coll.model("users", sch.userSchema());
        const user = await userModel.find({emp_code:data.code,password:data.password}, { _id: 0,password:0 });
        console.log(user);
        if (user.length != 0) {
            let coll1 = conn.useDb('billing');
            let jwtModel = coll1.model("jwts", sch.jwtSchema());
            let jwtData = {
                name: user[0].name,
                Built_Time: new Date()
            }
            let token = jwt.sign(jwtData, "SECRETKEY", { expiresIn: "1h" });
            await jwtModel.insertMany({ token: token, name: user[0].name, Built_Time: new Date(), logout: false })
            conn.close();

            resolve({ Success: true, Message: "Login Successfull", Token: token, Data: user })
        }
        reject({ Success: false, Message: "No User Found" })
    });
};
operation.ulogOut = async (token) => {
    // console.log(token);
    return new Promise(async (resolve, reject) => {
        let conn = connect()
        let coll = conn.useDb('billing')
        let jwtModel = coll.model("jwts", sch.jwtSchema())
        let updatedtoekn = await jwtModel.updateOne(
            { token: token },
            { $set: { logout: true } },
            { upsert: false }
        );
        if (updatedtoekn.modifiedCount != 0) {
            resolve({ Success: true, Message: "Logged Out Successfully" });
        } else {
            reject({ Success: false, Message: "Already Logged Out" });
        }
    });
};
operation.userRegistration = async (data) => {
    return new Promise(async (resolve, reject) => {
        let conn = connect();
        let coll = conn.useDb('billing');
        let userModel = coll.model("users", sch.userSchema())
        try {
            let user = await userModel.insertMany(data);
            if (user.length != 0) {
                resolve({ Sccess: true, Message: "User Registered Succesfully", UserID: user[0].Email })
            }
        } catch (err) {
            reject({ Success: false, Message: "Registration Failed.", Error: "Employee Code Already Registered" })
        }


    })
}
operation.alltickets = async (page, limit) => {
    return new Promise(async (resolve, reject) => {
        let skipElements = page != undefined ? (page - 1) * limit : 0;
        let limitTo = limit != undefined ? limit : 20;
        let conn = connect();
        let coll = conn.useDb('billing');
        let userModel = coll.model("tickets", sch.ticketSchema());
        let ticketData = await userModel.find({}, { deleted: 0 }, { skip: skipElements, limit: limitTo });
        conn.close();
        if (ticketData.length != 0) {
            resolve({
                Success: true, Data: ticketData, pagination: {
                    page: page != undefined ? page : 1, limit: limit != undefined ? limit : 20
                }
            })
        }
        else {
            reject({ Success: false, Message: "DB operation failed" })
        }
    })
}
operation.ticketbyCat = async (page, limit, sub_cat) => {
    console.log(sub_cat);
    return new Promise(async (resolve, reject) => {
        let skipElements = page != undefined ? (page - 1) * limit : 0;
        let limitTo = limit != undefined ? limit : 20;
        let conn = connect();
        let coll = conn.useDb('billing');
        let userModel = coll.model("tickets", sch.ticketSchema());
        let ticketData = await userModel.find({  sub_catgory:sub_cat}, { deleted: 0 }, { skip: skipElements, limit: limitTo });
        if (ticketData.length != 0) {
            resolve({
                Success: true, Data: ticketData, pagination: {
                    page: page != undefined ? page : 1, limit: limit != undefined ? limit : 20
                }
            })
        }
        else {
            reject({ Success: false, Message: "DB operation failed" })
        }
    })
}
operation.allOrders = async (page, limit, user) => {
    return new Promise(async (resolve, reject) => {
        let skipElements = page != undefined ? (page - 1) * limit : 0;
        let limitTo = limit != undefined ? limit : 20;
        let conn = connect();
        let coll = conn.useDb('billing');
        let userModel = coll.model("tickets", sch.ticketSchema());
        let ticketData = await userModel.find({ owner_mobile: user }, { skip: skipElements, limit: limitTo });
        conn.close();
        if (ticketData.length != 0) {
            resolve({
                Success: true, Data: ticketData, pagination: {
                    page: page != undefined ? page : 1, limit: limit != undefined ? limit : 20
                }
            })
        }
        else {
            reject({ Success: false, Message: "NO ORDERS" })
        }
    })
}
operation.ticketbyId = async (order) => {
    console.log(order);
    return new Promise(async (resolve, reject) => {
        let conn = connect();
        let coll = conn.useDb('billing');
        let userModel = coll.model("tickets", sch.ticketSchema());
        let ticketData = await userModel.find({ _id: order }, { _id: 0 });
        conn.close();
        if (ticketData.length != 0) {
            resolve({ Success: true, Data: ticketData })
        }
        else {
            reject({ Success: false, Message: "NO ORDERS" })
        }
    })
}
operation.createNewTicket = async ( data) => {
console.log(data);
    return new Promise(async (resolve, reject) => {
        let conn = connect();
        let coll = conn.useDb('billing');
        let ticketmodel = coll.model("tickets", sch.ticketSchema());
        let orderData = {
          category:data.category,
          subcat:data.subcat,
          item:data.item,
          brand:data.brand,
          model_no:data.brand,
          serial_no:data.serial_no,
          color:data.color,
          owner:data.owner,
          owner_mobile:data.owner_mobile,
          owner_email:data.owner_email,
          issue:data.issue,
          issued_by:111,
          requirements:data.requirements,
          estimated_fees:data.estimated_fees,
          status:data.status,
          date: new Date().toString().slice(0, 10)
        }
        let newOrder = await ticketmodel.insertMany(orderData);

        conn.close();
        if (newOrder.length != 0) {
            resolve({ Success: true, Message: "Order Placed", OrderId: newOrder[0]._id, Amount: newOrder[0].estimated_fees })
        }
        else {
            reject({ Success: false, Message: "NO ORDERS" })
        }
    })
}

operation.updateTicket = async ( data,ticket) => {
    // console.log(ticket);

        return new Promise(async (resolve, reject) => {
            console.log(ticket);
            console.log(data);
            let conn = connect();
            let coll = conn.useDb('billing');
            let ticketmodel = coll.model("tickets", sch.ticketSchema());
            
            let update_response = await ticketmodel.updateOne({_id:ticket},{$set:data});
    
            conn.close();
            if (update_response.modifiedCount != 0) {
                resolve({ Success: true, Message: "Ticket Updated" })
            }
            else {
                reject({ Success: false, Message: "NO ORDERS" })
            }
        })
    }
    operation.deleteTicket = async ( ticket) => {
        
    
            return new Promise(async (resolve, reject) => {
                
                let conn = connect();
                let coll = conn.useDb('billing');
                let ticketmodel = coll.model("tickets", sch.ticketSchema());
                
                let update_response = await ticketmodel.deleteOne({_id:ticket});
        // console.log(update_response);
                conn.close();
                if (update_response.deletedCount != 0) {
                    resolve({ Success: true, Message: "Ticket Deleted" })
                }
                else {
                    reject({ Success: false, Message: "NO ORDERS" })
                }
            })
        }



module.exports = operation;

