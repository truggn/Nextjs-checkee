import isAllowedMethod from '@/utils/is-allowed-method';
import { UserDocument } from '@/models/User';
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import reset from './handlers/reset';
import resetPassword from './handlers/resetPassword';




export type UserHandlers = {
    reset: CheckeeHandler<string>
    resetPassword: CheckeeHandler<string>
}


const METHODS = ['POST', 'GET']

const resetPasswordAPI: CheckeeApiHandler<string, UserHandlers> = async (
    req,
    res,
    handlers
) => {
    if (!isAllowedMethod(req, res, METHODS)) return

    try {
        if (req.method === 'POST') {
            const body = { ...req.body }
            return await handlers['resetPassword']({ req, res, /* config, */ body })
        }

        if (req.method === 'GET') {
            const body = null;
            return await handlers['reset']({ req, res, body })
        }

        // if (req.method === 'PUT') {
        //     const body = { ...req.body };
        //     return await handlers['updateParticipant']({ req, res, body })
        // }

        // if (req.method === 'DELETE') {
        //     const body = null;
        //     return await handlers['deleteParticipant']({ req, res, body })
        // }
    } catch (error) {
        console.error(error)



        res.status(500).json({ data: null, errors: [{ message: error.message }], })
    }
}

export const handlers = { reset, resetPassword }

export default createApiHandler(resetPasswordAPI, handlers, {})