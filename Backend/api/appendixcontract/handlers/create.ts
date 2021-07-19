 
import dbConnect from '@/utils/dbConnect';
import AppendixContract, { AppendixContractDocument } from '@/models/AppendixContract';
import type { AppendixContractHandlers } from '..';

const create : AppendixContractHandlers['create'] = async ({
  res,
  req,
  body,
}) => {
  let result: { data?: AppendixContractDocument[] } = {}
  try {
    await dbConnect()
    const createData =await AppendixContract.create(body)
    result.data = await AppendixContract.find({
      _id:createData.id
    })
    if(!createData){
        return res.status(400).json({
            data : null,
            errors:[{message:"tạo mới không thành công"}]
        })
    }else{
      return res.status(200).json({
        data : result.data,
        errors:[{message:"tạo mới  thành công"}]
    })
    }
    
  } catch (error) {
    return res.status(500).json({
      data: null,
      errors: [{message: error.message}],
    });
  }
  

  //  return res.status(200).json({ data:result.data, errors: [{message: "tạo mới thành công"}],
  //   })
}

export default create