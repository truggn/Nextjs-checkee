import dbConnect from '@/utils/dbConnect';
import SystemPageMenu, { SystemPageMenuDocument } from '@/models/SystemPageMenu';
import type { SystemPageMenuHandlers } from 'Backend/api/systempagemenu/indexId';
import SystemPage from '@/models/SystemPage';
const deleteSystemPageMenu : SystemPageMenuHandlers['deleteSystemPageMenu']= async ({
    res,
    req,
    body
}) =>{
    let result : { data?: SystemPageMenuDocument}={}
    try{
        await dbConnect()
        const data = await SystemPageMenu.deleteOne({
            _id : req.query.id
        })
        const chkSystemPage = await SystemPageMenu.findOne({
            _id : req.query.id
        })
        if(chkSystemPage){
            return res.status(400).json({
                data:null,
                errors:[{message:"xóa không thành công"}]
            })
        }else{
            return res.status(200).json({
                data:null,
                errors:[{message:"xóa thành công"}]
            })
        }


    }catch (error) {
    return res.status(500).json({
      data: null,
      errors: [{message: error.message}],
    });
  }
}
export default deleteSystemPageMenu