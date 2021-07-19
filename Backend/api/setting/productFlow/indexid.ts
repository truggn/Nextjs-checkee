import isAllowedMethod from '@/utils/is-allowed-method';
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';

import { ProductFlowDocument } from '@/models/ProductFlow';

import getProductFlow from './handlers/getProductFlow';



export interface getProductFlowBody {
    id?: string;
}

export type SettingProductFlowHandlers = {
    getProductFlow: CheckeeHandler<ProductFlowDocument, getProductFlowBody>
}

const METHODS = ['GET']

const SettingProductFlowAPI: CheckeeApiHandler<ProductFlowDocument, SettingProductFlowHandlers> = async (
    req,
    res,
    // config,
    handlers
) => {
    if (!isAllowedMethod(req, res, METHODS)) return

    try {
        if (req.method === 'GET') {
            const body = req.query;
            return await handlers['getProductFlow']({ req, res, body })
        }

    } catch (error) {
        // const message =
        //     error instanceof CheckeeApiError
        //         ? 'An unexpected error ocurred with the Checkee API'
        //         : 'An unexpected error ocurred'

        res.status(500).json({
            data: null,
            errors: [{ message: error.message }],
        })
    }
}

const handlers = { getProductFlow }

export default createApiHandler(SettingProductFlowAPI, handlers, {});