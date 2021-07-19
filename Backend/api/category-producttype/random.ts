import isAllowedMethod from '@/utils/is-allowed-method';
import mongoose from "mongoose";
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import { CategoryProductTypeDocument } from '@/models/CategoryProductType';
import getRandomProductByCategoryID from './handlers/getRandomProductByCategoryID';


export type bodyCategoryProductType = {
    categoryID: string

}

export type CateProductHandlers = {
    getRandomProductByCategoryID: CheckeeHandler<CategoryProductTypeDocument[], bodyCategoryProductType>
}

const METHODS = ['GET']

const randomProductByCategoryIDAPI: CheckeeApiHandler<
    CategoryProductTypeDocument[] | CategoryProductTypeDocument,
    CateProductHandlers> = async (
        req, res, handlers
    ) => {
        if (!isAllowedMethod(req, res, METHODS)) return

        try {
            if (req.method === 'GET') {
                const body = { ...req.body, categoryID: req.query.categoryID };
                return await handlers['getRandomProductByCategoryID']({ req, res, body })
            }
        } catch (error) {
            res.status(500).json({ data: null, errors: [{ message: error.message }], })
        }
    }

const handlers = { getRandomProductByCategoryID }

export default createApiHandler(randomProductByCategoryIDAPI, handlers, {});


