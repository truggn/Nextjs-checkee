import dbConnect from '@/utils/dbConnect';
import ProductFlow, { ProductFlowDocument } from '@/models/ProductFlow';
import type { ProductFlowHandlers } from '../changeProductFlow';
import Participant from '@/models/Participant';
import ProductAttributes from '@/models/ProductAttributes';
import Flow from '@/models/Flow';


//
const changeProductFlow: ProductFlowHandlers['changeProductFlow'] = async ({
  res,
  req,
  body,
  // config,
}) => {
  let result: { data: ProductFlowDocument[] } = { data: [] }
  
  try {
    await dbConnect()

    const productFlowID = req.body.productFlowID;

    const flows = req.body.flows;

    if (!productFlowID) {
        return res.status(400).json({
            data: null,
            errors: [{message: 'productFlowID không xác định'}],
        });
    } 

    let flag = 0;
    let flow;
    if (flows) {
       flow =  await Promise.all(flows.map(async element => {
        const _flow = await Flow.findOne({
            _id: element.flowId
        })

        if (!_flow) {
            flag = 1;
            return res.status(400).json({
                data: null,
                errors: [{ message: `flowId ${element.flowId} không xác định.` }],
            });
        } 

        await Promise.all(element.productAttributes.map(async ID =>{
            const _ProductAttributes = await ProductAttributes.findOne({
                _id: ID
            })

            if (!_ProductAttributes) {
                flag = 1;
                return res.status(400).json({
                    data: null,
                    errors: [{ message: `ProductAttributes Id ${ID} không xác định.` }],
                });
            }
        }))
        

        return element.flowId;

      }))
    }

    if (flag === 0) {
        await Promise.all(flows.map(async element => { 
            await Flow.findOneAndUpdate({
                _id: element.flowId,
              }, {
                $set: {
                    productAttributes: element.productAttributes
                }
            }, {new: true});
        }))
    
        const _productFlow = await ProductFlow.findOneAndUpdate({
            _id: productFlowID,
        }, {
            $set: {
                flow: flow
            }
        }, {new: true})
        .populate({
          path: 'flow',
          populate: { 
            path: 'participantId',
            // select: 'code email',
            model: Participant
           },
          model: Flow
        })
        .populate({
          path: 'flow',
          populate: { 
            path: 'productAttributes',
            // select: 'code email',
            model: ProductAttributes
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
              $nin: flow 
            }
          });
    
          result.data[0] = _productFlow;
    
            return res.status(200).json({
                data: result.data,
                errors: [{message: 'Cập nhật thành công.'}],    
            });
        }
    }
   

    
    
  } catch (error) {
    return res.status(400).json({
      data: null,
      errors: [{message: error.message}],
    });
  }

  
  

}


export default changeProductFlow