import isAllowedMethod from '@/utils/is-allowed-method';
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import createOrganizationMembers from './handlers/createOrganizationMembers'
import getOrganizationMembers from './handlers/getOrganizationMembers'
import { OrganizationMembersDocument } from '@/models/OrganizationMembers';



export type OrganizationMembersHandlers = {
    createOrganizationMembers: CheckeeHandler<OrganizationMembersDocument[]>
    getOrganizationMembers: CheckeeHandler<OrganizationMembersDocument[]>
}

const METHODS = ['GET', 'POST']

const organizationMembersApi: CheckeeApiHandler<OrganizationMembersDocument[], OrganizationMembersHandlers> = async (
    req,
    res,
    // config,
    handlers
) => {
    if (!isAllowedMethod(req, res, METHODS)) return

    try {
        if (req.method === 'GET') {
            const body = null;
            return await handlers['getOrganizationMembers']({ req, res, /* config, */  body })
        }

        if (req.method === 'POST') {
            const body = { ...req.body };
            return await handlers['createOrganizationMembers']({ req, res, body })
        }
    } catch (error) {
        // const message =
        //     error instanceof CheckeeApiError
        //         ? 'An unexpected error ocurred with the Checkee API'
        //         : 'An unexpected error ocurred'

        res.status(500).json({ data: null, errors: [{ message: error.message }], })
    }
}

const handlers = { createOrganizationMembers, getOrganizationMembers }

export default createApiHandler(organizationMembersApi, handlers, {});