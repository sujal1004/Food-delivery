const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator'); //from express validator 

const jwt = require("jsonwebtoken");// during login in user 
const bcrypt = require("bcryptjs"); //during creating new user 

const jwtSecret = "Loremipsumametconsecteturadipisicingquis"

router.post("/creatUser", [
    body('email', 'incorrect email').isEmail(),
    // password must be at least 5 chars long
    body('name', 'incorrect name').isLength({ min: 5 }),
    body('password', 'incorrect password').isLength({ min: 5 })]
    // name must be at least 5 chars long
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });    ////from express validator , return error 
        }
        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password, salt);  // using bcrypt and hashing for secure pass  
        try {
            await User.create({
                // name: "Sujal",
                // password: "123456",
                // email: "sujal@gmail.com",
                // location: "ghr pe"

                // inke bajaye ab thunder client ke pe se direct dege hum 
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            })
            res.json({ success: true });
        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })

//for login 

router.post("/loginuser",
    [  //enclosing in a array =>express validating  
        // validating email 
        body('email', 'incorrect email').isEmail(),
        body('password', 'incorrect password').isLength({ min: 5 })
    ]
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });    ////from express validator , return error 
        }
        let email = req.body.email;
        try {
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: " Enter correct credentials " })
            }

            //  pahle ye horha tha , par ab upar vaala horha , jo ki hash value se lega aur compare krega pass
            // if (req.body.password !== userData.password) {
            //     return res.status(400).json({ errors: " Enter correct credentials " })  //checking if correct details by user 
            // }
            // return res.json({ success: true });

            const pwdCompare = await bcrypt.compare(req.body.password, userData.password); //first from login page , 2nd from mongo

            if (!pwdCompare) {
                return res.status(400).json({ errors: " try login with correct details " })  //checking if correct details by user 
            }
            // for signature in json token
            const data = {
                user: {
                    id: userData.id
                }
            }
            const authToken = jwt.sign(data, jwtSecret)

            return res.json({ success: true, authToken: authToken });
        }
        catch (error) {
            console.log(error)
            res.json({ success: false });
        }
    })

module.exports = router; 