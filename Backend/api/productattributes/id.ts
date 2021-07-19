import isAllowedMethod from '@/utils/is-allowed-method';
import { ProductAttributesDocument } from '@/models/ProductAttributes';
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
// import getParticipantById from './handlers/getParticipantById';
import deleteProductAttributes from './handlers/deleteProductAttributes';




export type ProductAttributesHandlers = {
    // getParticipantById: CheckeeHandler<ProductAttributesDocument>
    deleteProductAttributes: CheckeeHandler<ProductAttributesDocument>
}


const METHODS = [/* 'POST',  */'GET', /* 'PUT', */ 'DELETE']

const ProductAttributesIdAPI: CheckeeApiHandler<ProductAttributesDocument, ProductAttributesHandlers> = async (
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

        // if (req.method === 'GET') {
        //     const body = null;
        //     return await handlers['getParticipantById']({ req, res, body })
        // }

        // if (req.method === 'PUT') {
        //     const body = { ...req.body };
        //     return await handlers['updateParticipant']({ req, res, body })
        // }

        if (req.method === 'DELETE') {
            const body = null;
            return await handlers['deleteProductAttributes']({ req, res, body })
        }
    } catch (error) {
        console.error(error)



        res.status(500).json({ data: null, errors: [{ message: error.message }], })
    }
}

export const handlers = { deleteProductAttributes }

export default createApiHandler(ProductAttributesIdAPI, handlers, {})