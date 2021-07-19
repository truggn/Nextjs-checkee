import dbConnect from '@/utils/dbConnect';
import User, { UserDocument } from '@/models/User';
import type { UsersHandlers } from '..';

const getAllUser: UsersHandlers['getAllUser'] = async ({
    res,
    req,
    body,
    // config,
  })=>{
    let result: { data?: UserDocument[] } = {}
  
  try {
    await dbConnect()

    // result.data = await Employee.findOne({_id: '5ff2843c02a5e04f0c7c0c97'}).sort({
    //   createdAt: "desc",
    // });

    result.data = await User.find({}).sort({
      createdAt: "desc",
    });
  } catch (error) {
    return res.status(400).json({
      data: null,
      errors: [{message: error.message}],
    });
  }
  

  return res.status(200).json({ data: result.data ?? null })
}
export default getAllUser