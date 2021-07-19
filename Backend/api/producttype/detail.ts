import isAllowedMethod from '@/utils/is-allowed-method';
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import getDetailProductType from './handlers/getDetailProductType'
import { ProductTypeDocument } from '@/models/ProductType';

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
            const body = { id: req.query.id, ...req.body };
            return await handlers['getDetailProductType']({ req, res, body })
        }

    } catch (error) {

        res.status(500).json({ data: null, errors: [{ message: error.message }], })
    }
}

const handlers = { getDetailProductType }

export default createApiHandler(ProductTypeApi, handlers, {});