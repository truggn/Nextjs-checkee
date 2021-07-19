import dbConnect from '@/utils/dbConnect';
import SystemPage, { SystemPageDocument } from '@/models/SystemPage';
import type { SystemPageIdHandlers } from 'Backend/api/systempage/indexId'

const updateSystemPage : SystemPageIdHandlers['updateSystemPage'] = async({
    res,
    req,
    body,
})=>{
    let result: { data: SystemPageDocument | null } = { data: null }
    try{
        await dbConnect();
        const chkSystemPage = await SystemPage.findOne({
            _id : req.query.id,
            isDeleted:false
        })
        if(!chkSystemPage){
            return res.status(400).json({
                data: null,
                errors:[{message:"ko tìm thấy systemPage"}]
            })
        }
        result.data = await SystemPage.findOneAndUpdate({
            _id:req.query.id,
            isDeleted:false,
        },{
            $set:{name : body.name,
                icon : body.icon,
                status : body.status,
                controllerName: body.controllerName,
                actionName : body.actionName,
                url : body.url,
                orderNo : body.orderNo,
                parentId: body.parentId,
                updatedBy : body.updatedBy,
                level: body.level
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

    }catch(error){
        return res.status(500).json({
            data:null,
            errors:[{message:error.message}]
        })
    }
}
export default updateSystemPage