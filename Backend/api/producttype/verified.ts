import isAllowedMethod from '@/utils/is-allowed-method';
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import verifiedProductType from './handlers/verifiedProductType'



import { ProductTypeDocument } from '@/models/ProductType';


interface id_verified {
    verifiedBy: string,
    id: string
}

export type ProductTypeHandlers = {
    verifiedProductType: CheckeeHandler<ProductTypeDocument[] | ProductTypeDocument, id_verified>

}

const METHODS = ['PUT']

const ProductTypeApi: CheckeeApiHandler<ProductTypeDocument[], ProductTypeHandlers> = async (
    req,
    res,
    // config,
    handlers
) => {
    if (!isAllowedMethod(req, res, METHODS)) return

    try {
        if (req.method === 'PUT') {
            const body = { ...req.body };
            return await handlers['verifiedProductType']({ req, res, body })
        }
    } catch (error) {

        res.status(500).json({ data: null, errors: [{ message: error.message }], })
    }
}

const handlers = { verifiedProductType }

export default createApiHandler(ProductTypeApi, handlers, {});