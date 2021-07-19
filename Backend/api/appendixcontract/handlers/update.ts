 
import dbConnect from '@/utils/dbConnect';
import AppendixContract, { AppendixContractDocument } from '@/models/AppendixContract';
import type { AppendixContractHandlers } from 'Backend/api/appendixcontract/indexId';

const update : AppendixContractHandlers['update'] = async ({
  res,
  req,
  body,
}) => {
    let result: { data: AppendixContractDocument | null } = { data: null }
    const update = req.body.update
    try{
        await dbConnect();
        const chkContract = await AppendixContract.findOne({
            _id : req.query.id,
        })
        if(!chkContract){
            return res.status(400).json({
                data: null,
                errors:[{message:"ko tìm thấy Contract"}]
            })
        }
        result.data = await AppendixContract.findOneAndUpdate({
            _id:req.query.id,
        },update,{new:true})
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

export default update