import dbConnect from '@/utils/dbConnect';
import ProductFlow, { ProductFlowDocument } from '@/models/ProductFlow';
import type { ProductFlowHandlers } from '..';
import Participant from '@/models/Participant';
import ProductAttributes from '@/models/ProductAttributes';
import Organization from '@/models/Organization';
import ProductType from '@/models/ProductType';
import User from '@/models/User';


// Return all employees info
const createProductFlow: ProductFlowHandlers['createProductFlow'] = async ({
  res,
  req,
  body: {
    name,
    code,
    productTypeId,
    organizationId,
    createdBy,
    flow
  }
  // config,
}) => {
  let result: { data: ProductFlowDocument[] } = { data: [] }

  try {
    await dbConnect()

    const data = {
      name: name,
      code: code,
      productTypeId: productTypeId,
      organizationId: organizationId,
      createdBy: createdBy,
      flow: flow
    }

    // const productTypeId = req.body.productTypeId;
    // const organizationId = req.body.organizationId;
    // const createdBy = req.body.createdBy;

    const _productType = await ProductType.findOne({
      _id: productTypeId,
    })

    if (!_productType) {
      return res.status(400).json({
        data: null,
        errors: [{ message: `productTypeId ${productTypeId} không xác định.` }],
      });
    }

    const _organization = await Organization.findOne({
      _id: organizationId,
    })

    if (!_organization) {
      return res.status(400).json({
        data: null,
        errors: [{ message: `organizationId ${organizationId} không xác định.` }],
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

    // let flag = 0;
    // await Promise.all(req.body.flow.map(async element => {
    //   const _participant = await Participant.findOne({
    //     _id:  element.participantId,
    //   })

    //   if (!_participant) {
    //     flag = 1;
    //     return res.status(400).json({
    //         data: null,
    //         errors: [{ message: `participantId ${element.participantId} không xác định.` }],
    //     });
    //   }

    //   await Promise.all(element.productAttributes.map(async productAttributes => {
    //     const _ProductAttributes = await ProductAttributes.findOne({
    //       _id:  productAttributes.productAttributeId,
    //     })

    //     if (!_ProductAttributes) {
    //       flag = 1;
    //       return res.status(400).json({
    //           data: null,
    //           errors: [{ message: `productAttributeId ${productAttributes.productAttributeId} không xác định.` }],
    //       });
    //     }
    //   }))
    // }))


    // if (flag === 0) {
    result.data[0] = await ProductFlow.create(data);
    return res.status(200).json({ data: result.data ?? null })
    // }


  } catch (error) {
    return res.status(500).json({
      data: null,
      errors: [{ message: error.message, code: "err002" }],
    });
  }

}

export default createProductFlow