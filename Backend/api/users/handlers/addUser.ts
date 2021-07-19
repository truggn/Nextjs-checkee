import dbConnect from '@/utils/dbConnect';
import User, { UserDocument } from '@/models/User';
import type { UsersHandlers } from '..';
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
const addUser: UsersHandlers['addUser'] = async ({
  res,
  req,
  body,
  // config,
}) => {
  let result: { data?: UserDocument[] } = {}

  try {
    await dbConnect()

    if (!body.email || !validator.isEmail(body.email)) {
      return res.status(400).json({
        data: null,
        errors: [{ message: "Email không hợp lệ" }],
      })
    }

    const regex = /^[a-z0-9\.@*]+$/;
    const checkRegex = regex.test(body.email)
    if (checkRegex === false) {
      return res.status(400).json({
          data: null,
          errors: [{
              message: 'Email không hợp lệ, vui lòng nhập email khác'
          }]
      })
    }

    if (!passSchema.validate(body.password)) {
      return res.status(400).json({
        data: null,
        errors: [{ message: "Mật khẩu phải dài 6-24 ký tự, bao gồm cả chữ cái và chữ số", code: "err001" }],
      })
    }

    // check email 
    const checkEmail = await User.find({ email: req.body.email })

    if (checkEmail.length > 0) {
      return res.status(400).json({
        data: null,
        errors: [{
          message: 'Email này đã được sử dụng.'
        }]
      })
    }

    // result.data = await User.create(body);

    // await result.data.save();

    const newUser = new User({
      ...req.body
    });

    result.data = await newUser.save();

    await User.find()

  } catch (error) {
    return res.status(400).json({
      data: null,
      errors: [{ message: error.message, code: "err002" }],
    });
  }


  return res.status(200).json({ data: result.data ?? null })
}

export default addUser