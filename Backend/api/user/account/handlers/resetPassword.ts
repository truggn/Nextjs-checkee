import dbConnect from '@/utils/dbConnect';
import User, { UserDocument } from '@/models/User';
import type { UserHandlers } from '../id';
import nodemailer from 'nodemailer';
import passValidator from "password-validator"

const passSchema = new passValidator();
const passMinLen = 6;
const passMaxLen = 24;

// Scheme for password validation
// See ref https://github.com/tarunbatra/password-validator
passSchema
  .is().min(passMinLen)
  .is().max(passMaxLen)
  .has().letters()
  .has().digits();


// Return all Participants info
const resetPassword: UserHandlers['resetPassword'] = async ({
  res,
  req,
  // body,
  // config,
}) => {
  let result: { data?: UserDocument } = {}
  
  try {
    await dbConnect()

    const token  = req.query.token.toString();
    const newPassword = req.body.new_password;
    const newPasswordConfirm = req.body.new_password_confirm;

    if (!newPassword || newPassword !== newPasswordConfirm) {
        return res.status(400).json({
            data: null,
            errors: [{message: "Mật khẩu mới không chính xác."}],
        })
    }
    
    if (!passSchema.validate(newPassword)) {
        return res.status(400).json({
          data: null,
          errors: [{message: "Mật khẩu phải dài 6-24 ký tự, bao gồm cả chữ cái và chữ số", code:"err001"}],
        })  
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: {
        $gt: Date.now()
      },
      isDeleted: false
    });

    if (!user) {
        return res.status(401).json({
            data: null,
            errors: [{message: 'Token đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.'}],
        });
    }
    //Set the new password
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    // Save the updated user object
    await user.save();

    let testAccount = await nodemailer.createTestAccount();


    let html = `<p>Hi ${user.email}</p>
                <p>This is a confirmation that the password for your account ${user.email} has just been changed.</p>`

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
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: { 
            user: 'dvgroup.dev@gmail.com',
            pass: 'datviet123@'
        }
        // host: "smtp.ethereal.email",
        // port: 587,
        // secure: false, // true for 465, false for other ports
        // auth: {
        //     user: testAccount.user, // generated ethereal user
        //     pass: testAccount.pass, // generated ethereal password
        // },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"DatViet Software 👻" <lienhe@datvietsoftware.com.vn>', //'"Fred Foo 👻" <foo@example.com>', // sender address
        to: `${user.email}`, //"bar@example.com, baz@example.com", // list of receivers
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

    return res.status(200).json({ data: `Your password has been updated. Preview URL: ${nodemailer.getTestMessageUrl(info)}`})

    
  } catch (error) {
    return res.status(500).json({
      data: null,
      errors: [{message: error.message, code: "err002"}],
    });
  }
  
}

export default resetPassword