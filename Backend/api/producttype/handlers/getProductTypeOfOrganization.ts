import dbConnect from '@/utils/dbConnect';
import type { ProductTypeHandlers } from '../getProductTypeOfOrganization';
import ProductType from '@/models/ProductType';


// Return all Participants info
const getProductTypeOfOrganization: ProductTypeHandlers['getProductTypeOfOrganization'] = async ({
  res,
  req,
  // body,
  // config,
}) => {
  try {
    await dbConnect()

    const _data = await ProductType.find({
      organizationId: req.query.organizationId,
      isDeleted: false,
    })

    if (!_data || _data === null) {
      return res.status(400).json({
        data: null,
        errors: [{ message: 'ProductType không tồn tại' }],
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

export default getProductTypeOfOrganization