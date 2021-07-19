import isAllowedMethod from '@/utils/is-allowed-method';
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';

import { ProductAttributesDocument } from '@/models/ProductAttributes';

import addAttribute from './handlers/addAttribute';



export interface addAttributeBody {
    flowId: string;
    productAttributeId: string;
}

export type SettingAttributeHandlers = {
    addAttribute: CheckeeHandler<ProductAttributesDocument, addAttributeBody>
}

const METHODS = ['POST']

const SettingAttributeAPI: CheckeeApiHandler<ProductAttributesDocument, SettingAttributeHandlers> = async (
    req,
    res,
    // config,
    handlers
) => {
    if (!isAllowedMethod(req, res, METHODS)) return

    try {
        if (req.method === 'POST') {
            const body = { ...req.body };
            return await handlers['addAttribute']({ req, res, body })
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

const handlers = { addAttribute }

export default createApiHandler(SettingAttributeAPI, handlers, {});