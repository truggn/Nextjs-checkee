import dbConnect from '@/utils/dbConnect';
import UserType, { UserTypeDocument } from '@/models/UserType';
import type { UserTypeHandlers } from 'Backend/api/usertype/indexId'
import User from '@/models/User';

const updateUserType : UserTypeHandlers['updateUserType'] = async({
    res,
    req,
    body,
})=>{
    let result: { data: UserTypeDocument | null } = { data: null }
    try{
        await dbConnect();
        if(body.objectId){
            const chkUser = await User.findOne({
                _id:body.objectId
            })
            if(!chkUser){
                return res.status(400).json({
                    data:null,
                    errors:[{message:"ko tìm thấy user"}]
                })
            }
        }
        result.data = await UserType.findOneAndUpdate({
            _id:req.query.id,
        },{
            $set:{name : body.name,
                note : body.note,
                orderNo : body.orderNo,
                objectId: body.objectId,
                updatedBy : body.updatedBy
                
    
            }
            
        },{new : true})
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
export default updateUserType