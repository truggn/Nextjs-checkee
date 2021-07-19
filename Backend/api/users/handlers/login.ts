import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';
import { serialize } from 'cookie';
import type { UsersHandlers } from '../login';

const loginHandler: UsersHandlers['login'] = async ({
  res,
  //req,
  body: { email, password },
  // config,
}) => {
  // TODO: Add proper validations with something like Ajv
  if (!(email && password)) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }
  // TODO: validate the password and email
  // Passwords must be at least 8 characters and contain both alphabetic
  // and numeric characters.

  try {
    await dbConnect()

    const user = await User.findOne({
      email,
      isDeleted: false
    });

    if (!user) {
      return res.status(400).json({
        data: null,
        errors: [{ message: 'Không tìm thấy địa chỉ mail ' + email }],
      });
    }
    const checkLock = await User.findOne({
      email,
      locked: true
    })
    if (checkLock) {
      return res.status(400).json({
        data: null,
        errors: [{
          message: 'Tài khoản này đã bị khóa.'
        }]
      })
    }
    const isValidPassword = await user.comparePassword(password)

    // Validate password
    if (!isValidPassword) {

      // cập nhật collection passwordFailures + 1 vào db sau khi login sai passworld
      await User.findOneAndUpdate({ email: email }, { passwordFailures: user.passwordFailures + 1 }, { new: true })

      // check nếu passwordFailures === 5 thì thực hiện lock account đó.
      if (user.passwordFailures >= 4) {
        await User.findOneAndUpdate({ email: email }, {
          locked: true
        }, { new: true });
        return res.status(400).json({
          data: null,
          errors: [{ message: `Password không hợp lệ. Bạn đã nhập sai ${user.passwordFailures + 1} lần, hiện tài khoản sẽ bị khóa. ` }],
        });
      }
      return res.status(400).json({
        data: null,
        errors: [{ message: `Password không hợp lệ.` }],
      });
    }

    // update lại passwordFailures = 0 khi login đúng.
    if (user.passwordFailures >= 1) {
      await User.findOneAndUpdate({ email: email }, { passwordFailures: 0 }, { new: true })
    }

    const jwt = user.generateJWT()


    res.setHeader('Set-Cookie', serialize('user-token', jwt, {
      httpOnly: true,
      maxAge: 604800, // 1 week
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      path: '/'
    }))

    return res.status(200).json({ data: { 'user-token': jwt } })
  } catch (error) {
    return res.status(500).json({
      data: null,
      errors: [{ message: error.message }],
    });
  }
}

export default loginHandler