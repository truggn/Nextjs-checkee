import isAllowedMethod from '@/utils/is-allowed-method';
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import getMember from './handlers/getMember'

import { OrganizationMembersDocument } from '@/models/OrganizationMembers';




export type OrganizationMembersHandlers = {
    getMember: CheckeeHandler<OrganizationMembersDocument[]>
}

const METHODS = ['GET']

const OrganizationMembersApi: CheckeeApiHandler<OrganizationMembersDocument[], OrganizationMembersHandlers> = async (
    req,
    res,
    // config,
    handlers
) => {
    if (!isAllowedMethod(req, res, METHODS)) return

    try {
        if (req.method === 'GET') {
            const body = null;
            return await handlers['getMember']({ req, res, /* config, */  body })
        }

        // if (req.method === 'POST') {
        //     const body = {...req.body};
        //     return await handlers['createProductType']({ req, res, body })
        // }
    } catch (error) {
        // const message =
        //     error instanceof CheckeeApiError
        //         ? 'An unexpected error ocurred with the Checkee API'
        //         : 'An unexpected error ocurred'

        res.status(500).json({ data: null, errors: [{ message: error.message }], })
    }
}

const handlers = { getMember }

export default createApiHandler(OrganizationMembersApi, handlers, {});