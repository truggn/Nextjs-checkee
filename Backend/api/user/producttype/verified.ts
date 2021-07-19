import isAllowedMethod from '@/utils/is-allowed-method';
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import verifiedProductType from './handlers/verifiedProductType';


import { ProductTypeDocument } from '@/models/ProductType';
import { ROLES } from '@authorization/role';
import authorize from '@authorization/authorize';


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
            const athz = await authorize(req, [ROLES.NORMAL])
            if (!athz.isAuthorized) {
                return res.status(athz.status).json({
                    data: null,
                    errors: athz.errors
                })
            };
            const body = { ...req.body };
            return await handlers['verifiedProductType']({ req, res, body })
        }
    } catch (error) {

        res.status(500).json({ data: null, errors: [{ message: error.message }], })
    }
}

const handlers = { verifiedProductType }

export default createApiHandler(ProductTypeApi, handlers, {});