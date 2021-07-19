import dbConnect from '@/utils/dbConnect';
import SystemPageMenu, { SystemPageMenuDocument } from '@/models/SystemPageMenu';
import type { SystemPageMenuHandlers } from '..';
import SystemPage from '@/models/SystemPage';
const createSystemPageMenu : SystemPageMenuHandlers['createSystemPageMenu']= async ({
    res,
    req,
    body
}) =>{
    let result : { data?: SystemPageMenuDocument[]}={}
    try{
        await dbConnect();
        const chkParentId = await SystemPage.findOne({
            _id:body.pageId
        })
        if(!chkParentId){
            return res.status(400).json({
                data:null,
                errors :[{message:"không tìm thấy pageId"}]
                
            })
        }
        const createData = await SystemPageMenu.create(body)
        result.data = await SystemPageMenu.find({
            _id:createData.id
        })
        if(!createData){
            return res.status(400).json({
                data:null,
                errors:[{message:"tạo mới không thành công"}]
            })
        }else{
            return res.status(200).json({
                data:result.data,
                errors:[{message:"tạo mới thành công"}]
            })
        }


    }catch (error) {
    return res.status(500).json({
      data: null,
      errors: [{message: error.message}],
    });
  }
}
export default createSystemPageMenu