import dbConnect from '@/utils/dbConnect';
import ProductFlow, { ProductFlowDocument } from '@/models/ProductFlow';
import type { ProductFlowHandlers } from '..';


// Return all Participants info
const getAllProductFlow: ProductFlowHandlers['getAllProductFlow'] = async ({
  res,
  // req,
  // body,
  // config,
}) => {
  let result: { data?: ProductFlowDocument[] } = {}

  try {
    await dbConnect()

    result.data = await ProductFlow.find({})
      .where({ isDeleted: false })
      .populate({
        path: 'productTypeId',
        select: 'name code',
      })
      .populate({
        path: 'organizationId',
        select: 'name_customer code',
      })
      .sort({
        createdAt: "desc",
      })
      .lean();

  } catch (error) {
    return res.status(400).json({
      data: null,
      errors: [{ message: error.message, code: "err002" }],
    });
  }


  return res.status(200).json({ data: result.data ?? null })
}

export default getAllProductFlow