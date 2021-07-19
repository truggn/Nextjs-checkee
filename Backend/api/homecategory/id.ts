import isAllowedMethod from '@/utils/is-allowed-method';
import mongoose from 'mongoose';
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import { HomeCategoryDocument } from '@/models/HomeCategory';
import deleteHomeCategory from './handlers/deleteHomeCategory';


export type bodyHomeCategory = {
    id: string,
    deletedBy: string,
}

export type HomeCategoryHandlers = {
    deleteHomeCategory: CheckeeHandler<HomeCategoryDocument, bodyHomeCategory>

}

const METHODS = ['PUT']

const HomeCategoryAPIById: CheckeeApiHandler<HomeCategoryDocument, HomeCategoryHandlers> = async (
    req, res, handlers
) => {

    if (!isAllowedMethod(req, res, METHODS)) return
    try {

        if (req.method === 'PUT') {
            const body = { id: req.query.id, ...req.body };
            return await handlers['deleteHomeCategory']({ req, res, body })
        }
    } catch (error) {
        res.status(500).json({ data: null, errors: [{ message: error.message }], })
    }
}

const handlers = { deleteHomeCategory }

export default createApiHandler(HomeCategoryAPIById, handlers, {});