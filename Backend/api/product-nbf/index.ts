import isAllowedMethod from '@/utils/is-allowed-method';
import mongoose from "mongoose";
import ProductNBF, { ProductNBFDocument } from '@/models/ProductNBF'
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';

import getAllProductNBF from './handlers/getAllProductNBF';



export type ProductNBFHandlers = {
    getAllProductNBF: CheckeeHandler<ProductNBFDocument[]>

}
const METHODS = ['GET']

const ProductNBFAPI: CheckeeApiHandler<ProductNBFDocument[], ProductNBFHandlers> = async (
    req,
    res,
    handlers
) => {
    if (!isAllowedMethod(req, res, METHODS)) return

    try {
        if (req.method === 'GET') {
            const body = null;
            return await handlers['getAllProductNBF']({ req, res, body })
        }

    } catch (error) {
        res.status(500).json({ data: null, errors: [{ message: error.message }], })
    }
}

export const handlers = { getAllProductNBF }

export default createApiHandler(ProductNBFAPI, handlers, {})

