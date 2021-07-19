import dbConnect from '@/utils/dbConnect';
import User, { UserDocument } from '@/models/User';
import type { UsersHandlers } from '../changePassword';
import validator from "validator";
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

// Return all employees info
const changePassword: UsersHandlers['changePassword'] = async ({
  res,
  req,
  body,
  // config,
}) => {
  let result: { data?: UserDocument[] } = {}
  
  try {
    await dbConnect()

    const email = req.body.email;
    const currentPassword = req.body.password;
    const newPassword = req.body.new_password;
    const newPasswordConfirm = req.body.new_password_confirm;

    if (!email || !validator.isEmail(email)) {
        return res.status(400).json({
          data: null,
          errors: [{message: "Email không hợp lệ"}],
        })    
    }
  
    if (!currentPassword) {
        return res.status(400).json({
            data: null,
            errors: [{message: "currentPassword không xác định"}],
        })
    }
  
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
        email: email,
        isDeleted: false
      });
  
      if (!user) {
        return res.status(400).json({
          data: null,
          errors: [{ message: 'Không tìm thấy địa chỉ mail ' + email }],
        });
      }
  
      const isValidPassword = await user.comparePassword(currentPassword)
  
      // Validate password
      if (!isValidPassword) {
        return res.status(400).json({
          data: null,
          errors: [{ message: 'Mật khẩu không đúng.' }],
        });
      }

      //Set the new password
      user.password = newPassword;

      // Save the updated user object
      await user.save();
   
    
  } catch (error) {
    return res.status(400).json({
      data: null,
      errors: [{message: error.message}],
    });
  }

    return res.status(200).json({
        data: null,
        errors: [{message: 'Đổi mật khẩu thành công.'}],    
    });
  

}

export default changePassword