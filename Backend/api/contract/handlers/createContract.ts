 
import dbConnect from '@/utils/dbConnect';
import Contract, { ContractDocument } from '@/models/Contract';
import type { ContractHandlers } from '..';
var WordExtractor = require("word-extractor");
const createContract : ContractHandlers['createContract'] = async ({
  res,
  req,
  body,
}) => {
  let result: { data?: ContractDocument[] } = {}
  try {
    await dbConnect()
    if (!body.fileDoc) return res.status(400).json({
      data: null,
      errors: [{ message: "Khong upload duoc" }]
    })
    var extractor = new WordExtractor();
    var extracted = extractor.extract(body.fileDoc);
    console.log(extracted)
    if(body.numberContract){
        const data = await Contract.findOne({
            numberContract : body.numberContract
        })
        if(data){
            return res.status(400).json({
                data: null,
                errors: [{message:"số hợp đồng đã tồn tại . Vui lòng nhập số khác"}]
            })
        }
    }
    const createData =await Contract.create(body)
    result.data = await Contract.find({
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
  

  //  return res.status(200).json({ data:null, errors: [{message: "tạo mới thành công"}],
  //   })
}

export default createContract