import dbConnect from '@/utils/dbConnect';
import Product, { ProductDocument } from '@/models/Product';
import ProductFlow from '@/models/ProductFlow';
import Flow from '@/models/Flow';
import Participant from '@/models/Participant';
import ProductAttributes from '@/models/ProductAttributes';
import ProductType from '@/models/ProductType';
import type { ProductInformation, RetrieveHandlers } from '@api/product/retrieveProductInformation';

const retrieveProductByCode: RetrieveHandlers['retrieveProductByCode'] = async ({
  res,
  body: { code },
}) => {
  let result: { data?: ProductInformation } = {}

  try {
    await dbConnect()

    const product = await Product.findOne({ code })
      .populate([
        {
          path: 'productTypeId',
          model: ProductType,
        },
        {
          path: 'productFlowId',
          model: ProductFlow,
          populate: ({
            path: 'flow',
            model: Flow,
            populate: [
              {
                path: 'productAttributes',
                model: ProductAttributes,
              },
              {
                path: 'participantId',
                model: Participant,
              }
            ],
          })
        }
      ])
      .lean()

    if (product === null) {
      return res.status(200).json({
        data: null,
      })
    }

    const returnData: ProductInformation = {
      code: product.code,
      name: product.name,
      images: product.productTypeId.images,
      description: product.productTypeId.description,
      id: product._id,
      information: [],
    }

    const _flow = product.productFlowId.flow
    for (let i = 0; i < _flow.length; i++) {
      const { productAttributes } = _flow[i]
      const attributes: { key: string; name: string; value: string; }[] = []

      for (let j = 0; j < productAttributes.length; j++) {
        attributes.push({
          key: productAttributes[j].key ?? '',
          name: productAttributes[j].key ?? '',
          value: product[productAttributes[j].code] ?? ''
        })
      }

      returnData.information.push({
        participant: {
          name: _flow[i].participantId.participantName,
          icon: _flow[i].participantId.icon,
        },
        attributes,
      })
    }

    result.data = returnData

  } catch (error) {
    return res.status(500).json({
      data: null,
      errors: [{ message: error.message }]
    })
  }

  return res.status(200).json({ data: result.data ?? null })
}

export default retrieveProductByCode