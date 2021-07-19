import dbConnect from '@/utils/dbConnect';
import ProductFlow, { ProductFlowDocument } from '@/models/ProductFlow';
import type { ProductFlowHandlers } from '..';
import Participant from '@/models/Participant';
import ProductAttributes from '@/models/ProductAttributes';
import Flow from '@/models/Flow';


//
const updateDProductFlowDocument: ProductFlowHandlers['updateDProductFlowDocument'] = async ({
  res,
  req,
  body,
  // config,
}) => {
  let result: { data: ProductFlowDocument[] } = { data: [] }
  
  try {
    await dbConnect()

    const productFlowID = req.body.productFlowID;

    const update = req.body.update;

    // if (update.email || update.email === '' || update.email === null ) {
    //     return res.status(400).json({
    //         data: null,
    //         errors: [{message: 'Không cho phép cập nhật email'}],
    //     });
    // }

    if (!productFlowID) {
        return res.status(400).json({
            data: null,
            errors: [{message: 'productFlowID không xác định'}],
        });
    } 

    // const _flows = [];
    if (update.flows) {
      update.flow =  await Promise.all(update.flows.map(async element => {
        if (element.flowId) {
          return element.flowId;
          // _flows.push(element.flowId)
        } else {
            const _ProductFlow = await ProductFlow.findOne({
              _id:  element.productFlowId,
            })
        
            if (!_ProductFlow) {
              return res.status(400).json({
                  data: null,
                  errors: [{ message: `productFlowId ${element.productFlowId} không xác định.` }],
              });
            }
        
            const _Participant = await Participant.findOne({
              _id:  element.participantId,
            })
        
            if (!_Participant) {
              return res.status(400).json({
                  data: null,
                  errors: [{ message: `participantId ${element.participantId} không xác định.` }],
              });
            }

            let flag = 0;

            // if (element.productAttributes) {
            //   await Promise.all(element.productAttributes.map(async productAttributes => {
            //     const _ProductAttributes = await ProductAttributes.findOne({
            //       _id:  productAttributes,
            //     })
            
            //     if (!_ProductAttributes) {
            //       flag = 1;
            //       return res.status(400).json({
            //           data: null,
            //           errors: [{ message: `productAttributeId ${productAttributes.productAttributeId} không xác định.` }],
            //       });
            //     }
            //   }))
            // }

            if (flag === 0) {
              const _flow = await Flow.create(element);
              return _flow._id
              // _flows.push(_flow._id);
            }
          }
      }))
    }

    // update.flow = _flows;

    const _productFlow = await ProductFlow.findOneAndUpdate({
        _id: productFlowID,
    }, update, {new: true})
    .populate({
      path: 'flow',
      populate: { 
        path: 'participantId',
        // select: 'code email',
        model: Participant
       },
      model: Flow
    })

    

    if (!_productFlow) {
        return res.status(400).json({
            data: null,
            errors: [{message: 'ProductFlow không tồn tại'}],
        });
    } else {
      await Flow.deleteMany({
        productFlowId: productFlowID,
        _id: { 
          $nin: update.flow 
        }
      });
    }

    result.data[0] = _productFlow;

   
    
  } catch (error) {
    return res.status(400).json({
      data: null,
      errors: [{message: error.message}],
    });
  }

    return res.status(200).json({
        data: result.data,
        errors: [{message: 'Cập nhật thành công.'}],    
    });
  

}


export default updateDProductFlowDocument