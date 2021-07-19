import dbConnect from '@/utils/dbConnect';
import Flow, { FlowDocument } from '@/models/Flow';
import type { FlowHandlers } from '..';
import Participant from '@/models/Participant';
import ProductAttributes from '@/models/ProductAttributes';
import User from '@/models/User';
import ProductFlow from '@/models/ProductFlow';


// Return all employees info
const createFlow: FlowHandlers['createFlow'] = async ({
  res,
  req,
  body: { productFlowId, participantId, productAttributes, createdBy }
}) => {
  let result: { data: FlowDocument[] } = { data: [] }

  try {
    await dbConnect()

    const data = {
      productFlowId: productFlowId,
      participantId: participantId,
      productAttributes: productAttributes,
      createdBy: createdBy
    }

    const _ProductFlow = await ProductFlow.findOne({
      _id: productFlowId,
    })

    if (!_ProductFlow) {
      return res.status(400).json({
        data: null,
        errors: [{ message: `productFlowId ${productFlowId} không xác định.` }],
      });
    }

    const _Participant = await Participant.findOne({
      _id: participantId,
    })

    if (!_Participant) {
      return res.status(400).json({
        data: null,
        errors: [{ message: `participantId ${participantId} không xác định.` }],
      });
    }

    if (createdBy) {
      const _createdBy = await User.findOne({
        _id: createdBy,
      })

      if (!_createdBy) {
        return res.status(400).json({
          data: null,
          errors: [{ message: `createdBy ${_createdBy} không xác định.` }],
        });
      }
    }

    let flag = 0;

    if (productAttributes) {
      await Promise.all(productAttributes.map(async productAttributes => {
        const _ProductAttributes = await ProductAttributes.findOne({
          _id: productAttributes,
        })

        if (!_ProductAttributes) {
          flag = 1;
          return res.status(400).json({
            data: null,
            errors: [{ message: `productAttributeId không xác định.` }],
          });
        }
      }))
    }


    if (flag === 0) {
      const createdFlow = await Flow.create(data);
      result.data[0] = createdFlow;
      return res.status(200).json({ data: result.data })
    }

  } catch (error) {
    return res.status(500).json({
      data: null,
      errors: [{ message: error.message, code: "err002" }],
    });
  }

}

export default createFlow