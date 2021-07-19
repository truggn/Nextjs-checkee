import isAllowedMethod from '@/utils/is-allowed-method';
import mongoose from "mongoose";
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import { CategoryDocument } from '@/models/Category';
import getListCategory from './handlers/getListCategory';


export type CategoryHandlers = {
    getListCategory: CheckeeHandler<CategoryDocument[]>

}

const METHODS = ['GET']

const ListCategoryAPI: CheckeeApiHandler<CategoryDocument | CategoryDocument[], CategoryHandlers> = async (
    req, res, handlers
) => {

    if (!isAllowedMethod(req, res, METHODS)) return
    try {
        if (req.method === 'GET') {
            const body = { ...req.body };
            return await handlers['getListCategory']({ req, res, body })
        }

    } catch (error) {
        res.status(500).json({ data: null, errors: [{ message: error.message }], })
    }
}

const handlers = { getListCategory }

export default createApiHandler(ListCategoryAPI, handlers, {});