 
import dbConnect from '@/utils/dbConnect';
import SystemUserTypePage, { SystemUserTypePageDocument } from '@/models/SystemUserTypePage';
import type { SystemUserTypePageHandlers } from '..';
import SystemPage from '@/models/SystemPage';
const createSystemUserTypePage : SystemUserTypePageHandlers['createSystemUserTypePage'] = async ({
  res,
  req,
  body,
}) => {
  let result: { data?: SystemUserTypePageDocument[] } = {}
  try {
    await dbConnect()
    if(body.parentId){
        const chkparentId = await SystemPage.findOne({
            _id : body.parentId,
        })
        if(!chkparentId){
            return res.status(400).json({
                data : null,
                errors : [{message:"ko tồn tại parentId"}]
            })
        }
    }
    if(body.pageId){
        const chkpage = await SystemPage.findOne({
            _id : body.pageId,
        })
        if(!chkpage){
            return res.status(400).json({
                data : null,
                errors : [{message:"ko tồn tại chkpage"}]
            })
        }
    }
    const createData =await SystemUserTypePage.create(body)
    if(!createData){
        return res.status(400).json({
            data : null,
            errors:[{message:"tạo mới không thành công"}]
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

export default createSystemUserTypePage