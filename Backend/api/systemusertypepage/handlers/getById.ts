 
import dbConnect from '@/utils/dbConnect';
import SystemUserTypePage, { SystemUserTypePageDocument } from '@/models/SystemUserTypePage';
import type { SystemUserTypePageHandlers } from 'Backend/api/systemusertypepage/indexId'
const getById : SystemUserTypePageHandlers['getById'] = async ({
  res,
  req,
  body,
}) => {
  let result: { data: SystemUserTypePageDocument | null } = { data: null }
  try {
    await dbConnect();
    result.data = await SystemUserTypePage.findById({
        _id : req.query.id
    })
    if(!result.data){
        return res.status(400).json({
            data : null,
            errors:[{message:"không tìm thấy SystemUserTypePage"}]
        })
    }else{
        return res.status(200).json({
            data:result.data,
        })
    }
  } catch (error) {
    return res.status(500).json({
      data: null,
      errors: [{message: error.message}],
    });
  }
}

export default getById