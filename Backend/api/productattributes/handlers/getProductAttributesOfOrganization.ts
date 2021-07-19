import dbConnect from '@/utils/dbConnect';
import type { ProductAttributesHandlers } from '../getProductAttributesOfOrganization';
import ProductAttributes from '@/models/ProductAttributes';


// Return all Participants info
const getProductAttributesOfOrganization: ProductAttributesHandlers['getProductAttributesOfOrganization'] = async ({
  res,
  req,
  // body,
  // config,
}) => {
  try {
    await dbConnect()

    const _data = await ProductAttributes.find({
      organizationId: req.query.organizationId
    }).where({ isDeleted: false })

    if (!_data || _data === null) {
      return res.status(400).json({
        data: null,
        errors: [{ message: 'ProductAttributes không tồn tại' }],
      });
    }

    return res.status(200).json({
      data: _data,
    });

  } catch (error) {
    return res.status(400).json({
      data: null,
      errors: [{ message: error.message, code: "err002" }],
    });
  }

}

export default getProductAttributesOfOrganization