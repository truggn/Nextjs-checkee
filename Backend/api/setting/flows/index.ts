import isAllowedMethod from '@/utils/is-allowed-method';
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';

import { FlowDocument } from '@/models/Flow';

import getFlows from './handlers/getFlows';


export interface getFlowsBody {
    productFlowId?: string;
}

export type SettingFlowsHandlers = {
    getFlows: CheckeeHandler<FlowDocument[], getFlowsBody>
}

const METHODS = ['GET']

const SettingFlowsAPI: CheckeeApiHandler<FlowDocument[], SettingFlowsHandlers> = async (
    req,
    res,
    // config,
    handlers
) => {
    if (!isAllowedMethod(req, res, METHODS)) return

    try {
        if (req.method === 'GET') {
            const body = req.query;
            return await handlers['getFlows']({ req, res, body })
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

const handlers = { getFlows }

export default createApiHandler(SettingFlowsAPI, handlers, {});