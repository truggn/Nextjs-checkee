import isAllowedMethod from '@/utils/is-allowed-method';
import { OrganizationDocument } from '@/models/Organization';
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import exportDataCustomer from './handlers/exportCustomer';



export type CustomerHandlers = {
    exportDataCustomer: CheckeeHandler<OrganizationDocument[]>
}

const METHODS = ['POST', 'GET']

const exportCustomer: CheckeeApiHandler<OrganizationDocument[], CustomerHandlers> = async (
    req,
    res,
    handlers
) => {
    if (!isAllowedMethod(req, res, METHODS)) return

    try {
        if (req.method === 'GET') {
            const body = null;
            return await handlers['exportDataCustomer']({ req, res, /* config, */ body })
        }
    } catch (error) {
        console.error(error)

        res.status(500).json({ data: null, errors: [{ message: error.message }], })
    }
}

export const handlers = { exportDataCustomer }

export default createApiHandler(exportCustomer, handlers, {})