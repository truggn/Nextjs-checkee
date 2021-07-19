import isAllowedMethod from '@/utils/is-allowed-method';
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import getProductAttributesOfOrganization from './handlers/getProductAttributesOfOrganization';

import { ProductAttributesDocument } from '@/models/ProductAttributes';




export type ProductAttributesHandlers = {
    getProductAttributesOfOrganization: CheckeeHandler<ProductAttributesDocument[]>
}

const METHODS = ['GET', 'POST']

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
            return await handlers['getProductAttributesOfOrganization']({ req, res, /* config, */  body })
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

const handlers = { getProductAttributesOfOrganization }

export default createApiHandler(ProductAttributesApi, handlers, {});