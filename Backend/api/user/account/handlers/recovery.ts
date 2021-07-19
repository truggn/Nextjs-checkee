import dbConnect from '@/utils/dbConnect';
import type { AccountRecoveryHandlers } from '../recovery';
import nodemailer from 'nodemailer';
import User from '@/models/User';
// import bcrypt from 'bcrypt'
var bcrypt = require('bcryptjs');
import {SERVERAPI} from "@configFrontend/index"

const recoveryHandler: AccountRecoveryHandlers['recovery'] = async ({
    res,
    req,
    body: { email, nickName, phone },
    // config,
}) => {

    try {
        await dbConnect()

        const userInfo = await User.findOne({ email: email })
        if (!userInfo) {
            return res.status(400).json({
                data: null,
                errors: [{ message: 'Not found', code: 'ERROR-000001' }],
            }); 
            
        }

        

        //Generate and set password reset token
        userInfo.generatePasswordReset();

        // Save the updated user object
        await userInfo.save();

        // send email
        //let link = "http://" + req.headers.host + "/api/users/reset-password?token=" + userInfo.resetPasswordToken;
        let link = SERVERAPI+"changeforgotpass?token="  + userInfo.resetPasswordToken
        // let link = "https://checkee-abc.herokuapp.com/changeforgotpass?token="  + userInfo.resetPasswordToken

        
        let html = `<p>Hi ${userInfo.email}</p>
                    <p>Please click on the following <a href="${link}">link</a> to reset your password.</p> 
                    <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`;


        let randomNumber : string = '';
        for (let i = 0; i < 4; i++) {
            randomNumber += Math.floor(Math.random() * 10)
        }

        const newPassword = `ABCD${randomNumber}`

        // Update account
        bcrypt.hash(newPassword, 10, async function(err, hash) {
            if (err) {
                return res.status(400).json({
                    data: null,
                    errors: [{ message: 'ERROR Hash Password', code: 'ERROR-000002' }],
                }); 
            }
            await User.findByIdAndUpdate(userInfo._id, {password: hash})
        });

        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        // let testAccount = await nodemailer.createTestAccount();

        // // create reusable transporter object using the default SMTP transport
        // let transporter = nodemailer.createTransport({
        //     host: "mail.datvietsoftware.com.vn",
        //     port: 587,
        //     secure: false, // true for 465, false for other ports
        //     auth: {
        //         user: 'lienhe@datvietsoftware.com.vn', // generated ethereal user
        //         pass: 'zaqdatvietmaicty@', // generated ethereal password
        //     },
        //     tls: {rejectUnauthorized:false},
        // });
        
        // // send mail with defined transport object
        // let info = await transporter.sendMail({
        //     from: '"DatViet Software 👻" <lienhe@datvietsoftware.com.vn>', // sender address
        //     to: `${email}`, // list of receivers
        //     subject: "Hello ✔", // Subject line
        //     text: "Hello world?", // plain text body
        //     html: "<b>Hello world?</b>", // html body
        // });

        // create reusable transporter object using the default SMTP transport
        // let transporter = nodemailer.createTransport({
        //     // host: "mail.datvietsoftware.com.vn",
        //     // port: 25,
        //     // secure: false, // true for 465, false for other ports
        //     // auth: {
        //     //     user: 'lienhe@datvietsoftware.com.vn', // generated ethereal user
        //     //     pass: 'zaqdatvietmaicty@', // generated ethereal password
        //     // },
        //     // tls: {rejectUnauthorized:false},
           
        //     // pool: true,
        //     // service: 'Gmail',
        //     // host: "smtp.gmail.com",
        //     // port: 465,
        //     // secure: true, // true for 465, false for other ports
        //     // auth: {
        //     //     type: 'OAuth2',
        //     //     user: 'testnodemailer981@gmail.com', //testAccount.user, // generated ethereal user
        //     //     pass: 'testNODEMAILSER981', //testAccount.pass, // generated ethereal password
        //     //     accessToken: 'ya29.a0AfH6SMC-6xeClzuq4X_S-zTeYoSAkdAXJOJQhVPjmPkixQVqnOaDRq30kOZOTFisu9IiEPI8T6oIVIUE_UN2RTuDix--l70jflzph-373grB58JZc57sdSkjDJiKX8j9OMnukJLZ_N6bz_kcata-CXC1XrZC8pz0swE4hAfbOvk',
        //     //     expires: 1612255679419 + 600000,
        //     //     refreshToken: '1//04mdezG_eyEz_CgYIARAAGAQSNwF-L9IrQsxQKm_4cPrLDX6nQf5g8dtjlvpo6Gp_ZhUll8neqmefiHxqKDqnQHkcsAhE6bh_-v8',
        //     //     clientId: '100215648771-bgpnvc6h59d2tjlc4uair31ou0eufsv2.apps.googleusercontent.com',
        //     //     clientSecret: '5QWmE-btdWJBMPXs9yn9HYkZ',
        //     //     accessUrl: 'https://oauth2.googleapis.com/token',
        //     // },
            
           

        // });

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: { 
                user: 'dvgroup.dev@gmail.com',
                pass: 'datviet123@'
            }
        })



        // transporter.verify((error, success) => {
        //     if (error) return console.log(error)
        //     console.log('Server is ready to take our messages: ', success)
        //     transporter.on('token', token => {
        //         console.log('A new access token was generated')
        //         console.log('User: %s', token.user)
        //         console.log('Access Token: %s', token.accessToken)
        //         console.log('Expires: %s', new Date(token.expires))
        //     })
        // })
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"DatViet Software 👻" <lienhe@datvietsoftware.com.vn>', //'"Fred Foo 👻" <foo@example.com>', // sender address
            to: `${userInfo.email}`, //"bar@example.com, baz@example.com", // list of receivers
            subject: "Hello ✔", // Subject line
            // text: "Hello world?", // plain text body
            // html: `<b>Hello world?</b>
            //     <h1>New Password<h1>
            //     <h2>${newPassword}<h2>
            // `, // html body
            html: html,
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

        // console.log("info.messageId: " + info.messageId);
        // console.log("info.envelope: " + info.envelope);
        // console.log("info.accepted: " + info.accepted);
        // console.log("info.rejected: " + info.rejected);
        // console.log("info.pending: " + info.pending);
        // console.log("info.response: " + info.response);

        

        return res.status(200).json({ data: `${nodemailer.getTestMessageUrl(info)}`})
    } catch (error) {
        return res.status(500).json({
            data: null,
            errors: [{ message: error.message }],
        });
    }
}

export default recoveryHandler