 
import dbConnect from '@/utils/dbConnect';
import SystemPage, { SystemPageDocument } from '@/models/SystemPage';
import type { SystemPageHandlers } from '..';

const createSystemPage : SystemPageHandlers['createSystemPage'] = async ({
  res,
  req,
  body,
}) => {
  let result: { data?: SystemPageDocument[] } = {}
  try {
    await dbConnect()
    const chkName = await SystemPage.findOne({
        name : body.name,
        isDeleted : false
    })
    if(chkName){
        return res.status(400).json({
            data : null,
            errors : [{message:"tên đã tồn tại"}]
        })
    }
    const createData =await SystemPage.create(body)
    result.data = await SystemPage.find({
      _id:createData.id
    })
    
    if(!result.data.length){
        return res.status(400).json({
            data : null,
            errors:[{message:"tạo mới không thành công"}]
        })
    }else{
        return res.status(200).json({
          data: result.data,
          errors:[{message:"tạo mới thành công"}]
        })
    }
    
  } catch (error) {
    return res.status(500).json({
      data: null,
      errors: [{message: error.message}],
    });
  }
  

   return res.status(200).json({ data:null, errors: [{message: "tạo mới thành công"}],
    })
}

export default createSystemPage