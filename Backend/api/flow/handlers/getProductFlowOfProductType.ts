import dbConnect from '@/utils/dbConnect';
import ProductFlow, { ProductFlowDocument } from '@/models/ProductFlow';
import type { ProductFlowHandlers } from '../getProductFlowOfProductType';
import Participant from '@/models/Participant';
import ProductAttributes from '@/models/ProductAttributes';
import Organization from '@/models/Organization';
import ProductType from '@/models/ProductType';


// Return all Participants info
const getProductFlowOfProductType: ProductFlowHandlers['getProductFlowOfProductType'] = async ({
  res,
  req,
  // body,
  // config,
}) => {
  let result: { data?: ProductFlowDocument[] } = {}

  try {
    await dbConnect()

    result.data = await ProductFlow.find({
      productTypeId: req.query.productTypeId,
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
        path: 'flow.participantId',
        select: 'email',
        model: Participant,
      })
      .populate({
        path: 'flow.productAttributes.productAttributeId',
        select: 'key type',
        model: ProductAttributes,
      });

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

export default getProductFlowOfProductType