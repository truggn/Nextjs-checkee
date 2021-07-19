import isAllowedMethod from '@/utils/is-allowed-method';
import { FlowDocument } from '@/models/Flow';
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import getFlowById from './handlers/getFlowById';
import deleteFlow from './handlers/deleteFlow';




export type FlowHandlers = {
    getFlowById: CheckeeHandler<FlowDocument>
    deleteFlow: CheckeeHandler<FlowDocument>
}


const METHODS = [/* 'POST',  */'GET', /* 'PUT', */ 'DELETE']

const FlowIdAPI: CheckeeApiHandler<FlowDocument, FlowHandlers> = async (
    req,
    res,
    handlers
) => {
    if (!isAllowedMethod(req, res, METHODS)) return

    try {
        // if (req.method === 'POST') {
        //     const body = { ...req.body }
        //     return await handlers['addParticipant']({ req, res, /* config, */ body })
        // }

        if (req.method === 'GET') {
            const body = null;
            return await handlers['getFlowById']({ req, res, body })
        }

        // // if (req.method === 'PUT') {
        // //     const body = { ...req.body };
        // //     return await handlers['updateParticipant']({ req, res, body })
        // // }

        if (req.method === 'DELETE') {
            const body = null;
            return await handlers['deleteFlow']({ req, res, body })
        }
    } catch (error) {
        console.error(error)



        res.status(500).json({ data: null, errors: [{ message: error.message }], })
    }
}

export const handlers = { getFlowById, deleteFlow }

export default createApiHandler(FlowIdAPI, handlers, {})