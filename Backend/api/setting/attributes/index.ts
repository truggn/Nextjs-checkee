import isAllowedMethod from '@/utils/is-allowed-method';
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';

import { ProductAttributesDocument } from '@/models/ProductAttributes';

import getAttributes from './handlers/getAttributes';

export interface getAttributesBody {
    flowId?: string;
}

export type SettingAttributesHandlers = {
    getAttributes: CheckeeHandler<ProductAttributesDocument[], getAttributesBody>
}

const METHODS = ['GET']

const SettingAttributesAPI: CheckeeApiHandler<ProductAttributesDocument[], SettingAttributesHandlers> = async (
    req,
    res,
    // config,
    handlers
) => {
    if (!isAllowedMethod(req, res, METHODS)) return

    try {
        if (req.method === 'GET') {
            const body = req.query;
            return await handlers['getAttributes']({ req, res, body })
        }

    } catch (error) {
        // const message =
        //     error instanceof CheckeeApiError
        //         ? 'An unexpected error ocurred with the Checkee API'
        //         : 'An unexpected error ocurred'

        res.status(500).json({
            data: null,
            errors: [{ message: error.message }],
        })
    }
}

const handlers = { getAttributes }

export default createApiHandler(SettingAttributesAPI, handlers, {});