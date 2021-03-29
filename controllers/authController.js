const { validationResult } = require('express-validator');
const db = require("../models");
const bcrypt = require('bcryptjs');
const Users = db.users;
const nodemailer = require("nodemailer");
require('dotenv').config({path: 'vars.env'});

exports.signup = async (req, res) => {
    // Express Validator Error Messages
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    }

    await Users.create(newUser).then(result => {
        return res.json({transaction: 'done', user: {
            id: result.id,
            name: result.name
        }});
    }) 
    .catch(error => {
        return res.status(400).json({transaction: 'error', error});
    })
}

exports.login = async (req, res) => {
    // Express Validator Error Messages
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    await Users.findOne({where: {email: req.body.email}})
        .then(result => {
            if(bcrypt.compareSync(req.body.password, result.password)) {
                return res.json({transaction: 'done', user: {
                    id: result.id,
                    name: result.name
                }});
            } else {
                return res.status(400).json({transaction: 'error', error: 'Wrong password'}); 
            }

        }) 
        .catch(error => {
            return res.status(400).json({transaction: 'error', error});
        })
}

exports.lostPassword = async (req, res) => {
    // Express Validator Error Messages
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const salt = bcrypt.genSaltSync(10);
    const randomString = Math.random().toString(36).slice(-8);
    const hashedNewPassword = bcrypt.hashSync(randomString, salt);

    await Users.update({password: hashedNewPassword}, {where: {email: req.body.email}})
        .then(resp => {

            async function sendEmail() {
                try {
                    let transporter = nodemailer.createTransport({
                        host: process.env.NOREP_HOST,
                        port: 465,
                        secure: true,
                        tls: { rejectUnauthorized: false },
                        auth: {
                          user: process.env.NOREP_EMAIL, 
                          pass: process.env.NOREP_PASS, 
                        }
                      });
        
                    let info = await transporter.sendMail({
                        from: '"Lucas Adlerstein" <no-reply@adlerstein.com.ar>',
                        to: req.body.email,
                        subject: `Password Reset for Piggy`,
                        text: `Hi there!
                        
                        Here is your new password: ${randomString}
        
                        Thanks for using Piggy!`, // plain text body
                        html: `Hi there!<br><br>
                        Here is your new password: ${randomString}<br><br>
                        Thanks for using Piggy!`, // html body
                    });
                    return res.json({transaction: 'done', message: 'sent'});   
                } catch (error) {
                    return res.status(400).json({transaction: 'error', error});
                }   
            }
            sendEmail();
        })
        .catch(error => {
            return res.status(400).json({transaction: 'error', error});
        })


    
}