 
import dbConnect from '@/utils/dbConnect';
import Product, { ProductDocument } from '@/models/Product';
import type { ProductHandlers } from 'Backend/api/product/getProductByType';

const getProductByType : ProductHandlers['getProductByType'] = async ({
  res,
  req,
}) => {
  let result: { data?: ProductDocument[] } = {}
  try{
    
    await dbConnect()
    result.data = await Product.find({
        productTypeId: req.query.id,
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

export default getProductByType