import isAllowedMethod from '@/utils/is-allowed-method';
import { ProductFlowDocument } from '@/models/ProductFlow';
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import getProductFlowById from './handlers/getProductFlowById';
import deleteProductFlow from './handlers/deleteProductFlow';




export type ProductFlowHandlers = {
    getProductFlowById: CheckeeHandler<ProductFlowDocument>
    deleteProductFlow: CheckeeHandler<ProductFlowDocument>
}


const METHODS = [/* 'POST',  */'GET', /* 'PUT', */ 'DELETE']

const ProductFlowIdAPI: CheckeeApiHandler<ProductFlowDocument, ProductFlowHandlers> = async (
    req,
    res,
    handlers
) => {
    if (!isAllowedMethod(req, res, METHODS)) return

    try {
        if (req.method === 'GET') {
            const body = null;
            return await handlers['getProductFlowById']({ req, res, body })
        }
        if (req.method === 'DELETE') {
            const body = null;
            return await handlers['deleteProductFlow']({ req, res, body })
        }
    } catch (error) {
        console.error(error)



        res.status(500).json({ data: null, errors: [{ message: error.message }], })
    }
}

export const handlers = { getProductFlowById, deleteProductFlow }

export default createApiHandler(ProductFlowIdAPI, handlers, {})