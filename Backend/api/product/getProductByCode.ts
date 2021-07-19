import isAllowedMethod from '@/utils/is-allowed-method';
import { ProductDocument } from '@/models/Product';
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import getProductByCode from './handlers/getProductByCode';





export type Body = {
    code: string;
}

export type ProductHandlers = {
    getProductByCode: CheckeeHandler<ProductDocument[], Body>
}
const METHODS = ['POST', 'GET', 'PUT']
const ProductAPI: CheckeeApiHandler<ProductDocument[], ProductHandlers> = async (
    req,
    res,
    handlers
) => {
    if (!isAllowedMethod(req, res, METHODS)) return
    try {
        if (req.method === 'GET') {
            const body = { ...req.body }
            return await handlers['getProductByCode']({ req, res, body })
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({ data: null, errors: [{ message: error.message }], })
    }
}

export const handlers = { getProductByCode }
export default createApiHandler(ProductAPI, handlers, {})



