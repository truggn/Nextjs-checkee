import isAllowedMethod from '@/utils/is-allowed-method';
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import createProductType from './handlers/createProductType'
import getProductType from './handlers/getProductType'
import deleteProductType from './handlers/deleteProductType';

import { ProductTypeDocument } from '@/models/ProductType';


interface bodyProductType {
    id: string,
    code: string,
    name: string,
    organizationId: string,
    categoryId: string,
    productRepresentation: string,
    images: string[],
    price: string,
    countryOfOrigin: string,
    description: string,
    createdBy: string
}

interface IDdeleted {
    id: string,
    deletedBy: string
}

export type ProductTypeHandlers = {
    createProductType: CheckeeHandler<ProductTypeDocument[], bodyProductType>
    getProductType: CheckeeHandler<ProductTypeDocument[]>
    deleteProductType: CheckeeHandler<ProductTypeDocument[], IDdeleted>
}

const METHODS = ['GET', 'POST', 'PUT']

const ProductTypeApi: CheckeeApiHandler<ProductTypeDocument[], ProductTypeHandlers> = async (
    req,
    res,
    // config,
    handlers
) => {
    if (!isAllowedMethod(req, res, METHODS)) return

    try {
        if (req.method === 'GET') {
            const body = null;
            return await handlers['getProductType']({ req, res, body })
        }
        if (req.method === 'POST') {
            const body = { ...req.body };
            return await handlers['createProductType']({ req, res, body })
        }
        if (req.method === 'PUT') {
            const body = { ...req.body }
            return await handlers['deleteProductType']({ req, res, body })
        }
    } catch (error) {
        // const message =
        //     error instanceof CheckeeApiError
        //         ? 'An unexpected error ocurred with the Checkee API'
        //         : 'An unexpected error ocurred'

        res.status(500).json({ data: null, errors: [{ message: error.message }], })
    }
}

const handlers = { createProductType, getProductType, deleteProductType }

export default createApiHandler(ProductTypeApi, handlers, {});