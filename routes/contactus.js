var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET CONTACTUS page. */
router.get('/', function (req, res, next) {
    res.render('contact/contactus', {
        layout: 'contact/layout'
    });
});


router.post('/', async (req, res, next) => {

    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var msg = req.body.msg;

    var obj = {
        to: 'matiaspome95@gmail.com',
        subject: 'WEB CONTACT',
        html: name + " Sent a message from the web and would like to have receive more info to this email: " + email + ". <br> and commented: " + msg + ". <br> phone number: " + phone
    }

    var transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });


    var info = await transport.sendMail(obj);



    res.render('contact/contactus', {
        layout: 'contact/layout',
        message: 'Message sent'
    })
});




module.exports = router;