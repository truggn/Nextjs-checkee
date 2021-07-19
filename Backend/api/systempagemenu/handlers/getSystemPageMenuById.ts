import dbConnect from '@/utils/dbConnect';
import SystemPageMenu, { SystemPageMenuDocument } from '@/models/SystemPageMenu';
import type { SystemPageMenuHandlers } from 'Backend/api/systempagemenu/indexId';

const getSystemPageMenuById : SystemPageMenuHandlers['getSystemPageMenuById']= async ({
    res,
    req,
    body
}) =>{
    // let result : { data?: SystemPageMenuDocument}={}
    try{
        await dbConnect();
    let result: { data: SystemPageMenuDocument | null } = { data: null }
    try{
        result.data = await SystemPageMenu.findById(req.query.id)
        if(!result.data){
            return res.status(400).json({
                data : null,
                errors:[{message:"không tìm thấy SystemPage"}]
            })
        }else{
            return res.status(200).json({
                data:result.data,
            })
        }
    }catch(error){
        return res.status(500).json({
            data:null,
            errors:[{message:error.message}]
        })
    }


    }catch (error) {
    return res.status(500).json({
      data: null,
      errors: [{message: error.message}],
    });
  }
}
export default getSystemPageMenuById