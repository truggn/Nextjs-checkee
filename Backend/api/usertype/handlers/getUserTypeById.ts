import dbConnect from '@/utils/dbConnect';
import UserType, { UserTypeDocument } from '@/models/UserType';
import type { UserTypeHandlers } from 'Backend/api/usertype/indexId'


const getUserTypeById : UserTypeHandlers['getUserTypeById'] = async({
    res,
    req,
    body,
})=>{
    let result: { data: UserTypeDocument | null } = { data: null }
    try{
        await dbConnect();
        result.data = await UserType.findById(req.query.id)
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
export default getUserTypeById