import isAllowedMethod from '@/utils/is-allowed-method';
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import getMembersOfOrganization from './handlers/getMembersOfOrganization'

import { OrganizationMembersDocument } from '@/models/OrganizationMembers';



export type OrganizationMembersHandlers = {
    getMembersOfOrganization: CheckeeHandler<OrganizationMembersDocument[]>
}

const METHODS = ['GET', 'POST']

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
            return await handlers['getMembersOfOrganization']({ req, res, /* config, */  body })
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

const handlers = { getMembersOfOrganization }

export default createApiHandler(OrganizationMembersApi, handlers, {});