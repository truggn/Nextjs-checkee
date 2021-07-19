import isAllowedMethod from '@/utils/is-allowed-method';
import mongoose from 'mongoose';
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import { CategoryDocument } from '@/models/Category';
import getDataLevel_1 from './handlers/getDataLevel_1';


export type CategoryHandlers = {

    getDataLevel_1: CheckeeHandler<CategoryDocument[]>
}

const METHODS = ['GET']

const categoryLevel1API: CheckeeApiHandler<CategoryDocument[] | CategoryDocument, CategoryHandlers> = async (
    req, res, handlers
) => {
    if (!isAllowedMethod(req, res, METHODS)) return

    try {

        if (req.method === 'GET') {
            const body = { ...req.body };
            return await handlers['getDataLevel_1']({ req, res, body })
        }

    } catch (error) {
        res.status(500).json({ data: null, errors: [{ message: error.message }], })
    }
}

const handlers = { getDataLevel_1 }
export default createApiHandler(categoryLevel1API, handlers, {});