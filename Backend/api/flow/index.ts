import isAllowedMethod from '@/utils/is-allowed-method';

import { FlowDocument } from '@/models/Flow';
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import createFlow from './handlers/createFlow';
import getAllFlow from './handlers/getAllFlow';
import updateFlow from './handlers/updateFlow';



interface bodyFlow {
    productFlowId: string,
    participantId: string,
    productAttributes: string[],
    createdBy: string,
}

export type FlowHandlers = {
    createFlow: CheckeeHandler<FlowDocument[], bodyFlow>
    getAllFlow: CheckeeHandler<FlowDocument[]>
    updateFlow: CheckeeHandler<FlowDocument[]>
}


const METHODS = ['POST', 'GET', 'PUT', 'DELETE']

const FlowAPI: CheckeeApiHandler<FlowDocument[], FlowHandlers> = async (
    req,
    res,
    handlers
) => {
    if (!isAllowedMethod(req, res, METHODS)) return

    try {
        if (req.method === 'POST') {
            const body = { ...req.body }
            return await handlers['createFlow']({ req, res, /* config, */ body })
        }

        if (req.method === 'GET') {
            const body = null;
            return await handlers['getAllFlow']({ req, res, body })
        }

        if (req.method === 'PUT') {
            const body = { ...req.body };
            return await handlers['updateFlow']({ req, res, body })
        }

        // if (req.method === 'DELETE') {
        //     const body = { ...req.body };
        //     return await handlers['deleteParticipant']({ req, res, body })
        // }
    } catch (error) {
        res.status(500).json({ data: null, errors: [{ message: error.message }], })
    }
}

export const handlers = { createFlow, getAllFlow, updateFlow }

export default createApiHandler(FlowAPI, handlers, {})