import isAllowedMethod from '@/utils/is-allowed-method';
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import createProductAttributes from './handlers/createProductAttributes';
import getProductAttributes from './handlers/getProductAttributes';
import updateProductAttributes from './handlers/updateProductAttributes';
import { ProductAttributesDocument } from '@/models/ProductAttributes';




export type ProductAttributesHandlers = {
    createProductAttributes: CheckeeHandler<ProductAttributesDocument[]>
    getProductAttributes: CheckeeHandler<ProductAttributesDocument[]>
    updateProductAttributes: CheckeeHandler<ProductAttributesDocument[]>
}

const METHODS = ['GET', 'POST', 'PUT']

const ProductAttributesApi: CheckeeApiHandler<ProductAttributesDocument[], ProductAttributesHandlers> = async (
    req,
    res,
    // config,
    handlers
) => {
    if (!isAllowedMethod(req, res, METHODS)) return

    try {
        if (req.method === 'GET') {
            const body = null;
            return await handlers['getProductAttributes']({ req, res, /* config, */  body })
        }

        if (req.method === 'POST') {
            const body = { ...req.body };
            return await handlers['createProductAttributes']({ req, res, body })
        }

        if (req.method === 'PUT') {
            const body = { ...req.body };
            return await handlers['updateProductAttributes']({ req, res, body })
        }
    } catch (error) {
        // const message =
        //     error instanceof CheckeeApiError
        //         ? 'An unexpected error ocurred with the Checkee API'
        //         : 'An unexpected error ocurred'

        res.status(500).json({ data: null, errors: [{ message: error.message }], })
    }
}

const handlers = { createProductAttributes, getProductAttributes, updateProductAttributes }

export default createApiHandler(ProductAttributesApi, handlers, {});