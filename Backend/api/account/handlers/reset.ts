import dbConnect from '@/utils/dbConnect';
import User, { UserDocument } from '@/models/User';
import type { UserHandlers } from '../id';


// Return all Participants info
const reset: UserHandlers['reset'] = async ({
  res,
  req,
  // body,
  // config,
}) => {
  let result: { data?: UserDocument } = {}
  
  try {
    await dbConnect()

    const token  = req.query.token.toString();

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

        //Redirect user to form with the email address
       
  } catch (error) {
    return res.status(500).json({
      data: null,
      errors: [{message: error.message, code: "err002"}],
    });
  }
  
  return res.status(200).json({
    data: null,
    errors: [{message: 'Token hợp lệ.'}],
});
}


export default reset