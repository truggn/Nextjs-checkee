import dbConnect from '@/utils/dbConnect';
import Flow, { FlowDocument } from '@/models/Flow';
import type { FlowHandlers } from '../id';
import Participant from '@/models/Participant';
import ProductFlow from '@/models/ProductFlow';
import ProductAttributes from '@/models/ProductAttributes';

// Return all Participants info
const getFlowById: FlowHandlers['getFlowById'] = async ({
  res,
  req,
  // body,
}) => {
  let result: { data?: FlowDocument } = {}

  try {
    await dbConnect()

    const foundFlow = await Flow.findOne({
      _id: req.query.id
    })
      .where({ isDeleted: false })
      .populate({
        path: 'productFlowId',
        select: 'code name',
        model: ProductFlow,
      })
      .populate({
        path: 'participantId',
        select: 'email',
        model: Participant,
      })
      .populate({
        path: 'productAttributes',
        model: ProductAttributes,
      });


    if (!foundFlow) {
      return res.status(400).json({
        data: null,
        errors: [{ message: 'Flow không tồn tại' }],
      });
    }

    result.data = foundFlow

  } catch (error) {
    return res.status(400).json({
      data: null,
      errors: [{ message: error.message, code: "err002" }],
    });
  }

  return res.status(200).json({ data: result.data })

}

export default getFlowById