import isAllowedMethod from '@/utils/is-allowed-method';
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import type { ParticipantTypeDocument } from '@/models/ParticipantType';
import getAllParticipantTypes from './handlers/getAllParticipantTypes';



export type ParticipantTypesHandlers = {
    getAllParticipantTypes: CheckeeHandler<ParticipantTypeDocument[]>
}

const METHODS = ['GET']

const participantTypesAPI: CheckeeApiHandler<ParticipantTypeDocument[], ParticipantTypesHandlers> = async (
    req,
    res,
    handlers
) => {
    if (!isAllowedMethod(req, res, METHODS)) return

    try {
        if (req.method === 'GET') {
            const body = null;
            return await handlers['getAllParticipantTypes']({ req, res, body })
        }
    } catch (error) {
        res.status(500).json({ data: null, errors: [{ message: error.message }], })
    }
}

export const handlers = { getAllParticipantTypes }

export default createApiHandler(participantTypesAPI, handlers, {})