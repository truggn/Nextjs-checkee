 
import dbConnect from '@/utils/dbConnect';
import SystemUserTypePage, { SystemUserTypePageDocument } from '@/models/SystemUserTypePage';
import type { SystemUserTypePageHandlers } from 'Backend/api/systemusertypepage/indexId'
import SystemPage from '@/models/SystemPage';
const update : SystemUserTypePageHandlers['update'] = async ({
  res,
  req,
  body,
}) => {
  let result: { data: SystemUserTypePageDocument | null } = { data: null }
  try {
    await dbConnect();
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
        result.data = await SystemUserTypePage.findOneAndUpdate({
            _id:req.query.id,
            isDeleted:false,
        },{
            $set:{
                userTypeId:body.userTypeId,
                parentId: body.parentId,
                pageId: body.pageId,
                updatedBy:body.updatedBy
            }
            
        },{new:true})
        if(!result.data){
            return res.status(400).json({
                data: null,
                errors:[{message:"cập nhật ko thành công"}]
            })
        }else{
            return res.status(200).json({
                data : result.data,
                errors:[{message:" cập nhật thành công"}]
            })
        }
    
  } catch (error) {
    return res.status(500).json({
      data: null,
      errors: [{message: error.message}],
    });
  }
}

export default update