import dbConnect from '@/utils/dbConnect';
import type { NotificationHandlers } from '../notification';
import nodemailer from 'nodemailer';
import Contract from '@/models/Contract';
import User from '@/models/User';

const notification: NotificationHandlers['notification'] = async ({
    res,
    req,
}) => {

    try {
        await dbConnect()

        const _contracts = await Contract.find({
            // isDeleted: false
        }, 'customerId numberContract endDay')
        .populate({
            path: 'customerId',
            select: 'email',
            model: User
        });

         // create reusable transporter object using the default SMTP transport
        // let transporter = nodemailer.createTransport({
        //     host: "mail.datvietsoftware.com.vn",
        //     port: 25,
        //     secure: false, // true for 465, false for other ports
        //     auth: {
        //         user: 'lienhe@datvietsoftware.com.vn', // generated ethereal user
        //         pass: 'zaqdatvietmaicty@', // generated ethereal password
        //     },
        //     tls: {rejectUnauthorized:false},

            // host: "smtp.ethereal.email",
            // port: 587,
            // secure: false, // true for 465, false for other ports
            // auth: {
            //     user: testAccount.user, // generated ethereal user
            //     pass: testAccount.pass, // generated ethereal password
            // },
        // });

         // create reusable transporter object using the default SMTP transport
         let transporter = nodemailer.createTransport({
            // host: "mail.datvietsoftware.com.vn",
            // port: 25,
            // secure: false, // true for 465, false for other ports
            // auth: {
            //     user: 'lienhe@datvietsoftware.com.vn', // generated ethereal user
            //     pass: 'zaqdatvietmaicty@', // generated ethereal password
            // },
            // tls: {rejectUnauthorized:false},

            // pool: true,
            // service: 'Gmail',
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                // type: 'OAuth2',
                user: 'testnodemailer981@gmail.com', //testAccount.user, // generated ethereal user
                pass: 'testNODEMAILSER981', //testAccount.pass, // generated ethereal password
                // // accessToken: 'ya29.a0AfH6SMC-6xeClzuq4X_S-zTeYoSAkdAXJOJQhVPjmPkixQVqnOaDRq30kOZOTFisu9IiEPI8T6oIVIUE_UN2RTuDix--l70jflzph-373grB58JZc57sdSkjDJiKX8j9OMnukJLZ_N6bz_kcata-CXC1XrZC8pz0swE4hAfbOvk',
                // // expires: 1612255679419 + 600000,
                // refreshToken: '1//04mdezG_eyEz_CgYIARAAGAQSNwF-L9IrQsxQKm_4cPrLDX6nQf5g8dtjlvpo6Gp_ZhUll8neqmefiHxqKDqnQHkcsAhE6bh_-v8',
                // clientId: '100215648771-bgpnvc6h59d2tjlc4uair31ou0eufsv2.apps.googleusercontent.com',
                // clientSecret: '5QWmE-btdWJBMPXs9yn9HYkZ',
                // // accessUrl: 'https://oauth2.googleapis.com/token',
            },
        });

        // for (let i = 0; i < _contracts.length; i++) {
        //          let currentDate = new Date().valueOf();
        //         let endDay = new Date(_contracts[i].endDay).valueOf();
        //         let expire  = new Date(_contracts[i].endDay)
            
        //         const diffTime = (endDay - currentDate);
        //         const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

        //         console.log(_contracts[i].customerId.email);

        //         if ( diffDays === 30) {
                    
        //             // send email
        //             let html = `<p>Hi ${_contracts[i].customerId[0].email}</p>
        //                         <p>This is a reminder that the "${_contracts[i].numberContract}" contract of account ${_contracts[i].customerId[0].email} will expire at 
        //                         ${expire.getDate()}-${expire.getMonth() + 1}-${expire.getFullYear()} ${expire.getHours()}:${expire.getMinutes()}.</p>`


        //             // send mail with defined transport object
        //             let info =  transporter.sendMail({
        //                 from: '"DatViet Software 👻" <lienhe@datvietsoftware.com.vn>', //'"Fred Foo 👻" <foo@example.com>', // sender address
        //                 to: `thanhcrthai@gmail.com, ${_contracts[i].customerId[0].email}`, //"bar@example.com, baz@example.com", // list of receivers
        //                 subject: "Hello ✔", // Subject line
        //                 // text: "Hello world?", // plain text body
        //                 // html: `<b>Hello world?</b>
        //                 //     <h1>New Password<h1>
        //                 //     <h2>${newPassword}<h2>
        //                 // `, // html body
        //                 html: html,
        //             });

                
        //         }
        // }

        // await Promise.all(_contracts.map(async element => {
        //     let currentDate = new Date().valueOf();
        //     let endDay = new Date(element.endDay).valueOf();
        //     let expire  = new Date(element.endDay)
          
        //     const diffTime = (endDay - currentDate);
        //     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

        //     console.log(element.customerId.email);

        //     if ( diffDays === 30) {
                   
        //         // send email
        //         let html = `<p>Hi ${element.customerId.email}</p>
        //                     <p>This is a reminder that the "${element.numberContract}" contract of account ${element.customerId.email} will expire at 
        //                     ${expire.getDate()}-${expire.getMonth() + 1}-${expire.getFullYear()} ${expire.getHours()}:${expire.getMinutes()}.</p>`


        //         // send mail with defined transport object
        //         let info =  transporter.sendMail({
        //             from: '"DatViet Software 👻" <lienhe@datvietsoftware.com.vn>', //'"Fred Foo 👻" <foo@example.com>', // sender address
        //             to: `thanhcrthai@gmail.com, ${element.customerId.email}`, //"bar@example.com, baz@example.com", // list of receivers
        //             subject: "Hello ✔", // Subject line
        //             // text: "Hello world?", // plain text body
        //             // html: `<b>Hello world?</b>
        //             //     <h1>New Password<h1>
        //             //     <h2>${newPassword}<h2>
        //             // `, // html body
        //             html: html,
        //         });

               
        //     }
        // }))

        // forEach(_contracts, element => {
        //     let currentDate = new Date().valueOf();
        //     let endDay = new Date(element.endDay).valueOf();
        //     let expire  = new Date(element.endDay)
          
        //     const diffTime = (endDay - currentDate);
        //     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

        //     if ( diffDays === 30) {
                   
        //         // send email
        //         let html = `<p>Hi ${element.customerId.email}</p>
        //                     <p>This is a reminder that the "${element.numberContract}" contract of account ${element.customerId.email} will expire at 
        //                     ${expire.getDate()}-${expire.getMonth() + 1}-${expire.getFullYear()} ${expire.getHours()}:${expire.getMinutes()}.</p>`


        //         // send mail with defined transport object
        //         let info =  transporter.sendMail({
        //             from: '"DatViet Software 👻" <lienhe@datvietsoftware.com.vn>', //'"Fred Foo 👻" <foo@example.com>', // sender address
        //             to: `thanhcrthai@gmail.com, ${element.customerId.email}`, //"bar@example.com, baz@example.com", // list of receivers
        //             subject: "Hello ✔", // Subject line
        //             // text: "Hello world?", // plain text body
        //             // html: `<b>Hello world?</b>
        //             //     <h1>New Password<h1>
        //             //     <h2>${newPassword}<h2>
        //             // `, // html body
        //             html: html,
        //         });

               
        //     }
        
        // })
       
        return res.status(200).json({
            data: null,
        });
       
    } catch (error) {
        return res.status(500).json({
            data: null,
            errors: [{ message: error.message }],
        });
    }
}

export default notification