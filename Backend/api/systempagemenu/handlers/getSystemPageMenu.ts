import dbConnect from '@/utils/dbConnect';
import SystemPageMenu, { SystemPageMenuDocument } from '@/models/SystemPageMenu';
import type { SystemPageMenuHandlers } from '..';

const getSystemPageMenu : SystemPageMenuHandlers['getSystemPageMenu']= async({
    req,
    res,
    body
})=>{
    await dbConnect();
    let result: { data?: SystemPageMenuDocument[] } = {}
    try{
        result.data = await SystemPageMenu.find().sort({
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
export default getSystemPageMenu