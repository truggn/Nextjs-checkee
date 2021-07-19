import dbConnect from '@/utils/dbConnect';
import ProductNBF, { ProductNBFDocument } from '@/models/ProductNBF';
import ProductType, { ProductTypeDocument } from '@/models/ProductType';
import Organization, { OrganizationDocument } from '@/models/Organization';
import type { ProductNBFHandlers } from '..';

const getAllProductNBF: ProductNBFHandlers['getAllProductNBF'] = async ({
  res,
  req,
  body,
}) => {
  let result: { data?: ProductNBFDocument[] } = {}
  try {
    await dbConnect();
    result.data = await ProductNBF.find({
    })
      .populate({ path: "organizationId", select: "name_customer", model: Organization })
      .populate({ path: "productTypeId", select: "name ", model: ProductType })
      .sort({
        createdAt: "desc",
      }).lean();
  } catch (error) {
    return res.status(500).json({
      data: null,
      errors: [{ message: error.message }]
    })
  }
  return res.status(200).json({ data: result.data ?? null })
}

export default getAllProductNBF