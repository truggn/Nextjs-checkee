
import dbConnect from '@/utils/dbConnect';
import Contract, { ContractDocument } from '@/models/Contract';
import type { ContractHandlers } from '..';
import User from '@/models/User';

const getAllContract: ContractHandlers['getAllContract'] = async ({
  res,
  req,
  body,
}) => {
  await dbConnect();
  let result: { data: ContractDocument[] | null } = { data: null }
  try {
    // let data 
    result.data = await Contract.find().where({ isDeleted: false }).sort({
      createdAt: "desc",
    }).lean();
    // data = await Promise.all(data.map( async element =>{
    //     element.customerId = await User.findOne({
    //         _id : element.customerId
    //     })
    //     return element
    // }))
    if (!result.data) {
      return res.status(400).json({
        data: null,
        errors: [{ message: "ko tìm thấy dữ liệu" }]
      })
    } else {
      return res.status(200).json({
        data: result.data
      })
    }
  } catch (error) {
    return res.status(500).json({
      data: null,
      errors: [{ message: error.message }]
    })
  }
}

export default getAllContract