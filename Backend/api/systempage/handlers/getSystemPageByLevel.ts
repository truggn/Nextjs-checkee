import dbConnect from '@/utils/dbConnect';
import SystemPage, { SystemPageDocument } from '@/models/SystemPage';
import type { SystemPageByLevelHandlers } from 'Backend/api/systempage/getbylevel'

const getSystemPageByLevel : SystemPageByLevelHandlers['getSystemPageByLevel'] = async({
    res,
    req,
    body,
})=>{
    await dbConnect();

    

    // return res.status(200).json({
    //     data: null,
    //     errors: [{message: 'test'}]
    // })

    let result: { data?: SystemPageDocument[] } = {}
    try{
        const _level = req.query
        const __level = Number(_level.type)

        result.data = await SystemPage.find({
            level: Number(req.query.type)
        })
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
export default getSystemPageByLevel