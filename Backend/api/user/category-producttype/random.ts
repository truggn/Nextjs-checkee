import isAllowedMethod from '@/utils/is-allowed-method';
import mongoose from "mongoose";
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import { CategoryProductTypeDocument } from '@/models/CategoryProductType';
import getRandomProductByCategoryID from './handlers/getRandomProductByCategoryID';

import { ROLES } from "@authorization/role";
import authorize from "@authorization/authorize";

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
                /**
                 * Kiểm tra role cho từng handler
                 */
                const athz = await authorize(req, [ROLES.NORMAL]);
                if (!athz.isAuthorized) {
                    return res.status(athz.status).json({
                        data: null,
                        errors: athz.errors,
                    });
                }
                const body = { ...req.body, categoryID: req.query.categoryID };
                return await handlers['getRandomProductByCategoryID']({ req, res, body })
            }
        } catch (error) {
            res.status(500).json({ data: null, errors: [{ message: error.message }], })
        }
    }

const handlers = { getRandomProductByCategoryID }

export default createApiHandler(randomProductByCategoryIDAPI, handlers, {});


