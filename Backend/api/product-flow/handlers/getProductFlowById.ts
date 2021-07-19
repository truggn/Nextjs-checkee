import dbConnect from '@/utils/dbConnect';
import ProductFlow, { ProductFlowDocument } from '@/models/ProductFlow';
import type { ProductFlowHandlers } from '../id';
import Participant from '@/models/Participant';
import Flow from '@/models/Flow';


// Return all Participants info
const getProductFlowById: ProductFlowHandlers['getProductFlowById'] = async ({
  res,
  req,
  // body,
  // config,
}) => {
  let result: { data: ProductFlowDocument | null } = { data: null }

  try {
    await dbConnect()

    result.data = await ProductFlow.findOne({
      _id: req.query.id
    }, 'code name')
      .where({ isDeleted: false })
      .populate({
        path: 'flow',
        populate: {
          path: 'participantId',
          // select: 'code email',
          model: Participant
        },
        model: Flow
      })

    // .populate({
    //   path: 'flow',
    //   select: 'email',
    //   model: Flow,
    // })

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

export default getProductFlowById