import isAllowedMethod from '@/utils/is-allowed-method';
import mongoose from "mongoose";
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import { CategoryDocument } from '@/models/Category';
import getIsHomeCategory from './handlers/getIsHomeCategory';


export type HomeCategoryHandlers = {
    getIsHomeCategory: CheckeeHandler<CategoryDocument[]>
}

const METHODS = ['GET']

const HomeCategoryAPI: CheckeeApiHandler<CategoryDocument | CategoryDocument[], HomeCategoryHandlers> = async (
    req, res, handlers
) => {

    if (!isAllowedMethod(req, res, METHODS)) return
    try {
        if (req.method === 'GET') {
            const body = { ...req.body };
            return await handlers['getIsHomeCategory']({ req, res, body })
        }

    } catch (error) {
        res.status(500).json({ data: null, errors: [{ message: error.message }], })
    }
}

const handlers = { getIsHomeCategory }

export default createApiHandler(HomeCategoryAPI, handlers, {});