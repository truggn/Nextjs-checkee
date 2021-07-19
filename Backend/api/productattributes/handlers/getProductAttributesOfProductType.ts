import dbConnect from '@/utils/dbConnect';
import type { ProductAttributesHandlers } from '../getProductAttributesOfProductType';
import ProductAttributes, { ProductAttributesDocument } from '@/models/ProductAttributes';


// Return all Participants info
const getProductAttributesOfProductType: ProductAttributesHandlers['getProductAttributesOfProductType'] = async ({
  res,
  req,
  // body,
  // config,
}) => {
  let result: { data?: ProductAttributesDocument[] } = {}

  try {
    await dbConnect()

    result.data = await ProductAttributes.find({
      productTypeId: req.query.productTypeId
    }).where({ isDeleted: false })

    if (!result.data || result.data === null) {
      return res.status(400).json({
        data: null,
        errors: [{ message: 'ProductAttributes không tồn tại' }],
      });
    }

    return res.status(200).json({
      data: result.data,
    });

  } catch (error) {
    return res.status(400).json({
      data: null,
      errors: [{ message: error.message, code: "err002" }],
    });
  }

}

export default getProductAttributesOfProductType