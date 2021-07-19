import dbConnect from '@/utils/dbConnect';
import Product, { ProductDocument } from '@/models/Product';
import type { ProductHandlers } from 'Backend/api/product/getProductByCode';

const getProductByCode: ProductHandlers['getProductByCode'] = async ({
  res,
  req,
  body: { code }
}) => {
  let result: { data?: ProductDocument[] } = {}
  try {

    await dbConnect()
    result.data = await Product.find({
      code: code
    }).sort({
      createdAt: "desc",
    }).lean();
    return res.status(200).json({ data: result.data ?? null })
  } catch (error) {
    return res.status(500).json({
      data: null,
      errors: [{ message: error.message }]
    })
  }

}

export default getProductByCode