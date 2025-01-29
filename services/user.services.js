const db = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const dbUser = db.User;

const JWT_SECRET = process.env.JWT_SECRET; // Use your secret key from .env

// Create new user
async function save(req, res) {
   if (!req.body.mobile || req.body.mobile === '') {
       return res.status(400).json({
           responseCode: -1,
           message: "Mobile number is required"
       });
   }

   var match = await dbUser.find({ email: req.body.email });

   if (match !== null && match.length > 0) {
       return res.status(400).json({
           responseCode: -1,
           message: "Email already exists"
       });
   }

   // Encrypt password using bcrypt
   let crptPass = await bcrypt.hash(req.body.password, 10).then(hash => {
       return (hash);
   }).catch(err => console.error(err.message));

   let newUser = {
       name: req.body.name,
       email: req.body.email,
       mobile: req.body.mobile,
       password: crptPass,
       registerDate: req.body.registerDate
   };

   try {
       const result = await new dbUser(newUser).save();
       const data = {
           result: result,
           responseCode: 1
       };
       res.status(200).json(data);
   } catch (err) {
       console.error(err); // Log the error for debugging
       res.status(500).json({
           responseCode: -1,
           message: "Error saving user: " + err.message
       });
   }
}



// Login user and generate JWT
async function login(req, res) {
    let result = await dbUser.findOne({ email: req.body.email });

    if (result == null || result == undefined) {
        return res.send({
            responseCode: -1
        });
    }

    let passCondition;

    if (result !== null && result !== undefined) {
        passCondition = await bcrypt.compare(req.body.password, result.password);
    }

    if (passCondition === false) {
        return res.send({
            responseCode: -2
        });
    }

    if (passCondition === true) {
        // Generate JWT token after successful login
        const token = jwt.sign({ userId: result._id }, JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour

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

// Find all users (for admin purposes, if needed)
async function allUser(req, res) {
    let result = await dbUser.find(req.body);
    res.send(result);
}

module.exports = {
    save,
    login,
    allUser
};
