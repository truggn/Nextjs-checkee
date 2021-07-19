import isAllowedMethod from '@/utils/is-allowed-method';
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import createProductRequest from './handlers/createProductRequest';
import getProductRequests from './handlers/getProductRequests';
import { ProductRequestDocument } from '@/models/ProductRequest';
import { ROLES } from '@authorization/role';
import authorize from '@authorization/authorize';




interface Product {
    code: string;
    name: string;
}

interface BodyRequest {
    filename: string;
    organizationId: string;
    productTypeId: string;
    products: Product[];
    createdBy: string;
}


export type ProductRequetsHandlers = {
    createProductRequest: CheckeeHandler<ProductRequestDocument, BodyRequest>
    getProductRequests: CheckeeHandler<ProductRequestDocument[]>
}

const METHODS = ['GET', 'POST']

const ProductRequestApi: CheckeeApiHandler<
    ProductRequestDocument | ProductRequestDocument[],
    ProductRequetsHandlers
>
    = async (
        req,
        res,
        handlers,
    ) => {
        if (!isAllowedMethod(req, res, METHODS)) return

        try {
            if (req.method === 'POST') {
                const athz = await authorize(req, [ROLES.NORMAL])
                if (!athz.isAuthorized) {
                    return res.status(athz.status).json({
                        data: null,
                        errors: athz.errors
                    })
                };
                const body = { ...req.body };
                return await handlers['createProductRequest']({ req, res, body })
            }

            if (req.method === 'GET') {
                const athz = await authorize(req, [ROLES.NORMAL])
                if (!athz.isAuthorized) {
                    return res.status(athz.status).json({
                        data: null,
                        errors: athz.errors
                    })
                };
                const body = null;
                return await handlers['getProductRequests']({ req, res, body })
            }
        } catch (error) {
            res.status(500).json({ data: null, errors: [{ message: error.message }], })
        }
    }

const handlers = { createProductRequest, getProductRequests };

export default createApiHandler(ProductRequestApi, handlers, {});