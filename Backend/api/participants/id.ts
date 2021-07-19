import isAllowedMethod from '@/utils/is-allowed-method';
import { ParticipantDocument } from '@/models/Participant';
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import getParticipantById from './handlers/getParticipantById';
import deleteParticipant from './handlers/deleteParticipant';




export type ParticipantHandlers = {
    getParticipantById: CheckeeHandler<ParticipantDocument>
    deleteParticipant: CheckeeHandler<ParticipantDocument>
}


const METHODS = [/* 'POST',  */'GET', /* 'PUT', */ 'DELETE']

const participantsIdAPI: CheckeeApiHandler<ParticipantDocument, ParticipantHandlers> = async (
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
            return await handlers['getParticipantById']({ req, res, body })
        }

        // if (req.method === 'PUT') {
        //     const body = { ...req.body };
        //     return await handlers['updateParticipant']({ req, res, body })
        // }

        if (req.method === 'DELETE') {
            const body = null;
            return await handlers['deleteParticipant']({ req, res, body })
        }
    } catch (error) {
        console.error(error)



        res.status(500).json({ data: null, errors: [{ message: error.message }], })
    }
}

export const handlers = { getParticipantById, deleteParticipant }

export default createApiHandler(participantsIdAPI, handlers, {})