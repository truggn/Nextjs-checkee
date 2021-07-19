import isAllowedMethod from '@/utils/is-allowed-method';
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import getProductAttributesOfProductType from './handlers/getProductAttributesOfProductType'

import { ProductAttributesDocument } from '@/models/ProductAttributes';




export type ProductAttributesHandlers = {
    getProductAttributesOfProductType: CheckeeHandler<ProductAttributesDocument[]>
}

const METHODS = ['GET']

const ProductAttributesApi: CheckeeApiHandler<ProductAttributesDocument[], ProductAttributesHandlers> = async (
    req,
    res,
    // config,
    handlers
) => {
    if (!isAllowedMethod(req, res, METHODS)) return

    try {
        if (req.method === 'GET') {
            const body = null;
            return await handlers['getProductAttributesOfProductType']({ req, res, /* config, */  body })
        }

        // if (req.method === 'POST') {
        //     const body = {...req.body};
        //     return await handlers['createProductType']({ req, res, body })
        // }
    } catch (error) {
        // const message =
        //     error instanceof CheckeeApiError
        //         ? 'An unexpected error ocurred with the Checkee API'
        //         : 'An unexpected error ocurred'

        res.status(500).json({ data: null, errors: [{ message: error.message }], })
    }
}

const handlers = { getProductAttributesOfProductType }

export default createApiHandler(ProductAttributesApi, handlers, {});