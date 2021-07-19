import dbConnect from '@/utils/dbConnect';
import SystemPage, { SystemPageDocument } from '@/models/SystemPage'
import type {SystemPageIdHandlers} from 'Backend/api/systempage/indexId'

const deletedSystemPage : SystemPageIdHandlers['deletedSystemPage'] = async({
    res,
    req,
    body,
})=>{

    try{
        await dbConnect()
        const data = await SystemPage.deleteOne({
            _id : req.query.id
        })
        const chkSystemPage = await SystemPage.findOne({
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
    }catch(error){
        return res.status(500).json({
            data: null,
            errors: [{message: error.message}],
          });
    }
}
export default deletedSystemPage