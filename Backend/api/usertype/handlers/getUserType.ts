import dbConnect from '@/utils/dbConnect';
import UserType, { UserTypeDocument } from '@/models/UserType';
import type { UserTypeHandlers } from '..';
const getUserType : UserTypeHandlers['getUserType']= async ({
    res,
    req,
    body
}) =>{
    let result : { data?: UserTypeDocument[]}={}
    try{
        await dbConnect();
        result.data = await UserType.find().sort({
            createdAt: "desc",
          }).lean();
        if(!result.data){
            return res.status(400).json({
                data:null,
                errors :[{message:"không tìm thấy UserType"}]
            })
        }
        else{
            return res.status(200).json({
                data :result.data ?? null
            })
        }


    }catch (error) {
    return res.status(500).json({
      data: null,
      errors: [{message: error.message}],
    });
  }
}
export default getUserType