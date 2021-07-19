import isAllowedMethod from '@/utils/is-allowed-method';
import Product, { ProductDocument } from '@/models/Product';
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import getProductByType from './handlers/getProductByType';



export type ProductHandlers = {
    getProductByType: CheckeeHandler<ProductDocument[]>
}
const METHODS = ['POST', 'GET', 'PUT', 'DELETE']
const ProductAPI: CheckeeApiHandler<ProductDocument[], ProductHandlers> = async (
    req,
    res,
    handlers
) => {
    if (!isAllowedMethod(req, res, METHODS)) return
    try {
        if (req.method === 'GET') {
            const body = null
            return await handlers['getProductByType']({ req, res, body })
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({ data: null, errors: [{ message: error.message }], })
    }
}



export const handlers = { getProductByType }
export default createApiHandler(ProductAPI, handlers, {})



