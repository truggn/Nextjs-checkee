import isAllowedMethod from '@/utils/is-allowed-method';
import Product, { ProductDocument } from '@/models/Product';
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import getProductOfUser from './handlers/getProductOfUser';



export type ProductHandlers = {
    getProductOfUser: CheckeeHandler<ProductDocument[]>
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
            return await handlers['getProductOfUser']({ req, res, body })
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({ data: null, errors: [{ message: error.message }], })
    }
}



export const handlers = { getProductOfUser }
export default createApiHandler(ProductAPI, handlers, {})



