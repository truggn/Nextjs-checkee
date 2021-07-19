import dbConnect from '@/utils/dbConnect';
import SystemPage, { SystemPageDocument } from '@/models/SystemPage';
import type { SystemPageIdHandlers } from 'Backend/api/systempage/indexId'

const getSystemPageById : SystemPageIdHandlers['getSystemPageById'] = async({
    res,
    req,
    body,
})=>{
    await dbConnect();
    let result: { data: SystemPageDocument | null } = { data: null }
    try{
        result.data = await SystemPage.findById(req.query.id)
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
}
export default getSystemPageById