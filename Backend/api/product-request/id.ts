import isAllowedMethod from '@/utils/is-allowed-method';
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import { ProductRequestDocument } from '@/models/ProductRequest';
import confirmProductRequest from './handlers/confirmProductRequest';
import getDetailProductRequest from './handlers/getDetailProductRequest';



interface BodyConfirm {
    id: string | string[],
    status: string,
}

export type ProductRequetsHandlers = {
    confirmProductRequest: CheckeeHandler<ProductRequestDocument, BodyConfirm>
    getDetailProductRequest: CheckeeHandler<ProductRequestDocument>
}

const METHODS = ['PUT', 'GET']

const ProductRequestIdApi: CheckeeApiHandler<ProductRequestDocument, ProductRequetsHandlers> = async (
    req,
    res,
    handlers
) => {
    if (!isAllowedMethod(req, res, METHODS)) return
    try {
        if (req.method === 'PUT') {
            const body = { id: req.query.id, ...req.body };
            return await handlers['confirmProductRequest']({ req, res, body })
        }
        if (req.method === 'GET') {
            const body = null;
            return await handlers['getDetailProductRequest']({ req, res, body })
        }
    } catch (error) {
        res.status(500).json({ data: null, errors: [{ message: error.message }], })
    }
}
const handlers = { confirmProductRequest, getDetailProductRequest }
export default createApiHandler(ProductRequestIdApi, handlers, {});