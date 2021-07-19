import dbConnect from '@/utils/dbConnect';
import type { ProductTypeHandlers } from '../getProductTypeOfOrganization';
import ProductType from '@/models/ProductType';
import Organization from '@/models/Organization';
import Category from '@/models/Category';


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
    .populate({
        path: 'categoryId',
        select: 'code name',
        model: Category
    })
    .populate({
        path: 'organizationId',
        select: 'name_customer code',
        model: Organization
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