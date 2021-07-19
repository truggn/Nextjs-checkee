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
        // if (req.method === 'POST') {
        //     const body = { ...req.body }
        //     return await handlers['addParticipant']({ req, res, /* config, */ body })
        // }

        if (req.method === 'GET') {
            const body = null;
            return await handlers['getProductFlowOfProductType']({ req, res, body })
        }

        // if (req.method === 'PUT') {
        //     const body = { ...req.body };
        //     return await handlers['updateParticipant']({ req, res, body })
        // }

        // if (req.method === 'DELETE') {
        //     const body = { ...req.body };
        //     return await handlers['deleteParticipant']({ req, res, body })
        // }
    } catch (error) {
        console.error(error)



        res.status(500).json({ data: null, errors: [{ message: error.message }], })
    }
}

export const handlers = { getProductFlowOfProductType }

export default createApiHandler(ProductFlowAPI, handlers, {})