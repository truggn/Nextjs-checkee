import isAllowedMethod from '@/utils/is-allowed-method';
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import getProductRequestsByOrganization from './handlers/getProductRequestsByOrganization';
import { ProductRequestDocument } from '@/models/ProductRequest';
import { ROLES } from '@authorization/role';
import authorize from '@authorization/authorize';



export type ProductRequetsHandlers = {
    getProductRequestsByOrganization: CheckeeHandler<ProductRequestDocument[]>
}

const METHODS = ['GET']

const getProductRequestByOrganizationApi: CheckeeApiHandler<ProductRequestDocument | ProductRequestDocument[], ProductRequetsHandlers> = async (
    req,
    res,
    handlers,
) => {
    if (!isAllowedMethod(req, res, METHODS)) return

    try {
        if (req.method === 'GET') {
            const athz = await authorize(req, [ROLES.NORMAL])
            if (!athz.isAuthorized) {
                return res.status(athz.status).json({
                    data: null,
                    errors: athz.errors
                })
            };
            const body = null;
            return await handlers['getProductRequestsByOrganization']({ req, res, body })
        }
    } catch (error) {
        res.status(500).json({ data: null, errors: [{ message: error.message }], })
    }
}

const handlers = { getProductRequestsByOrganization };

export default createApiHandler(getProductRequestByOrganizationApi, handlers, {});