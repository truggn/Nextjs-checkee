import isAllowedMethod from '@/utils/is-allowed-method';
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import getProductTypeOfOrganization from './handlers/getProductTypeOfOrganization'

import { ProductTypeDocument } from '@/models/ProductType';




export type ProductTypeHandlers = {
    getProductTypeOfOrganization: CheckeeHandler<ProductTypeDocument[]>
}

const METHODS = ['GET']

const ProductTypeApi: CheckeeApiHandler<ProductTypeDocument[], ProductTypeHandlers> = async (
    req,
    res,
    // config,
    handlers
) => {
    if (!isAllowedMethod(req, res, METHODS)) return

    try {
        if (req.method === 'GET') {
            const body = null;
            return await handlers['getProductTypeOfOrganization']({ req, res, /* config, */  body })
        }
    } catch (error) {
        // const message =
        //     error instanceof CheckeeApiError
        //         ? 'An unexpected error ocurred with the Checkee API'
        //         : 'An unexpected error ocurred'

        res.status(500).json({ data: null, errors: [{ message: error.message }], })
    }
}

const handlers = { getProductTypeOfOrganization }

export default createApiHandler(ProductTypeApi, handlers, {});