const { Router } = require('express');
const env = require('./secret');
const router = Router();

const nodemailer = require('nodemailer');

router.post('/sent-email', async(req, res) => {
    const { name, email, subject, topic } = req.body;

    contentHTML = `
        <h1>User Information</h1>
        <ul>
            <li>Username: ${name}</li>
            <li>User Email: ${email}</li>
           <!-- <li>User Topic: </li>-->
            <li>Subject:${subject} </li>
        </ul>
    `;

    let transporter = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        auth: {
            pass: env.ña1jasdhHAxxafasd,
            user: env.MAIuAaAñS9129dXSzxxS
        },

    });

    let info = await transporter.sendMail({
        from: '"New Client" <hivedevopscr@gmail.com>',
        to: ["info@hivedevops.com","monica@hivedevops.com"],
        subject: 'Website Contact Form',
        html: contentHTML,
    })

    console.log('Message sent:', info.messageId);

    res.redirect('back');


});

module.exports = router;