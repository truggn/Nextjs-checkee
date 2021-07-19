import isAllowedMethod from '@/utils/is-allowed-method';
import mongoose from "mongoose";

import { ParticipantDocument } from '@/models/Participant';
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import addParticipant from './handlers/addParticipant';
import getAllParticipants from './handlers/getAllParticipants';
import updateParticipant from './handlers/updateParticipant';




export type SignupBody = {
    icon: string,
    code: string
    email: string
    address: string
    phone: string
    participantName: string
    participantType: string
    participantIsChildOf: mongoose.Schema.Types.ObjectId
    organizationId: mongoose.Schema.Types.ObjectId
}

export type UpdateBody = {
    icon: string
    address: string
    phone: string
    participantName: string
    participantType: string
    organizationId: mongoose.Schema.Types.ObjectId
}


export type ParticipantHandlers = {
    addParticipant: CheckeeHandler<ParticipantDocument[], SignupBody>
    getAllParticipants: CheckeeHandler<ParticipantDocument[]>
    updateParticipant: CheckeeHandler<ParticipantDocument[], UpdateBody>
}


const METHODS = ['POST', 'GET', 'PUT', 'DELETE']

const participantsAPI: CheckeeApiHandler<ParticipantDocument[], ParticipantHandlers> = async (
    req,
    res,
    handlers
) => {
    if (!isAllowedMethod(req, res, METHODS)) return

    try {
        if (req.method === 'POST') {
            const body = { ...req.body }
            return await handlers['addParticipant']({ req, res, /* config, */ body })
        }

        if (req.method === 'GET') {
            const body = null;
            return await handlers['getAllParticipants']({ req, res, body })
        }

        if (req.method === 'PUT') {
            const body = { ...req.body };
            return await handlers['updateParticipant']({ req, res, body })
        }

        // if (req.method === 'DELETE') {
        //     const body = { ...req.body };
        //     return await handlers['deleteParticipant']({ req, res, body })
        // }
    } catch (error) {
        res.status(500).json({ data: null, errors: [{ message: error.message }], })
    }
}

export const handlers = { addParticipant, getAllParticipants, updateParticipant }

export default createApiHandler(participantsAPI, handlers, {})