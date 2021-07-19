import isAllowedMethod from '@/utils/is-allowed-method';
import mongoose from "mongoose";

import { ProductFlowDocument } from '@/models/ProductFlow';
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import createProductFlow from './handlers/createProductFlow';
import getAllProductFlow from './handlers/getAllProductFlow';
import updateDProductFlowDocument from './handlers/updateProductFlow';



interface bodyProductFlow {
    name: string,
    code: string,
    productTypeId: string,
    organizationId: string,
    createdBy: string,
    flow: string[]
}

export type ProductFlowHandlers = {
    createProductFlow: CheckeeHandler<ProductFlowDocument[], bodyProductFlow>
    getAllProductFlow: CheckeeHandler<ProductFlowDocument[]>
    updateDProductFlowDocument: CheckeeHandler<ProductFlowDocument[]>
}


const METHODS = ['POST', 'GET', 'PUT', 'DELETE']

const ProductFlowAPI: CheckeeApiHandler<ProductFlowDocument[], ProductFlowHandlers> = async (
    req,
    res,
    handlers
) => {
    if (!isAllowedMethod(req, res, METHODS)) return

    try {
        if (req.method === 'POST') {
            const body = { ...req.body }
            return await handlers['createProductFlow']({ req, res, /* config, */ body })
        }

        if (req.method === 'GET') {
            const body = null;
            return await handlers['getAllProductFlow']({ req, res, body })
        }

        if (req.method === 'PUT') {
            const body = { ...req.body };
            return await handlers['updateDProductFlowDocument']({ req, res, body })
        }
    } catch (error) {
        res.status(500).json({ data: null, errors: [{ message: error.message }], })
    }
}

export const handlers = { createProductFlow, getAllProductFlow, updateDProductFlowDocument }

export default createApiHandler(ProductFlowAPI, handlers, {})