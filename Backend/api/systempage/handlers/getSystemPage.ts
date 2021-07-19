import dbConnect from '@/utils/dbConnect';
import SystemPage, { SystemPageDocument } from '@/models/SystemPage';
import type {SystemPageHandlers} from '..'
const getSystemPage : SystemPageHandlers['getSystemPage'] = async({
    res,
    req,
    body,
})=>{
    await dbConnect();
    let result: { data?: SystemPageDocument[] } = {}
    try{
        result.data = await SystemPage.find().sort({
            createdAt: "desc",
          }).lean();
    }catch(error){
        return res.status(500).json({
            data:null,
            errors:[{message:error.message}]
        })
    }
    return res.status(200).json({ data: result.data ?? null })
}
export default getSystemPage