import isAllowedMethod from '@/utils/is-allowed-method';
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';

import retrieveProductByCode from './handlers/retrieveProductByCode';

interface RetrieveBody {
    code?: string;
}

interface AdditionalInformation {
    [k: string]: any;
}

interface OriginalInformation {
    code: string;
    name: string;
    id: string;
}

export interface ProductInformation extends OriginalInformation, AdditionalInformation { }

export type RetrieveHandlers = {
    retrieveProductByCode: CheckeeHandler<ProductInformation, RetrieveBody>
}

const METHODS = ['GET']

const RetrieveProductInformationAPI: CheckeeApiHandler<ProductInformation, RetrieveHandlers> = async (
    req,
    res,
    handlers
) => {
    if (!isAllowedMethod(req, res, METHODS)) return

    try {
        if (req.method === 'GET') {
            const body = req.query
            return await handlers['retrieveProductByCode']({ req, res, body })
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({ data: null, errors: [{ message: error.message }], })
    }
}

export const handlers = { retrieveProductByCode }
export default createApiHandler(RetrieveProductInformationAPI, handlers, {})