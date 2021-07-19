import isAllowedMethod from '@/utils/is-allowed-method';

import { ProductFlowDocument } from '@/models/ProductFlow';
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import changeProductFlow from './handlers/changeProductFlow';



export type ProductFlowHandlers = {
    changeProductFlow: CheckeeHandler<ProductFlowDocument[]>

}


const METHODS = ['PUT']

const ProductFlowAPI: CheckeeApiHandler<ProductFlowDocument[], ProductFlowHandlers> = async (
    req,
    res,
    handlers
) => {
    if (!isAllowedMethod(req, res, METHODS)) return

    try {
        if (req.method === 'PUT') {
            const body = { ...req.body };
            return await handlers['changeProductFlow']({ req, res, body })
        }
    } catch (error) {
        console.error(error)


        res.status(500).json({ data: null, errors: [{ message: error.message }], })
    }
}

export const handlers = { changeProductFlow }

export default createApiHandler(ProductFlowAPI, handlers, {})