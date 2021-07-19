import isAllowedMethod from '@/utils/is-allowed-method';
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';

import getProductTypeOfOrganization from './handlers/getProductTypeOfOrganization';

import { ProductTypeDocument } from '@/models/ProductType';

import { ROLES } from '@authorization/role';
import authorize from '@authorization/authorize';

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
            // Kiểm tra role cho từng handler
            const athz = await authorize(req, [ROLES.NORMAL])
            if (!athz.isAuthorized) {
                return res.status(athz.status).json({
                    data: null,
                    errors: athz.errors
                })
            }

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