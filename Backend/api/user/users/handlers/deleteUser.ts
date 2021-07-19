import dbConnect from '@/utils/dbConnect';
import User, { UserDocument } from '@/models/User';
import type { UsersHandlers } from 'Backend/api/users/indexId';

const deleteUser: UsersHandlers['deleteUser'] = async ({
  res,
  req,
  body,
  // config,
}) => {
  let result: { data?: { ok?: number; n?: number; } & { deletedCount?: number; } } = {}

  try {
    await dbConnect()
    result.data = await User.findOneAndUpdate({
      _id: req.query.id
    }, { isDeleted: true }, { new: true })
    const data = await User.findOne({
      _id: req.query.id
    })
    if (data.isDeleted === false) {
      return res.status(400).json({
        data: null,
        errors: [{ message: "xóa ko thành công" }]
      })
    }
    else {
      return res.status(200).json({
        data: null,
        errors: [{ message: "xóa  thành công" }]
      })
    }
  } catch (error) {
    return res.status(400).json({
      data: null,
      errors: [{ message: error.message }],
    });
  }



}
export default deleteUser