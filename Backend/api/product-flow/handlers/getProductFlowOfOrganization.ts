import dbConnect from '@/utils/dbConnect';
import ProductFlow, { ProductFlowDocument } from '@/models/ProductFlow';
import type { ProductFlowHandlers } from '../getProductFlowOfOrganization';
import Organization from '@/models/Organization';
import ProductType from '@/models/ProductType';
import Flow from '@/models/Flow';


// Return all Participants info
const getProductFlowOfOrganization: ProductFlowHandlers['getProductFlowOfOrganization'] = async ({
  res,
  req,
  // body,
  // config,
}) => {
  let result: { data?: ProductFlowDocument[] } = {}

  try {
    await dbConnect()

    result.data = await ProductFlow.find({
      organizationId: req.query.organizationId,
    })
      .where({ isDeleted: false })
      .populate({
        path: 'productTypeId',
        select: 'code name',
        model: ProductType,
      })
      .populate({
        path: 'organizationId',
        select: 'email',
        model: Organization,
      })
      .populate({
        path: 'flow',
        model: Flow,
      })


    if (!result.data || result.data === null) {
      return res.status(400).json({
        data: null,
        errors: [{ message: 'ProductFlow không tồn tại' }],
      });
    }

  } catch (error) {
    return res.status(400).json({
      data: null,
      errors: [{ message: error.message, code: "err002" }],
    });
  }


  return res.status(200).json({ data: result.data ?? null })
}

export default getProductFlowOfOrganization