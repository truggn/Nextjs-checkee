import isAllowedMethod from '@/utils/is-allowed-method';
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';

import createOrganization from './handlers/createOrganization';
import getOrganization from './handlers/getOrganization';

import { OrganizationDocument } from '@/models/Organization';

import { ROLES } from '@authorization/role';
import authorize from '@authorization/authorize';

interface Bodyrganization {
    code: string,
    icon: string,
    address: string,
    phone: string,
    email: string,
    taxCode: string,
    bank: string,
    fax: string,
    certificate_image: string[],
    account_number: string,
    name_customer: string
}

export type OrganizationHandlers = {
    createOrganization: CheckeeHandler<OrganizationDocument[], Bodyrganization>
    getOrganization: CheckeeHandler<OrganizationDocument[]>
}

const METHODS = ['GET', 'POST']

const organizationApi: CheckeeApiHandler<OrganizationDocument[], OrganizationHandlers> = async (
    req,
    res,
    // config,
    handlers
) => {
    if (!isAllowedMethod(req, res, METHODS)) return

    try {
        if (req.method === 'GET') {
            // Kiểm tra role cho từng handler
            const athz = await authorize(req, [ROLES.NORMAL])
            if (!athz.isAuthorized) {
                return res.status(athz.status).json({
                    data: null,
                    errors: athz.errors
                })
            }

            const body = null;
            return await handlers['getOrganization']({ req, res, /* config, */  body })
        }

        if (req.method === 'POST') {
            // Kiểm tra role cho từng handler
            const athz = await authorize(req, [ROLES.SUPERADMIN])
            if (!athz.isAuthorized) {
                return res.status(athz.status).json({
                    data: null,
                    errors: athz.errors
                })
            };
            const body = { ...req.body };
            return await handlers['createOrganization']({ req, res, body })
        }
    } catch (error) {
        // const message =
        //     error instanceof CheckeeApiError
        //         ? 'An unexpected error ocurred with the Checkee API'
        //         : 'An unexpected error ocurred'

        res.status(500).json({ data: null, errors: [{ message: error.message }], })
    }
}

const handlers = { createOrganization, getOrganization }

export default createApiHandler(organizationApi, handlers, {});