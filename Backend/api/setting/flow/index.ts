import isAllowedMethod from '@/utils/is-allowed-method';
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';

import { FlowDocument } from '@/models/Flow';

import addFlow from './handlers/addFlow';


export interface addFlowBody {
    productFlowId: string;
    participantId: string;
    createdBy: string;
}

export type SettingFlowHandlers = {
    addFlow: CheckeeHandler<FlowDocument, addFlowBody>
}

const METHODS = ['POST']

const SettingFlowAPI: CheckeeApiHandler<FlowDocument, SettingFlowHandlers> = async (
    req,
    res,
    // config,
    handlers
) => {
    if (!isAllowedMethod(req, res, METHODS)) return

    try {
        if (req.method === 'POST') {
            const body = { ...req.body };
            return await handlers['addFlow']({ req, res, body })
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

const handlers = { addFlow }

export default createApiHandler(SettingFlowAPI, handlers, {});