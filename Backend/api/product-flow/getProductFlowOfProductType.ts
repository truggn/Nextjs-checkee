import isAllowedMethod from '@/utils/is-allowed-method';

import { ProductFlowDocument } from '@/models/ProductFlow';
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import getProductFlowOfProductType from './handlers/getProductFlowOfProductType';




export type ProductFlowHandlers = {
    getProductFlowOfProductType: CheckeeHandler<ProductFlowDocument[]>

}


const METHODS = ['GET']

const ProductFlowAPI: CheckeeApiHandler<ProductFlowDocument[], ProductFlowHandlers> = async (
    req,
    res,
    handlers
) => {
    if (!isAllowedMethod(req, res, METHODS)) return

    try {
        if (req.method === 'GET') {
            const body = null;
            return await handlers['getProductFlowOfProductType']({ req, res, body })
        }
    } catch (error) {
        console.error(error)



        res.status(500).json({ data: null, errors: [{ message: error.message }], })
    }
}

export const handlers = { getProductFlowOfProductType }

export default createApiHandler(ProductFlowAPI, handlers, {})