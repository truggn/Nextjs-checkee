import dbConnect from '@/utils/dbConnect';
import UserType, { UserTypeDocument } from '@/models/UserType';
import type { UserTypeHandlers } from '..';
import User from '@/models/User';
const createUserType : UserTypeHandlers['createUserType']= async ({
    res,
    req,
    body
}) =>{
    let result : { data?: UserTypeDocument[]}={}
    try{
        await dbConnect();
        const chkUser = await User.findOne({
            _id:body.objectId
        })
        if(!chkUser){
            return res.status(400).json({
                data:null,
                errors :[{message:"không tìm thấy User"}]
            })
        }
        const createData = await UserType.create(body)
        result.data = await UserType.find({
            _id:createData.id
        })
        if(!result.data){
            return res.status(400).json({
                data:null,
                errors:[{message:"tạo mới không thành công"}]
            })
        }else{
            return res.status(200).json({
                data:result.data,
                errors:[{message:"tạo mới thành công"}]
            })
        }


    }catch (error) {
    return res.status(500).json({
      data: null,
      errors: [{message: error.message}],
    });
  }
}
export default createUserType