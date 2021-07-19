import dbConnect from '@/utils/dbConnect';
import type { AccountRecoveryHandlers } from '../recoverySendGrid';
import User from '@/models/User';
// import bcrypt from 'bcrypt'
var bcrypt = require('bcryptjs');
import sgMail from '@sendgrid/mail'

import {SERVERAPI} from "@configFrontend//index"


const apiKey = process.env.SENDGRID_API_KEY || ''
sgMail.setApiKey(apiKey)



const recoveryHandler: AccountRecoveryHandlers['recoverySendGrid'] = async ({
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

        console.log(userInfo.email)
        
        const msg = {
            to: `${userInfo.email}`, // Change to your recipient
            from: 'dvgroup.dev@gmail.com', // Change to your verified sender
            subject: "Hello sendgrid ✔",
            
            html: html,
        }
        
        
        let info = await sgMail.send(msg)
        if(!info) {
            return res.status(500).json({
                data: null,
                errors: [{ message: 'something wrong' }],
            });
            
        } 
        console.log(info[0].statusCode)
        return res.status(200).json({ data: `${info[0].statusCode}`})   
        
            
       

        // return res.status(200).json({ data: `success`})   



       
        // // send mail with defined transport object
        // let info = await transporter.sendMail({
        //     from: '"DatViet Software 👻" <lienhe@datvietsoftware.com.vn>', //'"Fred Foo 👻" <foo@example.com>', // sender address
        //     to: `${userInfo.email}`, //"bar@example.com, baz@example.com", // list of receivers
        //     subject: "Hello ✔", // Subject line
        //     // text: "Hello world?", // plain text body
        //     // html: `<b>Hello world?</b>
        //     //     <h1>New Password<h1>
        //     //     <h2>${newPassword}<h2>
        //     // `, // html body
        //     html: html,
        // });

        // console.log("Message sent: %s", info.messageId);
        // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // // Preview only available when sending through an Ethereal account
        // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...


        

       
    } catch (error) {
        return res.status(500).json({
            data: null,
            errors: [{ message: error.message }],
        });
    }
}

export default recoveryHandler