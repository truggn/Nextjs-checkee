import dbConnect from '@/utils/dbConnect';
import UserType, { UserTypeDocument } from '@/models/UserType';
import type { UserTypeHandlers } from 'Backend/api/usertype/indexId'
import User from '@/models/User';

const deleteUserType : UserTypeHandlers['deleteUserType'] = async({
    res,
    req,
    body,
})=>{
    let result: { data?: UserTypeDocument } = {}
    try{
        await dbConnect()
        const data = await UserType.deleteOne({
            _id : req.query.id
        })
        const chkUserType = await UserType.findOne({
            _id : req.query.id
        })
        if(chkUserType){
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
            data:null,
            errors:[{message:error.message}]
        })
    }
}
export default deleteUserType