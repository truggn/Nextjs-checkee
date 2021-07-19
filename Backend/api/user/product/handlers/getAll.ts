 
import dbConnect from '@/utils/dbConnect';
import Product, { ProductDocument } from '@/models/Product';
import type { ProductHandlers } from '..';

const getAll : ProductHandlers['getAll'] = async ({
  res,
  req,
  body,
}) => {
  let result: { data?: ProductDocument[] } = {}
  try{
    await dbConnect()
    result.data = await Product.find({ 
    }).sort({
        createdAt: "desc",
      }).lean();
}catch(error){
    return res.status(500).json({
        data:null,
        errors:[{message:error.message}]
    })
}
return res.status(200).json({ data: result.data ?? null })
}

export default getAll