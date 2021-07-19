import dbConnect from '@/utils/dbConnect';
import User, { UserDocument } from '@/models/User';
import type { UsersHandlers } from 'Backend/api/users/indexId';

const getUserById: UsersHandlers['getUserById'] = async ({
    res,
    req,
    body,
    // config,
  })=>{
    let result: { data?: UserDocument } = {}
  
  try {
    await dbConnect()
    result.data = await User.findById(req.query.id)
    if(!result.data){
        return res.status(400).json({
            data : null,
            errors:[{message:"ko tìm thấy user"}]
        })
    }
  } catch (error) {
    return res.status(400).json({
      data: null,
      errors: [{message: error.message}],
    });
  }
  

  return res.status(200).json({ data: result.data ?? null })
}
export default getUserById