import isAllowedMethod from '@/utils/is-allowed-method';
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import getDetailProductType from './handlers/getDetailProductType'

import { ProductTypeDocument } from '@/models/ProductType';
import { ROLES } from '@authorization/role';
import authorize from '@authorization/authorize';


interface bodyProductType {
    id: string,
}

export type ProductTypeHandlers = {
    getDetailProductType: CheckeeHandler<ProductTypeDocument, bodyProductType>
}

const METHODS = ['GET']

const ProductTypeApi: CheckeeApiHandler<ProductTypeDocument, ProductTypeHandlers> = async (
    req,
    res,
    // config,
    handlers
) => {
    if (!isAllowedMethod(req, res, METHODS)) return

    try {
        if (req.method === 'GET') {
            const athz = await authorize(req, [ROLES.NORMAL])
            if (!athz.isAuthorized) {
                return res.status(athz.status).json({
                    data: null,
                    errors: athz.errors
                })
            };
            const body = { id: req.query.id, ...req.body };
            return await handlers['getDetailProductType']({ req, res, body })
        }

    } catch (error) {

        res.status(500).json({ data: null, errors: [{ message: error.message }], })
    }
}

const handlers = { getDetailProductType }

export default createApiHandler(ProductTypeApi, handlers, {});