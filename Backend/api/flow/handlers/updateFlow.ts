import dbConnect from '@/utils/dbConnect';
import Flow, { FlowDocument } from '@/models/Flow';
import type { FlowHandlers } from '..';
import ProductAttributes from '@/models/ProductAttributes';


//
const updateFlow: FlowHandlers['updateFlow'] = async ({
  res,
  req,
  body,
  // config,
}) => {
  let result: { data: FlowDocument[] } = { data : [] }
  
  try {
    await dbConnect()

    const flowID = req.body.flowID;

    const update = req.body.update;

    if (!flowID) {
        return res.status(400).json({
            data: null,
            errors: [{message: 'flowID không xác định'}],
        });
    } 

    let flag = 0;

    if (update.productAttributes) {
      await Promise.all(update.productAttributes.map(async productAttributes => {
        const _ProductAttributes = await ProductAttributes.findOne({
          _id:  productAttributes,
        })
    
        if (!_ProductAttributes) {
          flag = 1;
          return res.status(400).json({
              data: null,
              errors: [{ message: `productAttributeId ${productAttributes} không xác định.` }],
          });
        }
      }))
    }

    if (flag === 0) {
      const _Flow = await Flow.findOneAndUpdate({
        _id: flowID,
      }, update, {new: true});

      if (!_Flow) {
        return res.status(400).json({
            data: null,
            errors: [{message: 'Flow không tồn tại'}],
        });
      } 

      result.data[0] = _Flow;
      
      return res.status(200).json({
        data: result.data,
        errors: [{message: 'Cập nhật thành công.'}],    
    });
    }

    
  } catch (error) {
    return res.status(400).json({
      data: null,
      errors: [{message: error.message}],
    });
  }

  
  

}


export default updateFlow