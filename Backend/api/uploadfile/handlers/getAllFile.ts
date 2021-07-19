import dbConnect from '@/utils/dbConnect';
import UploadFile, { UploadFileDocument } from '@/models/UploadFile';
import type { UploadfileHandlers } from '..';
import UserDocument from '@/models/User'



const getAllFile: UploadfileHandlers['getAllFile'] = async ({
  res,
  req,
  body,
}) => {
  let result: { data: UploadFileDocument[] | null } = { data: null }
  try {
    await dbConnect()
    result.data = await UploadFile.find({
    }).populate({
      path: 'createdBy',
      select: 'email',
      model: UserDocument

    }).sort({
      createdAt: "desc",
    }).lean();

    if (!result.data) {
      return res.status(400).json({
        data: null,
        errors: [{ message: "lấy danh sách không thành công" }]
      })
    }
    else {

      return res.status(200).json({
        data: result.data,
        errors: [{ message: "lấy danh sách  thành công" }]
      })
    }


  } catch (error) {
    return res.status(500).json({
      data: null,
      errors: [{ message: error.message }],
    });
  }
}

export default getAllFile