const db = require("../db/db");
const Admin = db.Admin;
const jwt = require("jsonwebtoken");
require("dotenv").config();

const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY;

async function getAdmins(req, res) {
    const result = await Admin.find({ email: req.body.email });
    if (result == null || result == undefined) {
        return res.send({
            responseCode: -1,
            message: "Incorrect Email"
        });
    }
     let passCondition;
    
        if (result !== null && result !== undefined) {
            passCondition = await bcrypt.compare(req.body.password, result.password);
        }
    
        if (passCondition === false) {
            return res.send({
                responseCode: -2,
                message:"Incorrect Password"
            });
        }
    
        if (passCondition === true) {
            // Generate JWT token after successful login
            const token = jwt.sign({ userId: result._id }, ADMIN_SECRET_KEY, { expiresIn: '1h' }); // Token expires in 1 hour
    
            // Send the token along with user data
            res.send({
                responseCode: 1,
                result: {
                    name: result.name,
                    email: result.email,
                    mobile: result.mobile,
                    roleID: result.roleID,
                },
                token: token // Sending the generated token to the client
            });
        }
}

async function createAdmin(req, res) {
    const newAdmin = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: 'admin'
    };
    const result = await new Admin(newAdmin).save();
    return { responseCode: 1, result };
}   

module.exports = { getAdmins, createAdmin };
